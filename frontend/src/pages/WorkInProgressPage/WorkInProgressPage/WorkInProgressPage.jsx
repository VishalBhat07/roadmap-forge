import React from "react";
import styles from "./WorkInProgressPage.module.css";
import { useNavigate } from "react-router-dom";
import FuzzyText from "../../../blocks/FuzzyText/FuzzyText";

const WorkInProgressPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.number}>
        <FuzzyText
          children
          fontSize={"120px"}
          fontWeight={900}
          fontFamily={"inherit"}
          color={"blueviolet"}
          enableHover={true}
          baseIntensity={0.35}
          hoverIntensity={0.5}
        >
          Work In Progress
        </FuzzyText>
      </div>
      <div className={styles.text1}>
        <FuzzyText
          children
          fontSize={"40px"}
          fontWeight={900}
          fontFamily={"inherit"}
          color={"blueviolet"}
          enableHover={true}
          baseIntensity={0.2}
          hoverIntensity={0.5}
        >
          There's NOTHING here...
        </FuzzyText>
      </div>
      <div className={styles.text2}>
        ...maybe the page you're looking for is not found or never existed
      </div>
      <div className={styles.redirect}>
        <button onClick={() => navigate("/")}>Go To Home</button>
      </div>
    </div>
  );
};

export default WorkInProgressPage;
