const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/users/:id/delete", (req, res, next) => {
  User.findById(req.params.id, (err, result) => {
    if (err) {
      return next(err);
    }
    if (!result) {
      var err = new Error("no post found");
      err.status = 404;
      next(err);
    }
    User.findByIdAndDelete(req.params.id, function deleteUser(err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });
});

module.exports = router;
