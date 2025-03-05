import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Roadmap.module.css";
import RoadmapGenerator from "../../components/RoadmapGenerator/RoadmapGenerator";
import allRoadmaps from "./allRoadmaps.js";
import EnrollPopup from "../../components/EnrollPopup/EnrollPopup.jsx";
import { toast } from "react-toastify";
import fetchAllTopics from "../../util/fetchAllTopics.js";
import fetchUserCourses from "../../util/fetchUserCourses.js";

const Roadmap = () => {
  const params = useParams();
  const [enrollPopup, setEnrollPopup] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const roadmapTitle = allRoadmaps[params.id].title;
  const roadmap = allRoadmaps[params.id].roadmap;
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("loginState"));

  useEffect(() => {
    fetchAllTopics(currentUser?.user.username, roadmapTitle)
      .then((res) => {
        console.log(res);
        setProgress(res);
      })
      .catch((err) => {
        console.log(err);
      });

    fetchUserCourses(currentUser?.user.username)
      .then((res) => {
        const isEnrolled = res.enrolledRoadmaps.find(
          (roadmap) => roadmap.title === roadmapTitle
        );

        console.log(isEnrolled);

        if (isEnrolled !== null && isEnrolled?.title === roadmapTitle) {
          setEnrolled(true);
          console.log(enrolled);
        }
      })
      .catch((err) => console.log(err));
  }, [currentUser]);

  const redirect = () => {
    toast("Login to enroll in any roadmap");
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      {enrollPopup ? (
        <EnrollPopup
          setEnrollPopup={setEnrollPopup}
          roadmapTitle={roadmapTitle}
        />
      ) : null}
      <div className={styles.header}>
        <div className={styles.courseInfo}>{roadmapTitle}</div>
        <div className={styles.buttons}>
          {enrolled ? (
            <button className={styles.progressbar}>
              <p> Progress : {(progress * 100).toFixed(2)}%</p>{" "}
              <i className="fa-solid fa-spinner"></i>
            </button>
          ) : (
            <button
              onClick={() => {
                currentUser !== null && currentUser.isLoggedIn
                  ? setEnrollPopup((enrollPopup) => !enrollPopup)
                  : redirect();
              }}
            >
              <p> Start learning</p>{" "}
              <i className="fa-solid fa-graduation-cap"></i>
            </button>
          )}
          <button>
            <p> Join Community</p> <i className="fa-brands fa-discord"></i>
          </button>
        </div>
      </div>
      <RoadmapGenerator roadmap={roadmap} />
    </div>
  );
};

export default Roadmap;
