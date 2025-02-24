const mongoose = require("mongoose");
const userSchema = require("../Schema/userSchema");

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
