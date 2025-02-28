import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Roadmap.module.css";
import RoadmapGenerator from "../../components/RoadmapGenerator/RoadmapGenerator";
import allRoadmaps from "./allRoadmaps.js";
import EnrollPopup from "../../components/EnrollPopup/EnrollPopup.jsx";
import { toast } from "react-toastify";
import Axios from "axios";

const Roadmap = () => {
  const params = useParams();
  const [enrollPopup, setEnrollPopup] = useState(false);
  const roadmapTitle = allRoadmaps[params.id].title;
  const roadmap = allRoadmaps[params.id].roadmap;
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("loginState"));
  const username = currentUser.user.username;
  const backendUrl = import.meta.env.VITE_BACKENDURL;

  const redirect = () => {
    toast("Login to enroll in any course");
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
