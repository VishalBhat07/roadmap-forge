import React, { useEffect, useState } from "react";
import Axios from "axios";
import styles from "./ForgotPassword.module.css";
import { toast } from "react-toastify";
import getForgotPasswordCode from "../../util/getForgotPasswordCode";

const ForgotPassword = () => {
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [showTimer, setShowTimer] = useState(false);
  const timer = 1;
  const backendUrl = import.meta.env.VITE_BACKENDURL;

  const generateVerificationCode = async () => {
    try {
      const res = await Axios.post(backendUrl + "/verificationcode", {
        userEmail: userEmail,
      });
      if (res.data.user) {
        toast.success("Verification code has been sent");
        setShowTimer((showTimer) => !showTimer);
      } else {
        toast.error("User does not exist");
      }
    } catch (err) {
      console.log(err);
    }
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
      {/* {showTimer && (
        <div>Code expires in : {getCodeExpiryTime(userEmail) - Date.now()}</div>
      )} */}
      <form>
        <input
          type="text"
          placeholder="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        {verified ? (
          <>
            <input type="password" placeholder="new password" />
            <input type="password" placeholder="re enter new password" />
          </>
        ) : null}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
