var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserModel = new Schema({
  id: { type: String, required: false },
  username: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false, required: false },
});

module.exports = mongoose.model("User", UserModel);
