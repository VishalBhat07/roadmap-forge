import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Signin.module.css";

const Signin = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted successfully");
    setUserData({
      username: "",
      email: "",
      password: "",
    });
    console.log(userData);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <p>Welcome back !</p>
          </div>
          <div className={styles.signin}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                name="username"
                className={styles.username}
                type="text"
                placeholder="username"
                value={userData.username}
                onChange={handleChange}
              />
              <input
                name="email"
                className={styles.email}
                type="text"
                placeholder="email"
                value={userData.email}
                onChange={handleChange}
              />
              <input
                name="password"
                className={styles.password}
                type="password"
                placeholder="password"
                value={userData.password}
                onChange={handleChange}
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
