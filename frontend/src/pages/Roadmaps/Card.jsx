import React from "react";
import styles from "./Card.module.css";

const Card = ({ id, title, description, difficulty, duration }) => {
  function getDifficultyColor(difficulty) {
    switch (difficulty) {
      case "Beginner":
        return "green";
      case "Intermediate":
        return "orange";
      case "Advanced":
        return "red";
      default:
        return "purple";
    }
  }

  return (
    <div id={id} key={id} className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      <div
        className={styles.difficulty}
        style={{ backgroundColor: `${getDifficultyColor(difficulty)}` }}
      >
        {difficulty}
      </div>
      <div className={styles.duration}>Duration: {duration}</div>
    </div>
  );
};

export default Card;
