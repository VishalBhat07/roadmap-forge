import React from "react";
import Accordion from "../Accordion/Accordion.jsx";
import List from "../List/List.jsx";

const RoadmapGenerator = ({ roadmap }) => {
  return (
    <>
      {roadmap.map((section) => (
        <Accordion
          key={section.id}
          id={section.id}
          title={section.title}
          content={section.topics.map((topic) => (
            <List key={topic.name} title={topic.name} content={topic.details} />
          ))}
        />
      ))}
    </>
  );
};

export default RoadmapGenerator;
