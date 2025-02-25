import Axios from "axios";

const backendURL = "http://localhost:8080";

export default async function createUser(userData) {
  Axios.post(backendURL + "/signin", userData)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
