const express = require("express");
const userRouter = express.Router();

const {
  getUser,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  searchUserByParams,
  forgetPassword,
  resetPassword,
} = require("../controllers/userController");

userRouter.get("/", searchUserByParams);
userRouter.get("/", getUser);
userRouter.post("/", createUser);
userRouter.get("/:id", getUserById);
userRouter.patch("/:id", updateUserById);
userRouter.delete("/:id", deleteUserById);
userRouter.post("/forgetPassword", forgetPassword);
userRouter.patch("/resetPassword/:userId", resetPassword);

module.exports = userRouter;
