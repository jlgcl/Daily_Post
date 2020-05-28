const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

router.post("/login", (req, res) => {
  passport.authenticate("local", { session: true }, (err, user, info) => {
    if (er || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user,
      });
    }

    req.login(user, { session: true }, (err) => {
      if (err) {
        res.send(err);
      }

      const token = jwt.sign(user, "secretJWT"); //what will be returned to the frontend
      return res.json({ user, token });
    });
  });
});
