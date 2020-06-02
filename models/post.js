var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostModel = new Schema({
  uid: { type: String, required: true },
  author: { type: String, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.Now },
  status: {
    type: String,
    enum: ["published", "unpublished"],
    default: "unpublished",
    required: true,
  },
});

PostModel.virtual("url").get(function () {
  return "/posts/" + this._id;
});

module.exports = mongoose.model("Post", PostModel);
