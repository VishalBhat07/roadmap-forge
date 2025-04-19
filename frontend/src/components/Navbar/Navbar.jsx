import React, { useContext, useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { loginState, setLoginState } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30); // Adjust threshold here
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    console.log(window.innerWidth);
    console.log(isMobile);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSignOut = () => {
    setLoginState({ user: null, isLoggedIn: false });
    localStorage.removeItem("loginState");
    toast.success("Signed out successfully");
  };

  return (
    <>
      {isMobile ? (
        !sidebarOpen && (
          <div className={styles.hamburgerWrapper}>
            <button
              className={styles.hamburger}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ color: "black" }}
            >
              ☰
            </button>
          </div>
        )
      ) : (
        <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
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
      )}

      {isMobile && sidebarOpen && (
        <div className={styles.sidebar}>
          <button
            className={styles.closeBtn}
            onClick={() => setSidebarOpen(false)}
          >
            ✖
          </button>
          <Link
            to="/"
            className={styles.sidebarLink}
            onClick={() => setSidebarOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/roadmaps"
            className={styles.sidebarLink}
            onClick={() => setSidebarOpen(false)}
          >
            Roadmaps
          </Link>
          <Link
            to="/community"
            className={styles.sidebarLink}
            onClick={() => setSidebarOpen(false)}
          >
            Community
          </Link>
          <Link
            to="https://github.com/VishalBhat07"
            className={styles.sidebarLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setSidebarOpen(false)}
          >
            GitHub
          </Link>

          {loginState?.isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className={styles.sidebarLink}
                onClick={() => setSidebarOpen(false)}
              >
                My Profile
              </Link>
              <Link
                to="/"
                onClick={() => {
                  handleSignOut();
                  setSidebarOpen(false);
                }}
                className={styles.sidebarLink}
              >
                Sign Out
              </Link>
              <Link
                to="/settings"
                className={styles.sidebarLink}
                onClick={() => setSidebarOpen(false)}
              >
                Settings
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className={styles.sidebarLink}
              onClick={() => setSidebarOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}

      {/* <hr className={styles.hrStyle} /> */}
    </>
  );
};

export default Navbar;
