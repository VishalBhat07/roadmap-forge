const mongoose = require("mongoose");
const topicContentSchema = require("../Schema/topicContentSchema");

const topicContentModel = mongoose.model("topic", topicContentSchema);

module.exports = topicContentModel;
