import roadmaps from "../pages/Roadmaps/roadmaps";

const getRoadmapInfo = (roadmapTitle) => {
  for (const roadmap of roadmaps)
    if (roadmap.title === roadmapTitle) return roadmap;
};

export default getRoadmapInfo;
