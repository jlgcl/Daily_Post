const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");
const Post = require("../models/post");
const Comment = require("../models/comments");
var { v4: uuidv4 } = require("../node_modules/uuid");
const User = require("../models/user");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Image = require("../models/image");

//Cloudinary config:
cloudinary.config({
  cloud_name: "dkd85c8dn",
  api_key: "299873643872433",
  api_secret: "Lve8vXaqHOZmkuSoW0vqtWC61bM",
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "samples",
    format: async (req, file) => "png",
    public_id: (req, file) => uuidv4(),
  },
});
const parser = multer({ storage: storage });

var async = require("async");

router.post("/create_post", parser.single("image"), [
  body("title").trim().isLength({ min: 0 }),
  body("summary").trim().isLength({ min: 0 }),
  body("message").trim().isLength({ min: 0 }),
  body("date").optional({ checkFalsey: true }).isISO8601(),

  sanitizeBody("title").escape(),
  sanitizeBody("summary").escape(),
  sanitizeBody("message").escape(),
  sanitizeBody("date").toDate(),

  (req, res, next) => {
    //upload image:
    const image = {};
    image.url = req.file.url;
    image.id = req.file.public_id;
    Image.create(image)
      .then((newImage) => res.json(newImage))
      .catch((err) => console.log(err));

    const errors = validationResult(req);

    if (req.user !== undefined || req.user !== null) {
      var post = new Post({
        uid: uuidv4(),
        author: req.user.username, //replace with req.user.username - the user MUST be logged in the session.
        title: req.body.title,
        imageId: image.id,
        summary: req.body.summary,
        message: req.body.message,
        date: new Date(),
        category: req.body.category,
      });

      if (!errors.isEmpty()) {
        res.send("INPUT ERROR");
        return;
      }

      post.save((err) => {
        if (err) {
          return next(err);
        }
        res.json(post);
      });
    }
  },
]);

router.post("/post/:id/delete", (req, res, next) => {
  Post.findById(req.params.id, (err, result) => {
    if (err) {
      return next(err);
    }
    if (!result) {
      var err = new Error("no post found");
      err.status = 404;
      next(err);
    } else {
      if (
        result.author == req.user.username ||
        result.author == "admin" ||
        req.user.admin == true
      ) {
        Post.findByIdAndDelete(req.params.id, function deletePost(err) {
          if (err) {
            return next(err);
          }
          res.redirect("/posts");
        });
      } else {
        var err = new Error("not authorized");
        err.status = 403;
        next(err);
      }
    }
  });
});

router.get("/posts/:id", (req, res, next) => {
  async.parallel(
    {
      post: function (callback) {
        Post.findById(req.params.id).exec(callback);
      },
      comment: function (callback) {
        Comment.find({ post: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results == null) {
        var err = new Error("no post found");
        err.status = 404;
        return next(err);
      }
      res.json(results);
    }
  );
});

//comment POST
// router.post("/posts/:id", [
//   body("message").trim().isLength({ min: 0 }),

//   sanitizeBody("message").escape(),
//   sanitizeBody("date").toDate(),

//   (req, res, next) => {
//     const errors = validationResult(req);

//     var comment = new Comment({
//       post: req.params.id,
//       author: req.user.username,
//       message: req.body.message,
//       date: now.Date(),
//     });
//     if (!errors.isEmpty()) {
//       res.send("ERROR");
//       return;
//     } else {
//       comment.save((err) => {
//         if (err) {
//           return next(err);
//         }
//         res.redirect(`/posts/${req.params.id}`);
//       });
//     }
//   },
// ]);

router.get("/posts/politics", (req, res, next) => {
  Post.find({ category: "politics", status: "published" }, (err, results) => {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
});
router.get("/posts/economics", (req, res, next) => {
  Post.find({ category: "economics", status: "published" }, (err, results) => {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
});
router.get("/posts/business", (req, res, next) => {
  Post.find({ category: "business", status: "published" }, (err, results) => {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
});
router.get("/posts/technology", (req, res, next) => {
  Post.find({ category: "technology", status: "published" }, (err, results) => {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
});

router.get("/posts", (req, res, next) => {
  Post.find({ status: "published" }, (err, results) => {
    if (err) {
      return next(err);
    }

    res.json(results); //contains urls + model._id
  });
});

router.get("/unpubposts", (req, res, next) => {
  Post.find({ status: "unpublished" }, (err, results) => {
    if (err) {
      return next(err);
    }

    res.json(results); //contains urls + model._id
  });
});

router.post("/posts/:id/update", [
  body("title").trim().isLength({ min: 0 }),
  body("summary").trim().isLength({ min: 0 }),
  body("message").trim().isLength({ min: 0 }),

  sanitizeBody("title").escape(),
  sanitizeBody("summary").escape(),
  sanitizeBody("message").escape(),
  sanitizeBody("status").escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.send("UPDATE ERROR");
      return;
    }

    var post = new Post({
      title: req.body.title,
      summary: req.body.summary,
      message: req.body.message,
      date: new Date(),
      status: req.body.status,
      _id: req.params.id,
    });

    Post.findById(req.params.id, (err, result) => {
      if (err) {
        return next(err);
      }
      if (!result) {
        var err = new Error("post not found");
        err.status = 404;
        next(err);
      }
      if (
        result.author == req.user.username ||
        result.author == "admin" ||
        req.user.admin == true
      ) {
        Post.findByIdAndUpdate(req.params.id, post, {}, function (
          err,
          thepost
        ) {
          if (err) {
            return next(err);
          }
          res.redirect(thepost.url);
        });
      } else {
        var err = new Error("not authorized");
        err.status = 403;
        return next(err);
      }
    });
  },
]);

module.exports = router;