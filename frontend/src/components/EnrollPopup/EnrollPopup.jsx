import React from "react";
import styles from "./EnrollPopup.module.css";
import getRoadmapInfo from "../../util/getRoadmapInfo";
import enrollUserCourse from "../../util/enrollUserCourse";
import sendEnrollmentData from "../../util/sendEnrollmentData";
import { useParams } from "react-router-dom";

const EnrollPopup = ({ setEnrollPopup, roadmapTitle }) => {
  const roadmap = getRoadmapInfo(roadmapTitle);
  const currentUser = JSON.parse(localStorage.getItem("loginState"));
  const params = useParams();
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
              sendEnrollmentData(currentUser.user.username, params.id);
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
