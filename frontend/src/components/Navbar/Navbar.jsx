import React from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>About</a>
          </li>
          <li>
            <a>Contact</a>
          </li>
          <li>
            <a>Github</a>
          </li>
          <li>
            <a>Sign in</a>
          </li>
        </ul>
      </nav>
      <hr className={styles.hrStyle} />
    </>
  );
};

export default Navbar;
