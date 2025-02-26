import Axios from "axios";

const backendUrl = import.meta.env.VITE_BACKENDURL;

export default async function createUser(userData) {
  try {
    const res = await Axios.post(backendUrl + "/register", userData);
    console.log("Response received:", res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    return { err: "Something went wrong" };
  }
}
