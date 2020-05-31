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

router.post("/signup", [
  body("username").trim().isLength({ min: 1 }),
  body("password").trim().isLength({ min: 1 }),

  sanitizeBody("username").escape(),
  sanitizeBody("password").escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      req.body.password = hashedPassword;

      var user = new User({
        id: uuidv4(),
        username: req.body.username,
        password: req.body.password,
      });

      if (!errors.isEmpty()) {
        //errors exist - rerender with errors & sanitized data
        res.render("../views/sign-up-error.pug");
        return;
      }

      user.save((err) => {
        if (err) {
          next(err);
        }
        res.send("user added");
      });
    });
  },
]);

module.exports = router;
