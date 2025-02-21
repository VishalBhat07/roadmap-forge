import React from "react";
import styles from "./Section1.module.css";
import heroimg from "../../assets/hero-img.png";

const Section1 = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <h2>Your Interactive Learning Roadmap Starts Here!</h2>
          <p>
            Explore curated roadmaps, track your learning, and contribute to the
            community.
          </p>
          <div className={styles.btns}>
            <button>Start learning</button>
            <button>Create an account</button>
          </div>
        </div>
        <div className={styles.right}>
          <img src={heroimg} alt="Hero Image" />
        </div>
      </div>
    </>
  );
};

export default Section1;
