import Axios from "axios";

const backendUrl = import.meta.env.VITE_BACKENDURL;

async function login(username, password) {
  try {
    const res = await Axios.post(backendUrl + "/login", {
      username,
      password,
    });
    console.log("Response received:", res.data);
    return res.data;
  } catch (err) {
    console.log("Error:", err);
    return null;
  }
}

export default login;
