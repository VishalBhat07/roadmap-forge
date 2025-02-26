const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  image: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = imageSchema;
