import Axios from "axios";
import { toast } from "react-toastify";

const getForgotPasswordCode = async (
  userEmail,
  verificationCode,
  setVerified,
  setShowTimer
) => {
  const backendUrl = import.meta.env.VITE_BACKENDURL;
  try {
    const res = await Axios.post(backendUrl + `/auth/verifycode`, {
      userEmail,
      verificationCode,
    });

    if (res.data.verified) {
      toast.success(res.data.message);
      setVerified((verified) => !verified);
      setShowTimer(false);
    } else toast.error(res.data.message);
  } catch (error) {
    toast.error("Internal server error");
  }
};

export default getForgotPasswordCode;
