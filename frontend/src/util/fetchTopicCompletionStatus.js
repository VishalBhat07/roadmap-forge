import Axios from "axios";

const fetchTopicCompletionStatus = async (
  username,
  roadmap,
  topic,
  setCompleted
) => {
  const backendUrl = import.meta.env.VITE_BACKENDURL;
  try {
    const res = await Axios.get(
      backendUrl + `/fetchProgress/${username}/${roadmap}/${topic}`
    );
    // console.log(res.data);
    setCompleted(res.data.isCompleted);
  } catch (error) {
    console.log(error);
  }
};

export default fetchTopicCompletionStatus;
