const mongoose = require("mongoose");
const Schema = mongoose.Schema;

UserModel = new Schema({
  id: { type: Number },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", UserModel);
