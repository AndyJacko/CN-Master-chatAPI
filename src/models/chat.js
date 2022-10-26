const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  userID: { type: Number, required: true },
  chat: { type: String, required: true },
  tags: { type: String },
  date: { type: String, required: true, default: new Date() },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
