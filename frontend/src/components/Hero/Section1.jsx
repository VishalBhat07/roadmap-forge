import React from "react";
import styles from "./Section1.module.css";
import heroimg from "/hero-img.png";
import { useNavigate } from "react-router-dom";
import { Compass, UserPlus } from "lucide-react";
import { toast } from "react-toastify";

const Section1 = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("loginState"));

  return (
    <section className={styles.container}>
      <div className={styles.left}>
        <h1 className={styles.heading}>
          Your Interactive Learning Roadmap Starts Here!
        </h1>
        <p className={styles.subheading}>
          Explore curated roadmaps, track your progress, and join a thriving
          learning community.
        </p>
        <div className={styles.btnContainer}>
          <button
            className={styles.primaryButton}
            onClick={() => navigate("/roadmaps")}
          >
            <Compass size={20} />
            <span>Start Learning</span>
          </button>
          <button
            className={styles.secondaryButton}
            onClick={() => {
              currentUser
                ? toast.warn("You are already logged in", {
                    position: "bottom-right",
                    theme: "dark",
                  })
                : navigate("/signup");
            }}
          >
            <UserPlus size={20} />
            <span>Create Account</span>
          </button>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.imageWrapper}>
          <img src={heroimg} alt="Learning roadmap illustration" />
        </div>
      </div>
    </section>
  );
};

export default Section1;
