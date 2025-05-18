const express = require("express");
const { createPost, getPosts } = require("../Controllers/postControllers");

const postRouter = express.Router();

postRouter.get("/posts", getPosts);
postRouter.post("/create", createPost);

module.exports = postRouter;
