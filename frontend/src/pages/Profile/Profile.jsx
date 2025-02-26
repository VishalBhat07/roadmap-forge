import React, { useContext } from "react";
import AuthContext from "../../context/authContext";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import styles from "./Profile.module.css";
import img from "../../assets/hero-img.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { loginState, setLoginState } = useContext(AuthContext);
  const currentUser = JSON.parse(localStorage.getItem("loginState"));
  const navigate = useNavigate();
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

  return currentUser !== null && currentUser.isLoggedIn ? (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <div className={styles.left}>
          <div className={styles.profilepic}>
            <img src={img} alt="Profile" />
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
            {courses.map((course, index) => (
              <div key={index} className={styles.course}>
                {course}
              </div>
            ))}
          </div>
          <div className={styles.button}>
            <button onClick={() => toast("Coming soon !!")}>
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
