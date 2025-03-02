import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import login from "../../auth/login";
import { toast } from "react-toastify";
import AuthContext from "../../context/authContext";
import ForgotPassword from "../../components/ForgotPassword/ForgotPassword";

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const { loginState, setLoginState } = useContext(AuthContext);
  const [forgetPasswordPopup, setForgetPasswordPopup] = useState(false);

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
      setTimeout(() => navigate("/"), 4000);
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
      {forgetPasswordPopup && <ForgotPassword />}
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
            <p>RoadMapForge</p>
            <i className="fa-solid fa-hammer"></i>
          </div>
        </div>
        <div className={styles.modalcontainer}>
          <div className={styles.modal}>
            <div className={styles.modaltitle}>
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
              </form>
            </div>
            <div className={styles.switch}>
              <p>
                Don't have an account? <Link to={"/signup"}>click here</Link>
              </p>
              <p>
                Forgot your password?{" "}
                <Link
                  onClick={() =>
                    setForgetPasswordPopup(
                      (forgetPasswordPopup) => !forgetPasswordPopup
                    )
                  }
                >
                  click here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
