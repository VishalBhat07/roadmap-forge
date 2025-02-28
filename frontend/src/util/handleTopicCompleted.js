import Axios from "axios";
import { toast } from "react-toastify";
import allRoadmaps from "../pages/Roadmap/allRoadmaps";

const handleTopicCompleted = async (roadmap, topicid, setCompleted) => {
  const backendUrl = import.meta.env.VITE_BACKENDURL;
  const currentUser = JSON.parse(localStorage.getItem("loginState"));
  setCompleted(true);
  toast.success(`"${topicid}" completed`);

  try {
    const res = await Axios.post(backendUrl + "/updateProgress", {
      username: currentUser.user.username,
      roadmap: allRoadmaps[roadmap].title,
      topic: topicid,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export default handleTopicCompleted;
