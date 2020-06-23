var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var passport = require("passport");
var mongoose = require("mongoose");
var LocalStrategy = require("passport-local").Strategy;
var router = express.Router();
var bcrypt = require("bcryptjs");
var { v4: uuidv4 } = require("./node_modules/uuid");
var { body, validationResult } = require("express-validator/check");
var { sanitizeBody } = require("express-validator/filter");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var passportRouter = require("passport");
var auth = require("./routes/auth");
var signupRouter = require("./routes/sign_up");
// var createPostRouter = require("./routes/create_post");
// var postRouter = require("./routes/posts");
// var unpubPostRouter = require("./routes/unpublished_post");
// var postDetail = require("./routes/post_detail");
// var postUpdate = require("./routes/update_post");
// var postDelete = require("./routes/delete_post");
var postRoutes = require("./routes/post_routes");
var userDelete = require("./routes/delete_user");

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

app.use("/uploads", express.static("uploads")); //allows the app to access localhost:8080/uploads directory that contains multer images
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Serve static React files once it's in production:
app.use(express.static(path.join(__dirname, "/client/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

app.use("/", indexRouter);
//app.use("/users", usersRouter);

///--------------------PROJECT CODE--------------------------///

//add protected route for protected page (edit posts)

//log-in passport.js file, NOT passportJS dependency
require("./passport");

//Sessions & Serialization: MOVED TO passport.js

//Authentication middlewares:
app.use(session({ secret: "cats", resave: false, saveUnitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

//CORS
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.use(cors());

//sign-up GET/POST
app.use(signupRouter);

//login authentication
app.use(auth);

app.get("/user_data", (req, res, next) => {
  User.find({ username: req.user.username }, (err, result) => {
    if (err) {
      return next(err);
    }
    if (res == undefined || res == null) {
      res.json("not found");
    } else {
      res.json(result[0].username);
    }
  });
});

//post controls
app.use(postRoutes);
// app.use(postRouter);
// app.use(unpubPostRouter);
// app.use(createPostRouter);
// app.use(postDetail);
// app.use(postUpdate);
// app.use(postDelete);

//user delete
app.use(passport.authenticate("jwt"), userDelete);

//logout
// app.get("/logout", (req, res) => {
//   req.session.destroy();
//   req.logout();
//   res.redirect("/");
// });

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
