const userModel = require("../Models/userModel");
const courseProgressModel = require("../Models/courseProgressModel");

const enrollController = async (req, res) => {
  const { roadmapTitle, username } = req.body;

  try {
    const findUser = await userModel.findOne({ username });

    if (!findUser) {
      return res.json({ message: "User not found in DB" });
    }

    const alreadyEnrolled = findUser.enrolledRoadmaps.some((roadmap) => {
      return roadmap.title === roadmapTitle;
    });

    if (alreadyEnrolled) {
      return res.json({
        message: "You are already enrolled in the course",
      });
    }

    findUser.enrolledRoadmaps.push({
      title: roadmapTitle,
    });

    await findUser.save();

    res.json({ message: "Enrollment successful", user: findUser });
  } catch (err) {
    res.json({
      message: "Internal server error",
    });
  }
};

const fetchAllRoadmaps = async (req, res) => {
  const username = req.params.id;
  try {
    const findUser = await userModel.findOne({ username });
    if (!findUser) {
      return res.json({
        message: "User not found in DB",
      });
    }

    const enrolledRoadmaps = findUser.enrolledRoadmaps;
    if (enrolledRoadmaps.length < 1)
      return res.json({
        message: "No roadmaps enrolled",
      });

    return res.json({
      message: "Enrolled roadmaps found",
      enrolledRoadmaps: enrolledRoadmaps,
    });
  } catch (err) {
    res.json({
      message: "Internal server error",
    });
  }
};

const addUserProgress = async (req, res) => {
  try {
    const { username, roadmap, topicsCompleted } = req.body;

    const findUser = await courseProgressModel.findOne({ username });

    if (findUser !== null) {
      const alreadyEnrolled =
        findUser.username === username && findUser.roadmap === roadmap;

      if (alreadyEnrolled) {
        return res.json({
          message: "Course progress is already saved",
        });
      }
    }

    const courseProgress = new courseProgressModel({
      username,
      roadmap,
      topicsCompleted,
    });

    const savedProgress = await courseProgress.save();

    console.log("saved progress :", savedProgress);
    if (!savedProgress) {
      return res.json({
        message: "User progress not saved",
        user: null,
      });
    }
    res.json({
      message: "User progress saved",
      user: savedProgress,
    });
  } catch (error) {
    return res.json({
      error: "Internal server error",
      user: null,
    });
  }
};

const updateUserProgress = async (req, res) => {
  try {
    const { username, roadmap, topic } = req.body;
    // console.log(username);
    // console.log(roadmap);
    // console.log(topic);

    const findUser = await courseProgressModel.findOne({ username, roadmap });
    const topicToBeUpdated = findUser.topicsCompleted.find(
      (t) => t.topicName === topic
    );
    topicToBeUpdated.completed = true;

    const savedUser = await findUser.save();
    if (!savedUser) {
      return res.json({
        message: "User progress not updated",
        user: null,
      });
    }
    res.json({
      message: "User progress updated",
      user: savedUser,
    });
  } catch (error) {
    res.json({
      message: "Internal server error",
    });
  }
};

const topicCompletedController = async (req, res) => {
  try {
    const { username, roadmap, topic } = req.params;
    // console.log(username);
    // console.log(roadmap);
    // console.log(topic);

    const findUser = await courseProgressModel.findOne({ username, roadmap });
    const topicToBeUpdated = findUser.topicsCompleted.find(
      (t) => t.topicName === topic
    );

    const isCompleted = topicToBeUpdated.completed;

    res.json({
      message: "User progress updated",
      isCompleted: isCompleted,
    });
  } catch (error) {
    res.json({
      message: "Internal server error",
      isCompleted: null,
    });
  }
};

const fetchAllTopics = async (req, res) => {
  try {
    const { username, roadmap } = req.params;
    // console.log(username);
    // console.log(roadmap);

    const findUser = await courseProgressModel.findOne({ username, roadmap });

    const topics = findUser.topicsCompleted;

    res.json({
      message: "User progress updated",
      topics: topics,
    });
  } catch (error) {
    res.json({
      message: "Internal server error",
      topics: null,
    });
  }
};

module.exports = {
  enrollController,
  fetchAllRoadmaps,
  addUserProgress,
  updateUserProgress,
  topicCompletedController,
  fetchAllTopics,
};
