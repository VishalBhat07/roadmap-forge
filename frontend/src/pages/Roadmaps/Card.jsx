import React from "react";
import styles from "./Card.module.css";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";

const Card = ({ id, title, description, difficulty, duration }) => {
  const navigate = useNavigate();

  const getDifficultyStyle = (level) => {
    const styles = {
      Beginner: {
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        color: '#16a34a',
        border: '1px solid rgba(34, 197, 94, 0.2)'
      },
      Intermediate: {
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        color: '#ea580c',
        border: '1px solid rgba(249, 115, 22, 0.2)'
      },
      Advanced: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        color: '#dc2626',
        border: '1px solid rgba(239, 68, 68, 0.2)'
      }
    };
    return styles[level] || {
      backgroundColor: 'rgba(147, 51, 234, 0.1)',
      color: '#9333ea',
      border: '1px solid rgba(147, 51, 234, 0.2)'
    };
  };

  return (
    <div
      className={styles.card}
      onClick={() =>
        navigate(
          `/roadmaps/${title
            .toLowerCase()
            .replace(/[^a-zA-Z ]/g, "")
            .replace(/\s+/g, "")}`
        )
      }
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && e.target.click()}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <span
          className={styles.difficulty}
          style={getDifficultyStyle(difficulty)}
        >
          {difficulty}
        </span>
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.footer}>
        <span className={styles.duration}>
          <Clock size={16} />
          {duration}
        </span>
      </div>
    </div>
  );
};

export default Card;