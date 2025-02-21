import React from "react";
import styles from "./FeaturedRoadmaps.module.css";

const roadmaps = [
  {
    id: 1,
    title: "Web Development",
    description: "Learn HTML, CSS, JS, and React.",
  },
  {
    id: 2,
    title: "Data Science",
    description: "Master Python, ML, and AI concepts.",
  },
  {
    id: 3,
    title: "DevOps",
    description: "Understand CI/CD, Docker, and Kubernetes.",
  },
];

const FeaturedRoadmaps = () => {
  return (
    <section className={styles.container}>
      <h2>Explore Popular Roadmaps</h2>
      <div className={styles.grid}>
        {roadmaps.map((roadmap) => (
          <div key={roadmap.id} className={styles.card}>
            <h3>{roadmap.title}</h3>
            <p>{roadmap.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedRoadmaps;
