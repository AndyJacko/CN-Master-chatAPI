const { Router } = require("express");

const {
  createChat,
  readChats,
  readChat,
  updateChat,
  deleteChat,
} = require("../controllers/chat");

const chatRouter = Router();

chatRouter.post("/createChat", createChat);
chatRouter.get("/readChats", readChats);
chatRouter.get("/readChat/:id", readChat);
chatRouter.put("/updateChat", updateChat);
chatRouter.delete("/deleteChat/:id", deleteChat);

module.exports = chatRouter;
