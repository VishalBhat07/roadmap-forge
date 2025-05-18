import React from "react";
import styles from "./Section3.module.css";
import heroimg from "/js.png";
import { Code, Terminal, Users, Lightbulb, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Section3 = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h2 className={styles.heading}>
          <span className={styles.highlightText}>JavaScript:</span> The Language
          of Web
        </h2>
        <p className={styles.description}>
          JavaScript powers the modern web, from dynamic websites to full-stack
          applications. Follow our interactive roadmap and master JavaScript
          efficiently.
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
            <button
              className={styles.ctaButton}
              onClick={() => navigate("/raodmaps")}
            >
              <span>Start Learning JavaScript</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.imageWrapper}>
          <img src={heroimg} alt="JavaScript Learning Path" />
        </div>
      </div>
    </div>
  );
};

export default Section3;
