import React, { useContext } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { loginState, setLoginState } = useContext(AuthContext);

  const handleSignOut = () => {
    setLoginState({ user: null, isLoggedIn: false });
    localStorage.removeItem("loginState");
    console.log("Signed out succesfully");
    toast("Signed out sucessfully");
  };

  return (
    <>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link className={styles.a} to={"/"}>
              Home
            </Link>
          </li>
          <li className={styles.li}>
            <Link className={styles.a} to={"/roadmaps"}>
              Roadmaps
            </Link>
          </li>
          <li className={styles.li}>
            <Link className={styles.a} to={"/community"}>
              Community
            </Link>
          </li>
          <li className={styles.li}>
            <Link
              className={styles.a}
              to={"https://github.com/VishalBhat07"}
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </Link>
          </li>
          {localStorage.getItem("loginState") !== null ? (
            <li className={styles.li}>
              <Link
                className={`${styles.a} ${styles.signin}`}
                to={"/"}
                onClick={handleSignOut}
              >
                Sign out
              </Link>
            </li>
          ) : (
            <li className={styles.li}>
              <Link className={`${styles.a} ${styles.signin}`} to={"/login"}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <hr className={styles.hrStyle} />
    </>
  );
};

export default Navbar;
