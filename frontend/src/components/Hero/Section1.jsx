import React from "react";
import styles from "./Section1.module.css";
import heroimg from "../../assets/hero-img.png";
import { useNavigate } from "react-router-dom";

const Section1 = () => {
  const navigate = useNavigate();
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
            <button onClick={() => navigate("/roadmaps")}>
              Start learning
            </button>
            <button onClick={() => navigate("/signup")}>
              Create an account
            </button>
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
