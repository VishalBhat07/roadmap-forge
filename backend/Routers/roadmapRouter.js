const express = require("express");
const {
  enrollController,
  fetchAllRoadmaps,
  addUserProgress,
  updateUserProgress,
  topicCompletedController,
  fetchAllTopics,
} = require("../Controllers/roadmapControllers");

const roadmapRouter = express.Router();

roadmapRouter.post("/enroll", enrollController);
roadmapRouter.get("/roadmaps/:id", fetchAllRoadmaps);
roadmapRouter.post("/userProgress", addUserProgress);
roadmapRouter.post("/updateProgress", updateUserProgress);
roadmapRouter.get(
  "/fetchProgress/:username/:roadmap/:topic",
  topicCompletedController
);
roadmapRouter.get("/fetchTopics/:username/:roadmap", fetchAllTopics);

module.exports = roadmapRouter;
