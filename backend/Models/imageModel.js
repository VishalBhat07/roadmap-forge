const mongoose = require("mongoose");
const imageSchema = require("../Schema/imageSchema");

const imageModel = mongoose.model("images", imageSchema);

module.exports = imageModel;
