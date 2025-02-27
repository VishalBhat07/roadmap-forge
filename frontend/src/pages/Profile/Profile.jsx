import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/authContext";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import styles from "./Profile.module.css";
import placeholder from "../../assets/hero-img.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import EditProfile from "../../components/EditProfile/EditProfile";
import Axios from "axios";
import fetchUserCourses from "../../util/fetchUserCourses";

const Profile = () => {
  const { loginState, setLoginState } = useContext(AuthContext);
  const [editProfile, setEditProfile] = useState(false);
  const [roadmaps, setRoadmaps] = useState([]);
  const [image, setImage] = useState(placeholder);
  const currentUser = JSON.parse(localStorage.getItem("loginState"));
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKENDURL;
  const date = new Date();

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
    fetchUserPfp();

    fetchUserCourses("abc")
      .then((res) => {
        setRoadmaps(res.enrolledRoadmaps);
      })
      .catch((err) => console.log(err));
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
            {roadmaps.map((roadmap, index) => (
              <div key={index} className={styles.course}>
                {roadmap.title} enrolled on {roadmap.date.split("T")[0]}
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
