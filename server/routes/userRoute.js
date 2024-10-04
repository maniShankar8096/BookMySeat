const express = require("express");
const auth = require("../middlewares/authMiddleware");

const userRouter = express.Router();

const {
  registerUser,
  userLogin,
  getCurrentUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");

//register a user
userRouter.post("/register", registerUser);

//user login
userRouter.post("/login", userLogin);

userRouter.get("/get-current-user", auth, getCurrentUser);

userRouter.patch("/forgot-password", forgotPassword);
userRouter.patch("/reset-password/:email", resetPassword);
module.exports = userRouter;
