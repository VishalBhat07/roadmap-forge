const mongoose = require("mongoose");
const { Types } = mongoose;

const postSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  author: {
    userId: Types.ObjectId,
    username: String,
  },
  category: String,
  tags: [String],
  createdAt: Date,
  updatedAt: Date,
  status: String,
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },
  commentCount: { type: Number, default: 0 },
  attachments: [
    {
      name: String,
      fileUrl: String,
      fileType: String,
      size: Number,
    },
  ],
  pinned: Boolean,
  votedBy: [Types.ObjectId],
  lastActivity: Date,
});

module.exports = postSchema;
