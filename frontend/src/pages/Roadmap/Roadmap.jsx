import React from "react";
import { useParams } from "react-router-dom";
import styles from "./Roadmap.module.css";
import RoadmapGenerator from "../../components/RoadmapGenerator/RoadmapGenerator";
import allRoadmaps from "./allRoadmaps.js";

const Roadmap = () => {
  const params = useParams();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.courseInfo}>{allRoadmaps[params.id].title}</div>
        <div className={styles.buttons}>
          <button>
            <p> Start learning</p>{" "}
            <i className="fa-solid fa-graduation-cap"></i>
          </button>
          <button>
            <p> Join Community</p> <i className="fa-brands fa-discord"></i>
          </button>
        </div>
      </div>
      <RoadmapGenerator roadmap={allRoadmaps[params.id].roadmap} />
    </div>
  );
};

export default Roadmap;
