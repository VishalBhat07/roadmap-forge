import React from "react";
import styles from "./Section2.module.css";
import heroimg from "../../assets/cpp.png";

const Section2 = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={heroimg} alt="C++ Learning Path" />
      </div>
      <div className={styles.right}>
        <h2>🚀 Master C++ with a Structured Learning Path</h2>
        <p>
          C++ is the backbone of high-performance applications, from game
          engines to system software. Follow our interactive roadmap and level
          up your skills efficiently.
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
            <button className={styles.ctaButton}>Start Learning C++</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
