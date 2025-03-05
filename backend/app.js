require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectMongoDB = require("./Config/db.js");
const authRouter = require("./Routers/authRouter.js");
const userRouter = require("./Routers/userRouter.js");
const roadmapRouter = require("./Routers/roadmapRouter.js");

const port = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());

connectMongoDB();

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/roadmap", roadmapRouter);
