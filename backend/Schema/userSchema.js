const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  enrolledRoadmaps: [
    {
      title: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
  forgotPasswordCode: { type: String, unique: true },
  forgotPasswordCodeExpires: { type: Date, unique: true },
});

module.exports = userSchema;
