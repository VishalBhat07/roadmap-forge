const mongoose = require("mongoose");
const postSchema = require("../Schema/postSchema.js");

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
