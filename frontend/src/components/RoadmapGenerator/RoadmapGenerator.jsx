import React from "react";
import Accordion from "../Accordion/Accordion.jsx";
import backendRoadmap from "../../assets/Roadmaps/backendRoadmap.js";

const RoadmapGenerator = () => {
  return (
    <>
      {backendRoadmap.map((section) => (
        <Accordion
          key={section.id}
          id={section.id}
          title={section.title}
          content={section.topics.map((topic) => (
            <Accordion
              key={topic.name}
              title={topic.name}
              content={topic.details}
            />
          ))}
        />
      ))}
    </>
  );
};

export default RoadmapGenerator;
