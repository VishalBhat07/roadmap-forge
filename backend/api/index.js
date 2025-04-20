require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectMongoDB = require("../Config/db.js");
const authRouter = require("../Routers/authRouter.js");
const userRouter = require("../Routers/userRouter.js");
const roadmapRouter = require("../Routers/roadmapRouter.js");
const geminiRouter = require("../Routers/geminiRouter.js");
const cookieParser = require("cookie-parser");
const serverless = require("serverless-http");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

connectMongoDB();

app.get("/", (req, res) => {
  res.cookie("name", "Vishal");
  res.send("Backend running on Vercel");
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/roadmap", roadmapRouter);
app.use("/gemini", geminiRouter);

// Export for Vercel serverless
module.exports = app;
module.exports.handler = serverless(app);
