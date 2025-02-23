import React from "react";
import "./NotFoundPage.css";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="number">404</div>
      <div className="text1">There's NOTHING here...</div>
      <div className="text2">
        ...maybe the page you're looking for is not found or never existed
      </div>
      <div className="redirect">
        <button onClick={() => navigate("/")}>Go To Home</button>
      </div>
    </div>
  );
};

export default NotFoundPage;
