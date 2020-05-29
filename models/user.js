const mongoose = require("mongoose");
const Schema = mongoose.Schema;

UserModel = new Schema({
  id: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false, required: true },
});

module.exports = mongoose.model("User", UserModel);
