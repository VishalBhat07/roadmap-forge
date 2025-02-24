import React from "react";
import { useParams } from "react-router-dom";
import styles from "./Roadmap.module.css";
import RoadmapGenerator from "../../components/RoadmapGenerator/RoadmapGenerator";
import allRoadmaps from "./allRoadmaps.js";

const Roadmap = () => {
  const params = useParams();
  return (
    <div className={styles.container}>
      <RoadmapGenerator roadmap={allRoadmaps[params.id]} />
    </div>
  );
};

export default Roadmap;
