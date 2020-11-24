const express = require("express");
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("../node_modules/uuid");

// router.get("./sign-up", (req, res) => {
//   res.render("./views/sign_up");
// });

router.post("/api/signup", [
  body("username").trim().isLength({ min: 0 }),
  body("password")
    .trim()
    .isLength({ min: 0 })
    .custom((value, { req, loc, path }) => {
      if (value !== req.body.confirmPassword) {
        throw new Error("Passwords don't match");
      } else {
        return value;
      }
    }),

  sanitizeBody("username").escape(),
  sanitizeBody("password").escape(),

  (req, res, next) => {
    var errors = validationResult(req);

    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      var user = new User({
        uid: uuidv4(),
        username: req.body.username,
        password: hashedPassword,
      });

      if (!errors.isEmpty()) {
        //errors exist - rerender with errors & sanitized data
        res.render("../views/sign-up-error.pug", { errors: errors.array() });
        return;
      } else {
        User.findOne({ username: req.body.username }).exec(function (
          err,
          results
        ) {
          if (err) {
            return next(err);
          }
          if (!results) {
            user.save((err) => {
              if (err) {
                return next(err);
              }
              res.json(user);
            });
          } else if (results) {
            // res.render("../views/sign-up-error.pug", {
            //   title: "username already exists",
            // }
            // );
            res.json("username already exists");
          }
        });
      }
    });
  },
]);

module.exports = router;
