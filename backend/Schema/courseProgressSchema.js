const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema({
  username: { type: String, required: true },
  roadmap: { type: String, required: true },
  topicsCompleted: [
    {
      topicName: { type: String, required: true },
      completed: { type: Boolean, required: true },
    },
  ],
});

module.exports = courseProgressSchema;
