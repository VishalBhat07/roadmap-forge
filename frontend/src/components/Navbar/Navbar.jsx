import React, { useContext, useState } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { loginState, setLoginState } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = () => {
    setLoginState({ user: null, isLoggedIn: false });
    localStorage.removeItem("loginState");
    toast.success("Signed out successfully");
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
            <li
              className={styles.dropdown}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <div className={styles.dropdownHeader}>
                <button className={styles.profileButton}>
                  <p>
                    {
                      JSON.parse(localStorage.getItem("loginState")).user
                        .username
                    }
                  </p>{" "}
                  <i className="fa-solid fa-user"></i>
                </button>
              </div>
              {dropdownOpen && (
                <div
                  className={styles.dropdownContent}
                  onClick={() => setDropdownOpen(false)}
                >
                  <div>
                    <Link className={styles.dropdownLinks} to={"/profile"}>
                      <p>My Profile</p>
                      <i class="fa-solid fa-id-card"></i>
                    </Link>
                  </div>
                  <div>
                    <Link
                      className={styles.dropdownLinks}
                      to={"/"}
                      onClick={handleSignOut}
                    >
                      <p>Sign out</p>
                      <i class="fa-solid fa-right-from-bracket"></i>
                    </Link>
                  </div>
                  <div>
                    <Link className={styles.dropdownLinks} to={"/settings"}>
                      <p>Settings</p>
                      <i class="fa-solid fa-gear"></i>
                    </Link>
                  </div>
                </div>
              )}
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
      {/* <hr className={styles.hrStyle} /> */}
    </>
  );
};

export default Navbar;
