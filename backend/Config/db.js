const mongoose = require("mongoose");
const mongodbURL = process.env.MONGODBURL;

const connectMongoDB = async () => {
  mongoose
    .connect(mongodbURL, {
      dbName: "communityTest",
    })
    .then(() => {
      console.log("Connected to Mongo DB");
    })
    .catch((err) => {
      console.log(console.log("MongoDB Connection Error: ", err));
    });
};

module.exports = connectMongoDB;
