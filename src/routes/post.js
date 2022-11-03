const { Router } = require("express");

const {
  createPost,
  readPosts,
  readPost,
  updatePost,
  deletePost,
} = require("../controllers/post");

const postRouter = Router();

postRouter.post("/createPost", createPost);
postRouter.get("/readPosts/:user", readPosts);
postRouter.get("/readPosts", readPosts);
postRouter.get("/readPost/:id", readPost);
postRouter.put("/updatePost", updatePost);
postRouter.delete("/deletePost/:id", deletePost);

module.exports = postRouter;
