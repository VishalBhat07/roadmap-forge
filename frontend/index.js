import Axios from "axios";

async function getData() {
  try {
    const res = await Axios.post("http://localhost:8080/userProgress", {
      username: "Vishal",
      age: 19,
    });
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
}

getData();
