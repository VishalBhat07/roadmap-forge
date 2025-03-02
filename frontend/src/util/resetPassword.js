import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const resetPassword = async (userEmail, newPassword) => {
  const backendUrl = import.meta.env.VITE_BACKENDURL;
  try {
    const res = await Axios.post(backendUrl + "/resetpassword", {
      userEmail,
      newPassword,
    });

    if (res.data.message === "Password changed successfully") {
      toast.success("Password changed! You can now log in");
    }
  } catch (error) {
    console.log(error);
    toast.error("Internal server error");
  }
};

export default resetPassword;
