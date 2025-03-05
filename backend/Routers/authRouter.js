const express = require("express");
const {
  registerController,
  loginController,
  generateVerificationCode,
  verifyCode,
  resetPassword,
} = require("../Controllers/authControllers");

const authRouter = express.Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.post("/verificationcode", generateVerificationCode);
authRouter.post("/verifycode", verifyCode);
authRouter.post("/resetpassword", resetPassword);

module.exports = authRouter;
