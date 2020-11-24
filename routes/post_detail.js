const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");
const jwt = require("jsonwebtoken");
const Post = require("../models/post");

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

module.exports = router;
