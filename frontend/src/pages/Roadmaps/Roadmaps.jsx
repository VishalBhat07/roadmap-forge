import React from "react";
import styles from "./Roadmaps.module.css";
import roadmaps from "./roadmaps.js";
import Card from "./Card.jsx";

const Roadmaps = () => {
  return (
    <div className={styles.container}>
      {roadmaps.map((roadmap) => (
        <Card
          id={roadmap.id}
          key={roadmap.id}
          title={roadmap.title}
          description={roadmap.description}
          difficulty={roadmap.difficulty}
          duration={roadmap.duration}
        />
      ))}
    </div>
  );
};

export default Roadmaps;
