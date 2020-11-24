var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/api", function (req, res) {
  res.render("../views/index.pug", { title: "Express Test" });
});

module.exports = router;
