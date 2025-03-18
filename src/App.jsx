import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Nabbar";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// import Home from './Home';
// import About from './About';
// import Contact from './Contact';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    window.onload = () => setIsLoading(false);
  }, []);

  const hideNavbarPaths = ["/forgot-password", "/reset-password"];

  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <div>
      {isLoading && <Loader />}

      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;