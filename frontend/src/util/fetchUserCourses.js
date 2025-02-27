import Axios from "axios";

const fetchUserCourses = async (username) => {
  const backendUrl = "http://localhost:8080";
  try {
    const res = await Axios.get(backendUrl + `/roadmaps/${username}`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export default fetchUserCourses;
