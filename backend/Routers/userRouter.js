const express = require("express");
const multer = require("multer");
const {
  uploadPicController,
  getPfpController,
} = require("../Controllers/userController");

const userRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

userRouter.post("/uploadpic", upload.single("image"), uploadPicController);
userRouter.get("/images/:username", getPfpController);

module.exports = userRouter;
