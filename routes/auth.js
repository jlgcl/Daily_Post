const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

router.post("/login", (req, res) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (er || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user,
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      if (user.username == "admin") {
        // token for admin users
        const token = jwt.sign(user, "secretJWT"); //what will be returned to the frontend - contains the user information corresponding to the signed-in user.
        return res.json({ user, token });
      } else {
        // token for public users
        const token = jwt.sign(user, "publicJWT"); //what will be returned to the frontend - contains the user information corresponding to the signed-in user.
        return res.json({ user, token });
      }
    });
  });
});

module.exports = router;
