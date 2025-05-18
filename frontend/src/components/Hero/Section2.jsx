import React from "react";
import styles from "./Section2.module.css";
import heroimg from "../../assets/cpp.png";
import { Code, Terminal, Users, Lightbulb, ArrowRight } from "lucide-react";

const Section2 = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imageWrapper}>
          <img src={heroimg} alt="C++ Learning Path" />
        </div>
      </div>
      <div className={styles.right}>
        <h2 className={styles.heading}>
          <span className={styles.highlightText}>Master C++</span> with a
          Structured Learning Path
        </h2>
        <p className={styles.description}>
          C++ is the backbone of high-performance applications, from game
          engines to system software. Follow our interactive roadmap and level
          up your skills efficiently.
        </p>
        <div className={styles.featuresContainer}>
          <div className={styles.featuresList}>
            <div className={styles.featureItem}>
              <Code size={20} />
              <span>Beginner to Advanced Concepts Covered</span>
            </div>
            <div className={styles.featureItem}>
              <Terminal size={20} />
              <span>Hands-on Projects & Challenges</span>
            </div>
            <div className={styles.featureItem}>
              <Users size={20} />
              <span>Community Support & Discussions</span>
            </div>
            <div className={styles.featureItem}>
              <Lightbulb size={20} />
              <span>AI-Suggested Learning Paths</span>
            </div>
          </div>
          <div className={styles.ctaContainer}>
            <button className={styles.ctaButton}>
              <span>Start Learning C++</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
