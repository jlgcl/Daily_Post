const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var imageSchema = new Schema({
  post: { type: Schema.Types.ObjectId, ref: "post", required: false },
  img: { data: Buffer, contentType: String },
});

module.exports = mongoose.model("Image", imageSchema);
