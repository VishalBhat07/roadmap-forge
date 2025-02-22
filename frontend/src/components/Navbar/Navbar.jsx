import React from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <a className={styles.a}>Home</a>
          </li>
          <li className={styles.li}>
            <a className={styles.a}>About</a>
          </li>
          <li className={styles.li}>
            <a className={styles.a}>Contact</a>
          </li>
          <li className={styles.li}>
            <a className={styles.a}>Github</a>
          </li>
          <li className={styles.li}>
            <a className={styles.a}>Sign in</a>
          </li>
        </ul>
      </nav>
      <hr className={styles.hrStyle} />
    </>
  );
};

export default Navbar;
