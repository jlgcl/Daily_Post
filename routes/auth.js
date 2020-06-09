const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : "login failed",
        user,
        err,
      });
    }

    req.login(user, (err) => {
      if (err) {
        res.send(err);
      }

      if (user.admin == true) {
        // token for admin users
        const token = jwt.sign(user.toJSON(), "secretJWT"); //what will be returned to the frontend - contains the user information corresponding to the signed-in user.
        res.redirect("/");
      } else {
        // token for public users
        const token = jwt.sign(user.toJSON(), "publicJWT"); //what will be returned to the frontend - contains the user information corresponding to the signed-in user.
        res.redirect("/");
      }
    });
  })(req, res);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
