const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");
const Post = require("../models/post");
var { v4: uuidv4 } = require("../node_modules/uuid");
const User = require("../models/user");

router.post("/create_post", [
  body("title").trim().isLength({ min: 0 }),
  body("message").trim().isLength({ min: 0 }),
  body("date").optional({ checkFalsey: true }).isISO8601(),

  sanitizeBody("title").escape(),
  sanitizeBody("message").escape(),
  sanitizeBody("date").toDate(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (req.user !== undefined || req.user !== null) {
      var post = new Post({
        uid: uuidv4(),
        author: req.user.username, //replace with req.user.username - the user MUST be logged in the session.
        title: req.body.title,
        message: req.body.message,
        date: new Date(),
      });

      if (!errors.isEmpty()) {
        res.send("INPUT ERROR");
        return;
      }

      post.save((err) => {
        if (err) {
          return next(err);
        }
        res.json(post);
      });
    }
  },
]);

module.exports = router;
