const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var imageSchema = new Schema({
  uid: { type: String, required: true },
  img: { data: Buffer, contentType: String },
});

module.exports = mongoose.model("Image", imageSchema);
