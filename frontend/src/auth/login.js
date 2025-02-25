import Axios from "axios";

const port = 8080;
const backendUrl = `http://localhost:${port}`;

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
