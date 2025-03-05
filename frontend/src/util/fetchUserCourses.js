import Axios from "axios";

const fetchUserCourses = async (username) => {
  const backendUrl = import.meta.env.VITE_BACKENDURL;
  try {
    const res = await Axios.get(backendUrl + `/roadmap/roadmaps/${username}`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export default fetchUserCourses;
