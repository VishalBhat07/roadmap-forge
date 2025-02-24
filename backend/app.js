const express = require("express");
const cors = require("cors");
const env = require("dotenv").config();
const port = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());

app.post("/userData", (req, res) => {
  res.send({
    message: "Data recieved on backend",
    success: true,
  });
  const data = req.body;
  console.log(data);
});

app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
