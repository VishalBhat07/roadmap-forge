import React from "react";
import styles from "./Card.module.css";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <div
      id={id}
      key={id}
      className={styles.container}
      onClick={() =>
        navigate(
          `/roadmaps/${title
            .toLowerCase()
            .replace(/[^a-zA-Z ]/g, "")
            .replace(/ /g, "")}`
        )
      }
    >
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      <div
        className={styles.difficulty}
        style={{
          backgroundColor: `${getDifficultyColor(difficulty)}`,
          color: "var(--tertiary)",
        }}
      >
        {difficulty}
      </div>
      <div className={styles.duration}>Duration: {duration}</div>
    </div>
  );
};

export default Card;
