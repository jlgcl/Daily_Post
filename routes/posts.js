const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.get("/api/posts", (req, res, next) => {
  Post.find({ status: "published" }, (err, results) => {
    if (err) {
      return next(err);
    }

    res.json(results); //contains urls + model._id
  });
});

module.exports = router;
