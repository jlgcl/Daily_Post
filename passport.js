const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require("./models/user");
const bcrypt = require("bcryptjs");

passport.use(
  //for accessing protected routes
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secretJWT",
    },
    (jwtPayload, cb) => {
      return User.findOneById(jwtPayload.id) //searches for id in the matching User object
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    function (user, pasword, cb) {
      User.findOne({ username, password })
        .then((user) => {
          if (!user) {
            return cb(null, false, {
              message: "Incorrect username or password",
            });
          }
          bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
              return cb(null, user, { message: "Logged In Successfully" });
            } else {
              return cb(null, false, { message: "Incorrect Password" });
            }
          });
        })
        .catch((err) => cb(err));
    }
  )
);
