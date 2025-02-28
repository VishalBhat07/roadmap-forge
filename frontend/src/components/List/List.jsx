import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./List.module.css";

const List = ({ id, title, content }) => {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <div>
      <div className={styles.list} key={id}>
        <div className={styles.top}>
          <div
            className={styles.header}
            onClick={() => navigate(`/roadmaps/${params.id}/${title}`)}
          >
            {title}
          </div>
          <button
            onClick={() => navigate(`/roadmaps/${params.id}/${title}`)}
            className={styles.button}
          >
            <i className="fa-solid fa-arrow-right-long"></i>
          </button>
        </div>
        <div className={styles.content}>{content}</div>
      </div>
    </div>
  );
};

export default List;
