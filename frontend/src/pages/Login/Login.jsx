import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import login from "../../auth/login";
import { ToastContainer, toast } from "react-toastify";
import AuthContext from "../../context/authContext";

const Login = () => {
  const navigate = useNavigate();
  const timeout = 5000;
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const { loginState, setLoginState } = useContext(AuthContext);

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

    if (!res.user) toast.error(res.error);
    else {
      toast.success(res.message);
      setTimeout(() => navigate("/"), timeout);
      const newLoginState = {
        user: res.user,
        isLoggedIn: true,
      };
      setLoginState(newLoginState);
      localStorage.setItem("loginState", JSON.stringify(newLoginState));
    }

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
              <ToastContainer autoClose={timeout} />
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
