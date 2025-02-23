import React from "react";
import { Link } from "react-router-dom";
import styles from "./Signin.module.css";

const Signin = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <p>Welcome back !</p>
          </div>
          <div className={styles.signin}>
            <form action="" className={styles.form}>
              <input
                className={styles.username}
                type="text"
                placeholder="username"
              />
              <input className={styles.email} type="text" placeholder="email" />
              <input
                className={styles.password}
                type="password"
                placeholder="password"
              />
              <button type="submit" className={styles.ctaButton}>
                Sign In
              </button>
            </form>
          </div>
          <div className={styles.switch}>
            <p>
              Don't have an account? <Link to={"/register"}>click here</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
