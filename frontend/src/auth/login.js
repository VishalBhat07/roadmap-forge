import Axios from "axios";

const backendUrl = "http://localhost:8080";

async function login(username, password) {
  Axios.post(backendUrl + "/login", {
    username: username,
    password: password,
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export default login;
