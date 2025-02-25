import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Signup.module.css";
import Axios from "axios";
import createUser from "../../auth/signup";

const Signup = () => {
  const port = 8080;
  const backendUrl = `http://localhost:${port}/signin`;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted successfully");

    createUser(userData);

    setUserData({
      username: "",
      email: "",
      password: "",
    });
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
                Sign Up
              </button>
            </form>
          </div>
          <div className={styles.switch}>
            <p>
              Already have an account? <Link to={"/login"}>click here</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
