import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/authContext";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import styles from "./Profile.module.css";
import placeholder from "../../assets/hero-img.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import EditProfile from "../../components/EditProfile/EditProfile";
import Axios from "axios";

const Profile = () => {
  const { loginState, setLoginState } = useContext(AuthContext);
  const [editProfile, setEditProfile] = useState(false);
  const [image, setImage] = useState(placeholder);
  const currentUser = JSON.parse(localStorage.getItem("loginState"));
  const navigate = useNavigate();
  const port = 8080;
  const backendUrl = `http://localhost:${port}`;
  const date = new Date();

  const courses = [
    "Frontend Development",
    "Backend Development",
    "Full Stack Web Development",
  ];

  const handleSignOut = () => {
    setLoginState({ user: null, isLoggedIn: false });
    localStorage.removeItem("loginState");
    toast("Signed out successfully");
    navigate("/");
  };

  const fetchUserPfp = async () => {
    try {
      const pfp = await Axios.get(
        backendUrl + `/images/${currentUser.user.username}`,
        {
          responseType: "arraybuffer",
        }
      );

      const base64String = btoa(
        new Uint8Array(pfp.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      setImage(`data:image/jpeg;base64,${base64String}`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("Fetch called");
    fetchUserPfp();
  }, [editProfile]);

  return currentUser !== null && currentUser.isLoggedIn ? (
    <div className={styles.container}>
      {editProfile ? <EditProfile setEditProfile={setEditProfile} /> : null}
      <div className={styles.profileCard}>
        <div className={styles.left}>
          <div className={styles.profilepic}>
            <img src={image} alt="Profile" />
          </div>
          <div className={styles.userinfo}>
            <p className={styles.username}>
              Username: {currentUser.user.username}
            </p>
            <p className={styles.email}>Email: {currentUser.user.email}</p>
            <p className={styles.date}>
              Member since: {date.toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.courses}>
            <div>Your roadmaps : </div>
            {courses.map((course, index) => (
              <div key={index} className={styles.course}>
                {course}
              </div>
            ))}
          </div>
          <div className={styles.button}>
            <button
              onClick={() => setEditProfile((editProfile) => !editProfile)}
            >
              Edit Profile
            </button>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <NotFoundPage />
  );
};

export default Profile;
