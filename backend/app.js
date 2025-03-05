require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./Routers/authRouter.js");
const userRouter = require("./Routers/userRouter.js");
const roadmapRouter = require("./Routers/roadmapRouter.js");

const port = process.env.PORT || 8080;
const mongodbURL = process.env.MONGODBURL;

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(mongodbURL, {
    dbName: "RoadMapForge",
  })
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log(console.log("MongoDB Connection Error:", err));
  });

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/roadmap", roadmapRouter);
