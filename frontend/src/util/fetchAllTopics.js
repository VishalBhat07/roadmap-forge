import Axios from "axios";

const fetchAllTopics = async (username, roadmap) => {
  const backendUrl = import.meta.env.VITE_BACKENDURL;
  try {
    const res = await Axios.get(
      backendUrl + `/roadmap/fetchTopics/${username}/${roadmap}`
    );
    if (res !== null) {
      let progress = 0;
      const topics = res.data.topics;
      for (let i = 0; i < topics.length; i++)
        if (topics[i].completed) progress += 1;

      console.log(progress / topics.length);
      return progress / topics.length;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default fetchAllTopics;
