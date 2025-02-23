import React from "react";
import styles from "./Section3.module.css";
import heroimg from "../../assets/js.png";

const Section3 = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <h2>🚀 JavaScript: The Language of Web</h2>
          <p>
            JavaScript powers the modern web, from dynamic websites to
            full-stack applications. Follow our interactive roadmap and master
            JavaScript efficiently.
          </p>
          <div className={styles.box}>
            <div>
              <ul>
                <li>✅ Beginner to Advanced Concepts Covered</li>
                <li>✅ Hands-on Projects & Challenges</li>
                <li>✅ Community Support & Discussions</li>
                <li>✅ AI-Suggested Learning Paths</li>
              </ul>
            </div>
            <div>
              <button className={styles.ctaButton}>
                Start Learning JavaScript
              </button>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <img src={heroimg} alt="Hero Image" />
        </div>
      </div>
    </>
  );
};

export default Section3;
