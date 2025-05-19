const mongoose = require("mongoose");

const topicContentSchema = new mongoose.Schema({
  roadmap: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  contentJSON: {
    type: Array, 
    required: true,
  },
});

module.exports = topicContentSchema;
