const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var commentSchema = new Schema({
  uid: { type: String, required: true },
  key: { type: String, required: true },
  author: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  likeSym: { type: String, default: "" },
  dislikeSym: { type: String, default: "" },
  likesCheck: { type: Boolean, default: false },
  dislikesCheck: { type: Boolean, default: false },
});

module.exports = mongoose.model("Comment", commentSchema);
