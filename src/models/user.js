const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  password: { type: String, required: true },
  bio: { type: String },
  link: { type: String },
  pic: { type: String },
  nickname: { type: String },
  followers: { type: Number, default: Math.ceil(Math.random() * 1000) },
  following: { type: Number, default: Math.ceil(Math.random() * 1000) },
  posts: { type: Number, default: Math.ceil(Math.random() * 100) },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
