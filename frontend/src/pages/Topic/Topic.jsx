import React, { useEffect, useState } from "react";
import styles from "./Topic.module.css";
import { useNavigate, useParams } from "react-router-dom";
import allRoadmaps from "../Roadmap/allRoadmaps";
import handleTopicCompleted from "../../util/handleTopicCompleted.js";
import fetchTopicCompletionStatus from "../../util/fetchTopicCompletionStatus.js";
import { toast } from "react-toastify";
import fetchTopicContent from "../../util/fetchTopicContent.js";
import MarkdownRenderer from "../../components/MarkdownRenderer/MarkdownRenderer.jsx";

const Topic = () => {
  const { roadmap, topicid } = useParams();
  const [topicContent, setTopicContent] = useState("## Loading...");
  const [isLoading, setIsLoading] = useState(true); // Controls spinner visibility
  const currentUser = JSON.parse(localStorage.getItem("loginState"));
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  // Fetch topic completion status
  useEffect(() => {
    if (currentUser) {
      fetchTopicCompletionStatus(
        currentUser?.user.username,
        allRoadmaps[roadmap]?.title,
        topicid,
        setCompleted
      );
    }
  }, [roadmap, topicid, currentUser]);

  // Fetch topic content and show spinner for at least 5 seconds
  useEffect(() => {
    setIsLoading(true); // Show spinner immediately

    fetchTopicContent(allRoadmaps[roadmap]?.title, topicid, setTopicContent);

    // Ensure spinner stays visible for at least 5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [roadmap, topicid]);

  const getRoadmap = (roadmap) => {
    const userRoadmap = allRoadmaps[roadmap]?.roadmap || [];
    return userRoadmap.flatMap((section) =>
      section.topics.map((topic) => topic.name)
    );
  };

  const getNextSection = () => {
    const allTopics = getRoadmap(roadmap);
    const indexOfTopic = allTopics.indexOf(topicid);

    if (indexOfTopic !== -1 && indexOfTopic + 1 < allTopics.length) {
      navigate(
        `/roadmaps/${roadmap}/${allTopics[indexOfTopic + 1].replace("/", "-")}`
      );
    } else {
      navigate(`/roadmaps/${roadmap}`);
    }
  };

  const getPrevSection = () => {
    const allTopics = getRoadmap(roadmap);
    const prevIndex = allTopics.indexOf(topicid) - 1;

    if (prevIndex >= 0) {
      navigate(`/roadmaps/${roadmap}/${allTopics[prevIndex]}`);
    } else {
      navigate(`/roadmaps/${roadmap}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.middle}>
        <div className={styles.topic}>{topicid}</div>

        {isLoading ? (
          <div className={styles.spinner}>
            Hold on, while we find the best content for you...
          </div> // Spinner here
        ) : (
          <div className={styles.content}>
            <MarkdownRenderer content={topicContent} />
          </div>
        )}
      </div>

      <div className={styles.buttons}>
        <button onClick={getPrevSection} className={styles.navigate}>
          <i className="fa-solid fa-arrow-left-long"></i>
        </button>
        <button
          onClick={() => {
            if (!currentUser) {
              toast("You need to login first");
            } else {
              handleTopicCompleted(roadmap, topicid, setCompleted);
            }
          }}
          className={`${styles.completeButton} ${
            completed ? styles.completed : styles.incomplete
          }`}
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
        <button onClick={getNextSection} className={styles.navigate}>
          <i className="fa-solid fa-arrow-right-long"></i>
        </button>
      </div>
    </div>
  );
};

export default Topic;
