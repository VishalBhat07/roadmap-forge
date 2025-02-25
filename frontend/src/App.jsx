import "./App.css";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/hero";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Signup from "./pages/Signin/Signup.jsx";
import Community from "./pages/Community/Community.jsx";
import Roadmaps from "./pages/Roadmaps/Roadmaps.jsx";
import Roadmap from "./pages/Roadmap/Roadmap.jsx";
// import RoadmapGenerator from "./components/RoadmapGenerator/RoadmapGenerator.jsx";
import WorkInProgressPage from "./pages/WorkInProgressPage/WorkInProgressPage/WorkInProgressPage.jsx";
import fetchUser from "./auth/login.js";
import Login from "./pages/Login/Login.jsx";
import AuthContext from "./context/authContext.js";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

function App() {
  const [loginState, setLoginState] = useState({
    user: null,
    isLoggedIn: false,
  });

  return (
    <>
      <AuthContext.Provider value={{ loginState, setLoginState }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/roadmaps" element={<Roadmaps />} />
            <Route path="/roadmaps/:id" element={<Roadmap />} />
            <Route path="/community" element={<WorkInProgressPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
          <ToastContainer autoClose={3000} />
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
