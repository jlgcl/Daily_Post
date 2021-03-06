const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");
const Post = require("../models/post");
const Comment = require("../models/comments");
var { v4: uuidv4 } = require("../node_modules/uuid");
const User = require("../models/user");
const Image = require("../models/image");
const multer = require("multer");

//storage function executes whenever a file is sent to server:
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/"); //cb(error, destination)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); //cb(error, file name) - originalname provides a proper extension for us to see the actual image.
  },
});

const upload = multer({ storage: storage }); //alt: {dest: 'uploads/'}

var async = require("async");

router.post("/createpost", [
  body("title").trim().isLength({ min: 0 }),
  body("summary").trim().isLength({ min: 0 }),
  body("author").trim().isLength({ min: 0 }),
  body("message").trim().isLength({ min: 0 }),
  // body("date").optional({ checkFalsey: true }).isISO8601(),

  sanitizeBody("title").escape(),
  sanitizeBody("summary").escape(),
  sanitizeBody("author").escape(),
  sanitizeBody("message").escape(),
  // sanitizeBody("date").toDate(),

  (req, res, next) => {
    const errors = validationResult(req);

    //POST control for post uploads:
    if (req.user !== undefined || req.user !== null) {
      var post = new Post({
        uid: req.body.uid,
        author: req.user.username,
        title: req.body.title,
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

router.post("/uploadimg", upload.single("file"), (req, res, next) => {
  const errors = validationResult(req);

  //POST control for post uploads:
  if (req.user !== undefined || req.user !== null) {
    var image = new Image({
      uid: req.body.uid,
      img: req.file,
      path: req.file.path, //locates the path in which the multer stored the file.
    });

    if (!errors.isEmpty()) {
      res.send("INPUT ERROR");
      return;
    }

    image.save((err) => {
      if (err) {
        return next(err);
      }
      res.json(req.file.path);
      //MUST MAKE THE "uploads" DIRECTORY STATIC & ACCESSIBLE IN APP.JS
    });
  }
});

router.post("/updateimg", upload.single("file"), (req, res, next) => {
  Image.find({ uid: req.body.uid }, (err, result) => {
    if (err) {
      return next(err);
    }

    let image = new Image({
      uid: req.body.uid,
      img: req.file,
      path: req.file.path,
    });

    Image.findByIdAndUpdate(
      { _id: result[0]._id }, //uses result[0] since result is an array
      { img: req.file, path: req.file.path },
      { new: true },
      function (err, theimage) {
        if (err) {
          return next(err);
        }
        res.json(theimage.path);
      }
    );
  });
});

router.post("/:id/delete", (req, res, next) => {
  Post.findById(req.params.id, (err, result) => {
    if (err) {
      return next(err);
    }
    if (!result) {
      var err = new Error("no post found");
      err.status = 404;
      next(err);
    } else {
      if (result.author === req.user.username || req.user.admin === true) {
        Post.findByIdAndDelete(req.params.id, function deletePost(err) {
          if (err) {
            return next(err);
          }
          res.json("deleted");
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

//Comment GET
router.post("/posts/:id/comment/get", (req, res, next) => {
  Comment.find({ uid: req.body.uid }, (err, results) => {
    if (err) {
      return next(err);
    }
    if (req.user !== null || req.user !== undefined) {
      res.json(results);
    } else {
      res.json("you must be logged in.");
    }
  });
});

//Comment POST
router.post("/posts/:id/comment", [
  body("message").trim().isLength({ min: 0 }),

  sanitizeBody("message").escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    var comment = new Comment({
      uid: req.body.uid,
      key: uuidv4(),
      author: req.user.username,
      message: req.body.message,
      date: new Date(),
    });
    if (!errors.isEmpty()) {
      res.send("ERROR");
      return;
    } else {
      comment.save((err) => {
        if (err) {
          return next(err);
        }
        Comment.find({ uid: req.body.uid }, (err, results) => {
          if (err) {
            return next(err);
          }
          res.json(results);
        });
      });
    }
  },
]);

//Comments like/dislike counters
router.post("/posts/:id/comment/likes", (req, res, next) => {
  Comment.find({ _id: req.body.id }, (err, result) => {
    if (err) {
      return next(err);
    }

    if (req.body.likes === "like") {
      const newLike = result[0].likes + 1;
      Comment.findByIdAndUpdate(
        { _id: req.body.id },
        { likes: newLike },
        { new: true },
        function (err, newComment) {
          if (err) {
            return next(err);
          }
          res.json(newComment);
        }
      );
    } else if (req.body.likes === "dislike") {
      const newLike = result[0].dislikes + 1;
      Comment.findByIdAndUpdate(
        { _id: req.body.id },
        { dislikes: newLike },
        { new: true },
        function (err, newComment) {
          if (err) {
            return next(err);
          }
          res.json(newComment);
        }
      );
    } else if (req.body.likes === "likeUndo") {
      const newLike = result[0].likes - 1;
      Comment.findByIdAndUpdate(
        { _id: req.body.id },
        { likes: newLike },
        { new: true },
        function (err, newComment) {
          if (err) {
            return next(err);
          }
          res.json(newComment);
        }
      );
    } else if (req.body.likes === "dislikeUndo") {
      const newLike = result[0].dislikes - 1;
      Comment.findByIdAndUpdate(
        { _id: req.body.id },
        { dislikes: newLike },
        { new: true },
        function (err, newComment) {
          if (err) {
            return next(err);
          }
          res.json(newComment);
        }
      );
    }
  });
});

router.post("/posts/:id/comment/delete", (req, res, next) => {
  if (req.user === req.body.author || req.user.username === "admin") {
    Comment.findByIdAndRemove(req.body.id, (err, result) => {
      if (err) {
        return next(err);
      }
      res.json(result);
    });
  } else {
    res.json("Not Authorized");
  }
});

router.get("/politics", (req, res, next) => {
  Post.find({ category: "politics", status: "published" }, (err, results) => {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
});
router.get("/economics", (req, res, next) => {
  Post.find({ category: "economics", status: "published" }, (err, results) => {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
});
router.get("/business", (req, res, next) => {
  Post.find({ category: "business", status: "published" }, (err, results) => {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
});
router.get("/technology", (req, res, next) => {
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

router.post("/getimages", (req, res, next) => {
  Image.find({ uid: req.body.uid }, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json(result);
  });
});

router.get("/unpubposts", (req, res, next) => {
  Post.find(
    { status: "unpublished", author: req.user.username },
    (err, results) => {
      if (err) {
        return next(err);
      }

      res.json(results); //contains urls + model._id
    }
  );
});

router.post("/posts/:id/update", [
  body("title").trim().isLength({ min: 0 }),
  body("summary").trim().isLength({ min: 0 }),
  body("message").trim().isLength({ min: 0 }),
  body("status").trim().isLength({ min: 0 }),

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

    Post.findById(req.params.id, (err, result) => {
      if (err) {
        return next(err);
      }
      if (!result) {
        var err = new Error("post not found");
        err.status = 404;
        next(err);
      }
      console.log(req.params.id, result);
      if (result.author == req.user.username || req.user.admin == true) {
        //DIFFERENT FROM LOCALLIBRARY FINDBYIDANDUPDATE() EXAMPLE
        Post.findByIdAndUpdate(
          { _id: req.params.id },
          {
            title: req.body.title,
            summary: req.body.summary,
            message: req.body.message,
            date: new Date(),
            status: req.body.status,
          },
          { new: true },
          function (err, thepost) {
            if (err) {
              return next(err);
            }
            res.json(thepost);

            console.log(thepost);
          }
        );
      } else {
        var err = new Error("not authorized");
        err.status = 401;
        res.json("not authorized");
      }
    });
  },
]);

module.exports = router;
