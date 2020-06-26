var express = require("express");
var router = express.Router();
var User = require("../models/user");
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");
const jwt = require("jsonwebtoken");

/* GET users listing. */
router.get("/users", function (req, res, next) {
  User.find({}, "uid username").exec(function (err, results) {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
});

router.post("/users/:id", function (req, res, next) {
  User.findById(req.params.id).exec(function (err, result) {
    if (err) {
      return next(err);
    }
    res.json(result);
  });
});

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
      res.json("deleted");
    });
  });
});

module.exports = router;
