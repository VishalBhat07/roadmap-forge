import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import Axios from "axios";
import createUser from "../../auth/signup";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const port = 8080;
  const timeout = 5000;
  const navigate = useNavigate();
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

    try {
      const res = await createUser(userData);
      if (!res.user) {
        toast.error(res.error);
      } else {
        toast.success(res.message);
        setTimeout(() => navigate("/"), timeout);
      }
    } catch (error) {
      console.log(error);
    }

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
            <p>Create an account !</p>
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
              <ToastContainer autoClose={timeout} />
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
