import React from "react";
import styles from "./Section4.module.css";
import { Users, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Section4 = () => {
  return (
    <div className={`${styles.container} ${styles.overlay}`}>
      <div className={styles.content}>
        <h2 className={styles.heading}>Be Part of Something Bigger</h2>
        <p className={styles.subheading}>
          Connect, learn, and grow with a passionate developer community.
        </p>
        <div className={styles.buttons}>
          <Link to="/community" className={styles.button}>
            <Users size={20} />
            <span>Explore Community</span>
          </Link>
          <a
            href="https://discord.gg/k7E7Y2CF"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.buttonOutline}
          >
            <MessageCircle size={20} />
            <span>Join Discord</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Section4;
