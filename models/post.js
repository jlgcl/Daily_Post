const mongoose = require("mongoose");
const Schema = mongoose.Schema;

PostModel = new Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.Now },
});

module.exports = mongoose.model("Post", PostModel);
