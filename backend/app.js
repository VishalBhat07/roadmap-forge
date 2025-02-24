require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require("./Models/userModel");

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

// Creating a new user & adding it ot MongoDB
app.post("/signin", async (req, res) => {
  try {
    const data = req.body;
    const newUser = new userModel(data);
    const savedUser = await newUser.save();
    res.json({
      message: "Recieved data",
      success: true,
      user: savedUser,
    });
  } catch (error) {
    console.log(error.message);
  }
});

// app.post("/userData", (req, res) => {
//   res.send({
//     message: "Data recieved on backend",
//     success: true,
//   });
//   const data = req.body;
//   console.log(data);
// });

// app.get("/users", async (req, res) => {
//   const userData = await userModel.find();
//   console.log(userData);
//   res.json(userData);
// });
