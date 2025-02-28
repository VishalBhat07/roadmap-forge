import React, { useEffect, useState } from "react";
import styles from "./Topic.module.css";
import { useNavigate, useParams } from "react-router-dom";
import allRoadmaps from "../Roadmap/allRoadmaps";
import dummydata from "./dummydata.js";
import handleTopicCompleted from "../../util/handleTopicCompleted.js";
import fetchTopicCompletionStatus from "../../util/fetchTopicCompletionStatus.js";
import { toast } from "react-toastify";

const Topic = () => {
  const { roadmap, topicid } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("loginState"));
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  fetchTopicCompletionStatus(
    currentUser?.user.username,
    allRoadmaps[roadmap].title,
    topicid,
    setCompleted
  );

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

  return (
    <div className={styles.container}>
      <div className={styles.middle}>
        <div className={styles.topic}>{topicid}</div>
        <div className={styles.content}>{dummydata}</div>
      </div>
      <div className={styles.buttons}>
        <button onClick={() => getPrevSection()} className={styles.navigate}>
          <i className="fa-solid fa-arrow-left-long"></i>
        </button>
        <button
          onClick={() => {
            if (currentUser === null) toast("You need to login first");
            else handleTopicCompleted(roadmap, topicid, setCompleted);
          }}
          className={`${styles.completeButton} ${
            completed ? styles.completed : styles.incomplete
          } `}
        >
          {completed ? (
            <>
              <p>Completed !</p>
              <i className="fa-solid fa-circle-check"></i>
            </>
          ) : (
            <>
              <p>Mark as complete</p>
              <i className="fa-regular fa-square"></i>
            </>
          )}
        </button>
        <button onClick={() => getNextSection()} className={styles.navigate}>
          <i className="fa-solid fa-arrow-right-long"></i>
        </button>
      </div>
    </div>
  );
};

export default Topic;
