import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
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
            <Link className={styles.a} to={"/about"}>
              About
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
          <li className={styles.li}>
            <Link className={styles.a} to={"/signin"}>
              Sign in
            </Link>
          </li>
        </ul>
      </nav>
      <hr className={styles.hrStyle} />
    </>
  );
};

export default Navbar;
