import React, { useState } from "react";
import styles from "./Accordion.module.css";

const Accordion = ({ id, title, content }) => {
  const [show, setShow] = useState(false);

  function handleToggle() {
    setShow(!show);
  }

  return (
    <div className={styles.accordion} key={id}>
      <div className={styles.top}>
        <div className={styles.header} onClick={handleToggle}>
          {title}
        </div>
        <button onClick={handleToggle} className={styles.button}>
          {show ? (
            <i className="fa-solid fa-arrow-up"></i>
          ) : (
            <i className="fa-solid fa-arrow-down"></i>
          )}
        </button>
      </div>
      <div
        className={`${styles.content} ${show ? styles.visible : styles.hidden}`}
      >
        {content}
      </div>
    </div>
  );
};

export default Accordion;
