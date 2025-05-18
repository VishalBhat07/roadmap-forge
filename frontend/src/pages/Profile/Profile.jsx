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
import {
  FaEdit,
  FaSignOutAlt,
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaBook,
  FaBookmark,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Profile = () => {
  const { loginState, setLoginState } = useContext(AuthContext);
  const [editProfile, setEditProfile] = useState(false);
  const [roadmaps, setRoadmaps] = useState([]);
  const [image, setImage] = useState(placeholder);
  const [loading, setLoading] = useState(true);
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
      setLoading(true);
      const pfp = await Axios.get(
        backendUrl + `/user/images/${currentUser.user.username}`,
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
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser && currentUser.isLoggedIn) {
      fetchUserPfp();
      fetchUserCourses(currentUser.user.username)
        .then((res) => {
          setRoadmaps(res.enrolledRoadmaps);
        })
        .catch((err) => console.log(err));
    }
  }, [editProfile, currentUser]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  if (!currentUser || !currentUser.isLoggedIn) {
    return <NotFoundPage />;
  }

  return (
    <motion.div
      className={styles.container}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {editProfile && <EditProfile setEditProfile={setEditProfile} />}

      <motion.div className={styles.profileCard} variants={itemVariants}>
        <div className={styles.left}>
          <motion.div
            className={styles.profilepic}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img src={image} alt="Profile" />
          </motion.div>

          <motion.div className={styles.userinfo} variants={itemVariants}>
            <p className={styles.username}>
              <FaUser className={styles.icon} />
              <span>{currentUser.user.username}</span>
            </p>
            <p className={styles.email}>
              <FaEnvelope className={styles.icon} />
              <span>{currentUser.user.email}</span>
            </p>
            <p className={styles.date}>
              <FaCalendarAlt className={styles.icon} />
              <span>Member since: {date.toLocaleDateString()}</span>
            </p>
          </motion.div>
        </div>

        <div className={styles.right}>
          <motion.div className={styles.courses} variants={itemVariants}>
            <div className={styles.coursesTitle}>
              <FaBook className={styles.icon} /> Your roadmaps
            </div>
            <div className={styles.coursesList}>
              {roadmaps?.length > 0 ? (
                roadmaps.map((roadmap, index) => (
                  <motion.div
                    key={index}
                    className={styles.course}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <FaBookmark className={styles.courseIcon} />
                    <div className={styles.courseInfo}>
                      <span className={styles.courseTitle}>
                        {roadmap.title}
                      </span>
                      <span className={styles.courseDate}>
                        Enrolled on {roadmap.date.split("T")[0]}
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  className={styles.noCourses}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  No roadmaps enrolled yet
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.div className={styles.button} variants={itemVariants}>
            <motion.button
              onClick={() => setEditProfile((prev) => !prev)}
              className={styles.editButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEdit className={styles.buttonIcon} /> Edit Profile
            </motion.button>

            <motion.button
              onClick={handleSignOut}
              className={styles.signOutButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSignOutAlt className={styles.buttonIcon} /> Sign Out
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
