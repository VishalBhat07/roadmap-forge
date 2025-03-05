import "./App.css";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/hero";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Signup from "./pages/Signin/Signup.jsx";
import Roadmaps from "./pages/Roadmaps/Roadmaps.jsx";
import Roadmap from "./pages/Roadmap/Roadmap.jsx";
import WorkInProgressPage from "./pages/WorkInProgressPage/WorkInProgressPage/WorkInProgressPage.jsx";
import Login from "./pages/Login/Login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import AuthContext from "./context/authContext.js";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Topic from "./pages/Topic/Topic.jsx";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword.jsx";

function AppContent() {
  const paths = ["/login", "/signup", "/forgotpassword"];
  const location = useLocation();
  const hide = paths.includes(location.pathname);

  return (
    <>
      {!hide && <Navbar />}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/roadmaps" element={<Roadmaps />} />
        <Route path="/roadmaps/:id" element={<Roadmap />} />
        <Route path="/roadmaps/:roadmap/:topicid" element={<Topic />} />
        <Route path="/community" element={<WorkInProgressPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!hide && <Footer />}
      <ToastContainer autoClose={2000} />
    </>
  );
}

function App() {
  const [loginState, setLoginState] = useState({
    user: null,
    isLoggedIn: false,
  });

  return (
    <>
      <AuthContext.Provider value={{ loginState, setLoginState }}>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
