const mongoose = require("mongoose");
const courseProgressSchema = require("../Schema/courseProgressSchema");

const courseProgressModel = mongoose.model("progress", courseProgressSchema);

module.exports = courseProgressModel;
