import React from "react";
import styles from "./EditProfile.module.css";
import Axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const EditProfile = ({ setEditProfile }) => {
  const backendUrl = import.meta.env.VITE_BACKENDURL;
  const currentUser = JSON.parse(localStorage.getItem("loginState"));
  const [image, setImage] = useState();
  const [preview, setPreview] = useState(null);
  const handleChange = (e) => {
    const image = e.target.files[0];
    setImage(image);
    setPreview(URL.createObjectURL(image));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted image");
    const formData = new FormData();
    formData.append("image", image);
    formData.append("user", JSON.stringify(currentUser.user));
    try {
      const res = await Axios.post(backendUrl + "/user/uploadpic", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (!res.data.error) {
        toast("Image updated");
        console.log(res.data);
      } else {
        toast(res.error);
      }
    } catch (err) {
      console.log(err);
    }

    setEditProfile((editProfile) => !editProfile);
  };

  return (
    <div className={styles.editProfile}>
      <div className={styles.header}>
        <p>Edit profile</p>
        <i
          onClick={() => setEditProfile((editProfile) => !editProfile)}
          className="fa-solid fa-close"
        ></i>
      </div>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="file"
            onChange={handleChange}
            accept="image/*"
            required
          />
          <button className={styles.submit} type="submit">
            Set as profile pic
          </button>
        </form>
      </div>
      {preview ? (
        <div className={styles.preview}>
          <img src={preview} alt="" />
        </div>
      ) : null}
    </div>
  );
};

export default EditProfile;
