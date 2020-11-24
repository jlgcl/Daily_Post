const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");
const Post = require("../models/post");
const jwt = require("jsonwebtoken");

router.post("/api/posts/:id/update", [
  body("title").trim().isLength({ min: 0 }),
  body("message").trim().isLength({ min: 0 }),

  sanitizeBody("title").escape(),
  sanitizeBody("message").escape(),
  sanitizeBody("status").escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.send("UPDATE ERROR");
      return;
    }

    var post = new Post({
      title: req.body.title,
      message: req.body.message,
      date: new Date(),
      status: req.body.status,
      _id: req.params.id,
    });

    Post.findById(req.params.id, (err, result) => {
      if (err) {
        return next(err);
      }
      if (!result) {
        var err = new Error("post not found");
        err.status = 404;
        next(err);
      }
      if (
        result.author == req.user.username ||
        result.author == "admin" ||
        req.user.admin == true
      ) {
        Post.findByIdAndUpdate(req.params.id, post, {}, function (
          err,
          thepost
        ) {
          if (err) {
            return next(err);
          }
          res.redirect(thepost.url);
        });
      } else {
        var err = new Error("not authorized");
        err.status = 403;
        return next(err);
      }
    });
  },
]);

module.exports = router;
