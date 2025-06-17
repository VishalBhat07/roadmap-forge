import React, { useContext, useState } from "react";
import { Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import createUser from "../../auth/signup";
import { toast } from "react-toastify";
import AuthContext from "../../context/authContext";

const Signup = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const defaultEmail = queryParams.get("email") || "";
  const { loginState, setLoginState } = useContext(AuthContext);
  const currentUser = JSON.parse(localStorage.getItem("loginState"));
  const [userData, setUserData] = useState({
    username: "",
    email: defaultEmail,
    password: "",
  });

  console.log(location);
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
      console.log(res);
      if (!res.user) {
        if (res.message === "Username is already taken")
          toast("Username is already taken");
        else toast.error(res.error);
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

  return !currentUser ? (
    <>
      <div className={styles.container}>
        <div
          className={styles.header}
          style={{
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <p className={styles.roadmapforge}>RoadMapForge</p>
            <i className="fa-solid fa-hammer"></i>
          </div>
        </div>
        <div className={styles.modal}>
          <div className={styles.modaltitle}>
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
  ) : (
    <Navigate to="/" />
  );
};

export default Signup;
