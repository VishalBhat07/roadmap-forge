import "./App.css";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/hero";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Signin from "./pages/Signin/Signin";
import Community from "./pages/Community/Community.jsx";
import Roadmaps from "./pages/Roadmaps/Roadmaps.jsx";
import Roadmap from "./pages/Roadmap/Roadmap.jsx";
// import RoadmapGenerator from "./components/RoadmapGenerator/RoadmapGenerator.jsx";
import WorkInProgressPage from "./pages/WorkInProgressPage/WorkInProgressPage/WorkInProgressPage.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/roadmaps" element={<Roadmaps />} />
          <Route path="/roadmaps/:id" element={<Roadmap />} />
          <Route path="/community" element={<WorkInProgressPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
