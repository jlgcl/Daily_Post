var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("expression-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var router = express.Router();
var bcrypt = require("bcryptjs");
var { v4, uuidv4 } = require("uuid");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var passportRouter = require("passport");
var auth = require("./routes/auth");

var User = require("./models/user");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

///--------------------PROJECT CODE--------------------------///

app.use("/auth", auth);

//add protected route

//sign-up GET/POST:
app.get("./sign-up", (req, res) => {
  res.render("./views/sign_up.pug");
});
app.post("./sign-up", [
  body("username").trim().isLength({ min: 1 }),
  body("password").trim().isLength({ min: 1 }),
]);

///--------------------- ERROR HANDLER----------------------///

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
