import React, { useEffect } from "react";
import styles from "./EnrollPopup.module.css";
import { toast } from "react-toastify";
import getRoadmapInfo from "../../util/getRoadmapInfo";
import Axios from "axios";

const EnrollPopup = ({ setEnrollPopup, roadmapTitle }) => {
  const roadmap = getRoadmapInfo(roadmapTitle);
  const currentUser = JSON.parse(localStorage.getItem("loginState"));
  const enrollUserCourse = async (roadmapTitle) => {
    try {
      const res = await Axios.post("http://localhost:8080/enroll", {
        roadmapTitle: roadmapTitle,
        username: currentUser.user.username,
      });

      toast(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.editProfile}>
      <div className={styles.header}>
        <p>Confirmation</p>
        <i
          className="fa-solid fa-close"
          onClick={() => setEnrollPopup((enrollPopup) => !enrollPopup)}
        ></i>
      </div>
      <div className={styles.details}>
        <div className={styles.courseInfo}>
          <p>
            <strong>Title</strong> : {roadmap.title}
          </p>
          <p>
            <strong>Description</strong> : {roadmap.description}
          </p>
          <p>
            <strong>Difficulty</strong> : {roadmap.difficulty}
          </p>
          <p>
            <strong>Duration</strong> : {roadmap.duration}
          </p>
        </div>
      </div>
      <div className={styles.buttons}>
        <p>Click "YES" to start the roadmap</p>
        <div>
          <button
            className={`${styles.submit} ${styles.submitYes}`}
            onClick={() => {
              setEnrollPopup((enrollPopup) => !enrollPopup);
              enrollUserCourse(roadmapTitle);
            }}
          >
            YES
          </button>
          <button
            className={`${styles.submit} ${styles.submitNo}`}
            onClick={() => setEnrollPopup((enrollPopup) => !enrollPopup)}
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnrollPopup;
