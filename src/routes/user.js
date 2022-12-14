const { Router } = require("express");

const {
  createUser,
  readUser,
  readUsers,
  readUsersLimit,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/user");

const { hashPass, tokenCheck, comparePass } = require("../middleware/hash");

const userRouter = Router();

userRouter.post("/createUser", hashPass, createUser);
userRouter.get("/readUsers", readUsers);
userRouter.get("/readUsers/:limit", readUsersLimit);
userRouter.get("/readUser/:id", readUser);
userRouter.put("/updateUser", updateUser);
userRouter.delete("/deleteUser/:id", deleteUser);
userRouter.post("/login", comparePass, loginUser);
userRouter.get("/login", tokenCheck, loginUser);

module.exports = userRouter;
