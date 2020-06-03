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

router.post("/post/:id/delete", (req, res, next) => {
  Post.findById(req.params.id, (err, result) => {
    if (err) {
      return next(err);
    }
    if (!result) {
      var err = new Error("no post found");
      err.status = 404;
      next(err);
    } else {
      if (
        result.author == req.user.username ||
        result.author == "admin" ||
        req.user.admin == true
      ) {
        Post.findByIdAndDelete(req.params.id, function deletePost(err) {
          if (err) {
            return next(err);
          }
          res.redirect("/posts");
        });
      } else {
        var err = new Error("not authorized");
        err.status = 403;
        next(err);
      }
    }
  });
});

router.get("/posts/:id", (req, res, next) => {
  Post.findById(req.params.id, (err, result) => {
    if (err) {
      return next(err);
    }
    if (result == null) {
      var err = new Error("no post found");
      err.status = 404;
      return next(err);
    }
    res.json(result);
  });
});

router.get("/posts", (req, res, next) => {
  Post.find({ status: "published" }, (err, results) => {
    if (err) {
      return next(err);
    }

    res.json(results); //contains urls + model._id
  });
});

router.get("/unpubposts", (req, res, next) => {
  Post.find({ status: "unpublished" }, (err, results) => {
    if (err) {
      return next(err);
    }

    res.json(results); //contains urls + model._id
  });
});

router.post("/posts/:id/update", [
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
