var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostModel = new Schema({
  id: { type: Number, required: true },
  author: { type: String, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.Now },
  published: { type: Boolean, default: false, required: true },
});

module.exports = mongoose.model("Post", PostModel);
