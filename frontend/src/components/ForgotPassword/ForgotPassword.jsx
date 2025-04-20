import React, { useEffect, useState } from "react";
import Axios from "axios";
import styles from "./ForgotPassword.module.css";
import { toast } from "react-toastify";
import getForgotPasswordCode from "../../util/getForgotPasswordCode";
import resetPassword from "../../util/resetPassword";
import { useNavigate, Link } from "react-router-dom";

const ForgotPassword = () => {
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [showTimer, setShowTimer] = useState(false);
  const [timer, setTimer] = useState(120);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKENDURL;
  const expiryTimeInMinutes = 2;

  const generateVerificationCode = async () => {
    try {
      const res = await Axios.post(backendUrl + "/auth/verificationcode", {
        userEmail,
      });
      console.log(res.data);
      if (res.data.user) {
        // console.log(res.data);
        toast.success("Verification code has been sent");
        setShowTimer(true);
        setShowOtpInput(true);
        const expiryTime = Date.now() + expiryTimeInMinutes * 60 * 1000;
        const interval = setInterval(() => {
          const remainingTime = Math.ceil((expiryTime - Date.now()) / 1000);
          setTimer(remainingTime);
          if (remainingTime <= 0) {
            clearInterval(interval);
            setShowTimer(false);
          }
        }, 1000);
      } else {
        toast.error("User does not exist");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      resetPassword(userEmail, newPassword);
      navigate("/login");
    } else {
      toast.error("Confirm password and new password don't match");
    }
    setNewPassword("");
    setConfirmPassword("");
  };

  useEffect(() => {
    if (code.length === 6)
      getForgotPasswordCode(userEmail, code, setVerified, setShowTimer);
  }, [code]);

  return (
    <div className={styles.container}>
      <div className={styles.forgotPasswordBox}>
        <p className={styles.title}>Forgot Password</p>
        <input
          type="text"
          placeholder="Enter your email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className={styles.inputField}
        />
        <button onClick={generateVerificationCode} className={styles.ctaButton}>
          Send Code
        </button>
        {showTimer && (
          <div className={styles.timer}>
            Code expires in:{" "}
            {`${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, "0")}`}
          </div>
        )}
        {showOtpInput && (
          <input
            type="text"
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={styles.inputField}
          />
        )}
        {verified && (
          <form onSubmit={handleFormSubmit} className={styles.form}>
            <>
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.inputField}
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.inputField}
              />
            </>
            <button type="submit" className={styles.ctaButton}>
              Submit
            </button>
          </form>
        )}

        <Link to={"/"} className={styles.homebtn}>
          <p>Go to home</p>
          <i className="fa-solid fa-home"></i>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
