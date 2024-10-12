const express = require("express");
const userRouter = express.Router();
// const authRouter = express.Router();

const {
  getUser,
  getUserById,
  updateUserById,
  deleteUserById,
  searchUserByParams,
  createUser,
} = require("../controllers/userController");

const { isAdmin } = require("../controllers/authController");

// authRouter.use(protectRoute);

userRouter.get("/", isAdmin, getUser);
userRouter.get("/", searchUserByParams);
userRouter.post("/", createUser);
userRouter.get("/:id", getUserById);
userRouter.patch("/:id", updateUserById);
userRouter.delete("/:id", deleteUserById);

module.exports = userRouter;
