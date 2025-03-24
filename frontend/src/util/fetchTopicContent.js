import Axios from "axios";

const fetchTopicContent = async (roadmapTitle, topicid, setTopicContent) => {
  const backendUrl = import.meta.env.VITE_BACKENDURL;
  try {
    console.log(roadmapTitle, topicid);
    const res = await Axios.get(
      backendUrl + `/gemini/response/${roadmapTitle}/${topicid}`
    );
    setTopicContent(res.data.topicContentMD);
  } catch (err) {
    console.log(err);
  }
};

export default fetchTopicContent;
