import React, { useEffect, useState } from "react";
import styles from "./Topic.module.css";
import { useNavigate, useParams } from "react-router-dom";
import allRoadmaps from "../Roadmap/allRoadmaps";
import { toast } from "react-toastify";

const Topic = () => {
  const { roadmap, topicid } = useParams();
  const [completed, setCompleted] = useState(false);
  const [index, setIndex] = useState(null);
  const [section, setSection] = useState(null);
  const navigate = useNavigate();

  const getRoadmap = (roadmap) => {
    const userRoadmap = allRoadmaps[roadmap].roadmap;
    const allTopics = [];

    for (const section of userRoadmap)
      for (const topic of section.topics) allTopics.push(topic.name);

    return allTopics;
  };

  const getNextSection = () => {
    const allTopics = getRoadmap(roadmap);
    const indexOfTopic = allTopics.indexOf(topicid);

    indexOfTopic !== -1
      ? navigate(
          `/roadmaps/${roadmap}/${allTopics[indexOfTopic + 1].replace(
            "/",
            "-"
          )}`
        )
      : navigate(`/roadmaps/${roadmap}`);
  };

  const getPrevSection = () => {
    const allTopics = getRoadmap(roadmap);
    const prevIndex = allTopics.indexOf(topicid) - 1;

    prevIndex === -1
      ? navigate(`/roadmaps/${roadmap}`)
      : navigate(`/roadmaps/${roadmap}/${allTopics[prevIndex]}`);
  };

  const handleTopicCompleted = () => {
    setCompleted(true);
    toast("Well done !!");
  };

  return (
    <div className={styles.container}>
      <div className={styles.middle}>
        <div className={styles.topic}>{topicid}</div>
        {/* <div>Index : {index}</div> */}
        <div className={styles.content}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate
          enim tempora error repellat optio quibusdam tenetur qui, soluta ex
          itaque, dolore blanditiis cumque nostrum omnis vero libero laborum!
          Quo consectetur tenetur debitis laborum ratione, est dolorem placeat
          consequuntur culpa quaerat nemo eius dicta qui rem illum saepe
          assumenda amet velit! Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Voluptate enim tempora error repellat optio
          quibusdam tenetur qui, soluta ex itaque, dolore blanditiis cumque
          nostrum omnis vero libero laborum! Quo consectetur tenetur debitis
          laborum ratione, est dolorem placeat consequuntur culpa quaerat nemo
          eius dicta qui rem illum saepe assumenda amet velit! Lorem ipsum dolor
          sit amet, consectetur adipisicing elit. Voluptate enim tempora error
          repellat optio quibusdam tenetur qui, soluta ex itaque, dolore
          blanditiis cumque nostrum omnis vero libero laborum! Quo consectetur
          tenetur debitis laborum ratione, est dolorem placeat consequuntur
          culpa quaerat nemo eius dicta qui rem illum saepe assumenda amet
          velit! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Voluptate enim tempora error repellat optio quibusdam tenetur qui,
          soluta ex itaque, dolore blanditiis cumque nostrum omnis vero libero
          laborum! Quo consectetur tenetur debitis laborum ratione, est dolorem
          placeat consequuntur culpa quaerat nemo eius dicta qui rem illum saepe
          assumenda amet velit!
        </div>
      </div>
      <div className={styles.buttons}>
        <button onClick={() => getPrevSection()}>
          <i className="fa-solid fa-arrow-left-long"></i>
        </button>
        <button
          onClick={() => {
            handleTopicCompleted();
          }}
          className={styles.completeButton}
        >
          {completed ? (
            <>
              <p>Completed</p>
              <i className="fa-solid fa-circle-check"></i>
            </>
          ) : (
            <>
              <p>Mark as complete</p>
              <i className="fa-solid fa-hourglass-half"></i>
            </>
          )}
        </button>
        <button onClick={() => getNextSection()}>
          <i className="fa-solid fa-arrow-right-long"></i>
        </button>
      </div>
    </div>
  );
};

export default Topic;
