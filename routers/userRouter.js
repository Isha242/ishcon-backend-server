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

const { isAdmin, protectRoute, isAuthorized } = require("../controllers/authController");
const { checkInput } = require("../utils/crudFactory");

// authRouter.use(protectRoute);
const authorizedUserRoles = ["admin", "ceo", "sales", "manager"];
const authorizedToDeleteUserRoles = ["admin", "ceo"];

userRouter.get("/", protectRoute, isAuthorized(authorizedUserRoles), getUser);
userRouter.get("/", searchUserByParams);
userRouter.post("/", checkInput, protectRoute, isAuthorized(authorizedUserRoles), createUser);
userRouter.get("/:id", getUserById);
userRouter.patch("/:id", updateUserById);
userRouter.delete(
  "/:id",
  protectRoute,
  isAuthorized(authorizedToDeleteUserRoles),
  deleteUserById
);

module.exports = userRouter;
