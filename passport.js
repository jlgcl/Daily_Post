const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require("./models/user");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    function (username, password, cb) {
      User.findOne({ username }, (err, user) => {
        if (err) {
          return cb(err);
        }
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
      });
    }
  )
);

passport.use(
  //for accessing protected routes
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secretJWT",
    },
    (jwtPayload, cb) => {
      User.findById(jwtPayload._id, (err, user) => {
        //searches for id in the matching User object
        if (err) {
          return cb(err, false);
        }
        if (user) {
          return cb(null, user);
        } else {
          return cb(null, false);
        }
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

//     .then((user) => {

//     })
//     .catch((err) => cb(err));
// }
// )
//);
