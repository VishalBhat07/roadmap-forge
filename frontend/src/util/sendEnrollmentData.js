import Axios from "axios";
import allRoadmaps from "../pages/Roadmap/allRoadmaps.js";
import { toast } from "react-toastify";

const sendEnrollmentData = async (username, roadmapTitle) => {
  const currentRoadmap = allRoadmaps[roadmapTitle];
  const topics = [];
  const backendUrl = import.meta.env.VITE_BACKENDURL;

  for (const section of currentRoadmap.roadmap)
    for (const topic of section.topics)
      topics.push({
        topicName: topic.name,
        completed: false,
      });

  try {
    const res = await Axios.post(backendUrl + "/roadmap/userProgress", {
      username: username,
      roadmap: currentRoadmap.title,
      topicsCompleted: topics,
    });
    toast(res.data.message);
  } catch (err) {
    console.log(err);
  }
};

export default sendEnrollmentData;
