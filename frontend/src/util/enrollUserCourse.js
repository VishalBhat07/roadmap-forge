import Axios from "axios";
import { toast } from "react-toastify";

const enrollUserCourse = async (roadmapTitle) => {
  const currentUser = JSON.parse(localStorage.getItem("loginState"));
  const backendUrl = import.meta.env.VITE_BACKENDURL;
  try {
    const res = await Axios.post(backendUrl + "/enroll", {
      roadmapTitle: roadmapTitle,
      username: currentUser.user.username,
    });

    toast(res.data.message);
  } catch (err) {
    console.log(err);
  }
};

export default enrollUserCourse;
