import Axios from "axios";

const fetchTopicContent = async (roadmapTitle, topicid) => {
  const backendUrl = import.meta.env.VITE_BACKENDURL;
  try {
    const res = await Axios.get(
      `${backendUrl}/gemini/response/${roadmapTitle}/${topicid}`
    );
    return res.data.topicContentJSON; // ✅ Return content instead of setting it here
  } catch (err) {
    console.error("Error fetching topic content:", err);
    return null;
  }
};

export default fetchTopicContent;
