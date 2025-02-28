import React, { useState } from "react";
import styles from "./Accordion.module.css";
import { useNavigate, useParams } from "react-router-dom";

const Accordion = ({ id, title, content }) => {
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  function handleToggle() {
    setShow(!show);
  }

  return (
    <div className={styles.accordion} key={id}>
      <div className={styles.top} onClick={handleToggle}>
        <div className={styles.header}>{title}</div>
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
