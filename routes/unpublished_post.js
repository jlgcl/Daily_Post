const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.get("/posts/unpublished", (req, res, next) => {
  Post.find({ status: "unpublished" }, (err, results) => {
    if (err) {
      return next(err);
    }

    res.json(results); //contains urls + model._id
  });
});

module.exports = router;
