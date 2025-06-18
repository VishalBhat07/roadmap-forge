require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectMongoDB = require("./Config/db.js");
const authRouter = require("./Routers/authRouter.js");
const userRouter = require("./Routers/userRouter.js");
const roadmapRouter = require("./Routers/roadmapRouter.js");
const cookieParser = require("cookie-parser");
const geminiRouter = require("./Routers/geminiRouter.js");
const postRouter = require("./Routers/postRouter.js");

const port = process.env.PORT || 8080;

const app = express();
const allowedOrigins = [
  "https://roadmap-forge-frontend.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // allow cookies/auth headers
  })
);

app.use(express.json());
app.use(cookieParser());

connectMongoDB();

app.get("/", (req, res) => {
  res.cookie("name", "Vishal");
  res.send("Backend running");
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/roadmap", roadmapRouter);
app.use("/gemini", geminiRouter);
app.use("/post", postRouter);
