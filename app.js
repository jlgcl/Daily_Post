var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("expression-session");
var passport = require("passport");
var mongoose = require("mongoose");
var LocalStrategy = require("passport-local").Strategy;
var router = express.Router();
var bcrypt = require("bcryptjs");
var { v4, uuidv4 } = require("uuid");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var passportRouter = require("passport");
var auth = require("./routes/auth");
var signupRouter = require("./routes/sign-up");
var postRouter = require("./routes/post");

var User = require("./models/user");

var app = express();

//Mongoose setup
var mongoDB =
  "mongodb+srv://jwljacl:OgBogden135@cluster0-yyxlx.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { userNewUrlPraser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB Connection Error:"));

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

//add protected route for protected page (edit posts)

//sign-up GET/POST:
app.use("/log-in", signupRouter);

//log-in passport
app.use("/auth", auth);

//Authentication middlewares:
app.use(session({ secret: "cats", resave: false, saveUnitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

//post controls
app.use("/posts", postRouter);

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
