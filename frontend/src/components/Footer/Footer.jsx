import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.clippedBackground}></div>

      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.logo}>
            <h1 className={styles.logoname}>RoadMapForge</h1>
            <i className="fa-solid fa-hammer"></i>
          </div>
          <div className={styles.social}>
            <ul>
              <li>
                <i className="fa-brands fa-github"></i>
              </li>
              <li>
                <i className="fa-brands fa-whatsapp"></i>
              </li>
              <li>
                <i className="fa-brands fa-linkedin"></i>
              </li>
              <li>
                <i className="fa-brands fa-discord"></i>
              </li>
              <li>
                <i className="fa-brands fa-x-twitter"></i>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.quickLinks}>
            <h3 className={styles.columnheaders}>Quick Links</h3>
            <div>
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
                  <a>More projects</a>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.contactUs}>
            <h3 className={styles.columnheaders}>Contact Us</h3>
            <div>
              <ul>
                <li>
                  <i className="fa-solid fa-location-dot"></i>
                  <a>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Dicta, mollitia.
                  </a>
                </li>
                <li>
                  <i className="fa-brands fa-whatsapp"></i>
                  <a href="">+91 7975806665</a>
                </li>
                <li>
                  <i className="fa-solid fa-envelope"></i>
                  <a href="mailto:vishalkbhat.cs23@rvce.edu.in">
                    vishalkbhat.cs23@rvce.edu.in
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.emailInput}>
            <h3 className={styles.columnheaders}>Remain Updated</h3>
            <form>
              <input type="text" placeholder="Your email address" />
              <button className={styles.signUp}>Sign up</button>
            </form>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.copyrights}>
            &copy; 2025. All rights reserved.
          </div>
          <div className={styles.designed}>Designed by Vishal Bhat</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
