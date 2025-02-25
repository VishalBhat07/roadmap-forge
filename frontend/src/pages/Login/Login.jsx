import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import login from "../../auth/login";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [userData, setUserData] = useState({
    username: "",
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

    const res = await login(userData.username, userData.password);

    !res.user ? toast.error(res.error) : toast.success(res.message);

    setUserData({
      username: "",
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
                required
              />
              <input
                name="password"
                className={styles.password}
                type="password"
                placeholder="password"
                value={userData.password}
                onChange={handleChange}
                required
              />
              <button type="submit" className={styles.ctaButton}>
                Sign In
              </button>
              <ToastContainer />
            </form>
          </div>
          <div className={styles.switch}>
            <p>
              Don't have an account? <Link to={"/signup"}>click here</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
