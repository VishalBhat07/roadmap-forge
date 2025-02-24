import React from "react";
import "./NotFoundPage.css";
import { useNavigate } from "react-router-dom";
import FuzzyText from "../../blocks/FuzzyText/FuzzyText";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="number">
        <FuzzyText
          children
          fontSize={"220px"}
          fontWeight={900}
          fontFamily={"inherit"}
          color={"blueviolet"}
          enableHover={true}
          baseIntensity={0.25}
          hoverIntensity={0.5}
        >
          404
        </FuzzyText>
      </div>
      <div className="text1">
        <FuzzyText
          children
          fontSize={"40px"}
          fontWeight={900}
          fontFamily={"inherit"}
          color={"blueviolet"}
          enableHover={true}
          baseIntensity={0.2}
          hoverIntensity={0.5}
        >
          There's NOTHING here...
        </FuzzyText>
      </div>
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
