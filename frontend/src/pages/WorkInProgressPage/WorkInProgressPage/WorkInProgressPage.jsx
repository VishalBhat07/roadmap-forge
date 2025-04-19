import React from "react";
import "../../NotFoundPage/NotFoundPage.css";
import { useNavigate } from "react-router-dom";
import FuzzyText from "../../../blocks/FuzzyText/FuzzyText";

const WorkInProgressPage = () => {
  const navigate = useNavigate();

  // Hook to detect mobile
  const isMobile = useIsMobile();

  return (
    <div className="container">
      <div className="number">
        <FuzzyText
          fontSize={isMobile ? "50px" : "140px"}
          fontWeight={900}
          fontFamily={"inherit"}
          color={"#03045e"}
          enableHover={true}
          baseIntensity={0.25}
          hoverIntensity={0.5}
        >
          Work In Progress
        </FuzzyText>
      </div>
      <div className="text1">
        <FuzzyText
          fontSize={isMobile ? "28px" : "40px"}
          fontWeight={900}
          fontFamily={"inherit"}
          color={"#03045e"}
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

// Reuse the custom hook
const useIsMobile = (breakpoint = 600) => {
  const [isMobile, setIsMobile] = React.useState(
    window.innerWidth <= breakpoint
  );

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

export default WorkInProgressPage;
