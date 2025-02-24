import React, { useState } from "react";
import "./Accordion.css";

const Accordion = ({ id, title, content }) => {
  const [show, setShow] = useState(false);

  console.log(title);

  function handleToggle() {
    setShow(!show);
  }

  return (
    <div className="accordion" key={id}>
      <div className="top">
        <div className="header" onClick={handleToggle}>
          {title}
        </div>
        <button onClick={handleToggle} className="button">
          {show ? (
            <i className="fa-solid fa-arrow-up"></i>
          ) : (
            <i className="fa-solid fa-arrow-down"></i>
          )}
        </button>
      </div>
      <div className="content" style={{ display: show ? "block" : "none" }}>
        {content}
      </div>
    </div>
  );
};

export default Accordion;
