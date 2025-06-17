import React, { useEffect, useState } from "react";
import styles from "./Topic.module.css";
import { useNavigate, useParams } from "react-router-dom";
import allRoadmaps from "../Roadmap/allRoadmaps";
import handleTopicCompleted from "../../util/handleTopicCompleted.js";
import fetchTopicCompletionStatus from "../../util/fetchTopicCompletionStatus.js";
import { toast } from "react-toastify";
import fetchTopicContent from "../../util/fetchTopicContent.js"; // ✅ make sure this returns a Promise
import RenderStructuredContent from "../../components/RenderStructuredContent/RenderStructuredContent.jsx";

const Topic = () => {
  const { roadmap, topicid } = useParams();
  const [topicContent, setTopicContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("loginState"));
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  // ✅ Fetch completion status
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

  // ✅ Proper loader & fetch sync
  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      const start = Date.now();

      try {
        const content = await fetchTopicContent(
          allRoadmaps[roadmap]?.title,
          topicid
        );
        setTopicContent(content);
      } catch (error) {
        console.error("Error fetching topic content:", error);
        toast.error("Failed to load content");
      } finally {
        const duration = Date.now() - start;
        const remainingTime = 2000 - duration;
        setTimeout(
          () => setIsLoading(false),
          remainingTime > 0 ? remainingTime : 0
        );
      }
    };

    loadContent();
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
      {!isLoading && (
        <button
          onClick={() => navigate(`/roadmaps/${roadmap}`)}
          className={styles.fixedBackButton}
        >
          <i className="fa-solid fa-arrow-left"></i> Back to Roadmap
        </button>
      )}
      <div className={styles.middle}>
        <div className={styles.topic}>{topicid}</div>

        {isLoading ? (
          <div className={styles.spinner}>
            Hold on, while we find the best content for you...
          </div>
        ) : (
          <div className={styles.content}>
            {topicContent && <RenderStructuredContent content={topicContent} />}
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
