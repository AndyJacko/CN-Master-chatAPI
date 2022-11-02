const { Router } = require("express");

const {
  createItem,
  readItems,
  readItem,
  updateItem,
  deleteItem,
} = require("../controllers/gallery");

const galleryRouter = Router();

galleryRouter.post("/createChat", createItem);
galleryRouter.get("/readChats", readItems);
galleryRouter.get("/readChat/:id", readItem);
galleryRouter.put("/updateChat", updateItem);
galleryRouter.delete("/deleteChat/:id", deleteItem);

module.exports = galleryRouter;
