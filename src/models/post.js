const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  postimage: { type: String, required: true },
  comment: { type: String, required: true },
  alt: { type: String },
  tags: { type: String },
  likes: { type: Number, default: Math.ceil(Math.random() * 1000000) },
  numcomments: { type: Number, default: Math.ceil(Math.random() * 250) },
  timeposted: { type: Number, default: Math.ceil(Math.random() * 23) },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
