import Axios from "axios";

const fetchAllPosts = async () => {
  const backendUrl = import.meta.env.VITE_BACKENDURL;
  try {
    const res = await Axios.get(backendUrl + `/post/posts`);
    return res.data.posts;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default fetchAllPosts;
