import React, { useEffect, useState } from "react";
import Axios from "axios";
import styles from "./ForgotPassword.module.css";
import { toast } from "react-toastify";
import getForgotPasswordCode from "../../util/getForgotPasswordCode";
import resetPassword from "../../util/resetPassword";

const ForgotPassword = () => {
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const [showTimer, setShowTimer] = useState(false);
  const [timer, setTimer] = useState(60);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const backendUrl = import.meta.env.VITE_BACKENDURL;

  const generateVerificationCode = async () => {
    try {
      const res = await Axios.post(backendUrl + "/verificationcode", {
        userEmail: userEmail,
      });
      if (res.data.user) {
        toast.success("Verification code has been sent");
        setShowTimer((showTimer) => !showTimer);
        const expiryTime = Date.now() + 1 * 60 * 1000;
        setInterval(() => {
          setTimer(Math.ceil((expiryTime - Date.now()) / 1000));
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
    } else {
      toast.error("Confirm password and new password don't match");
    }

    setNewPassword("");
    setConfirmPassword("");
  };

  useEffect(() => {
    if (code.length === 6) getForgotPasswordCode(userEmail, code, setVerified);
  }, [code]);

  return (
    <div>
      <p>Enter your email</p>
      <input
        type="text"
        placeholder="email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <button onClick={() => generateVerificationCode()}>Send code</button>
      {showTimer && timer >= 0 && <div>Code expires in :{timer}</div>}
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        {verified ? (
          <>
            <input
              type="password"
              placeholder="new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              name="newpassword"
            />
            <input
              type="password"
              placeholder="re enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirmpassword"
            />
          </>
        ) : null}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
