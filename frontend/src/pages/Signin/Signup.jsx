import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import createUser from "../../auth/signup";
import { toast } from "react-toastify";
import AuthContext from "../../context/authContext";

const Signup = () => {
  const navigate = useNavigate();
  const { loginState, setLoginState } = useContext(AuthContext);
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
        setTimeout(() => navigate("/"), 4000);
        const newLoginState = {
          user: res.user,
          isLoggedIn: true,
        };
        setLoginState(newLoginState);
        localStorage.setItem("loginState", JSON.stringify(newLoginState));
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
