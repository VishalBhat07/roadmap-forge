import Axios from "axios";

const backendURL = "http://localhost:8080";

export default async function createUser(userData) {
  try {
    const res = await Axios.post(backendURL + "/register", userData);
    console.log("Response received:", res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    return { err: "Something went wrong" };
  }
}
