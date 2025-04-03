import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PlaceProvider } from "./components/context/PlaceProvider";

import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Nabbar";
import Loader from "./components/Loader";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import ContactUs from "./pages/ContactUs";
import ResetPassword from "./pages/ResetPassword";
import PlaceDetails from "./pages/PlaceDetails";
import PlaceSearch from "./pages/PlaceSearch";

// import Home from './Home';
// import About from './About';
// import Contact from './Contact';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [location.pathname]);

  // Hiden Navbar in pages below
  const hideNavbarPaths = ["/forgot-password", "/reset-password", "/contact"];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);
  // Hiden Footer in pages below
  const hideFooterPaths = ["/forgot-password", "/reset-password", "/contact"];
  const shouldHideFooter = hideFooterPaths.includes(location.pathname);

  return (
    <div>
      <PlaceProvider>
        {isLoading && <Loader />}
        {!shouldHideNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/place/:id" element={<PlaceDetails />} />
          <Route path="/place-filters" element={<PlaceSearch />} />
        </Routes>
        <ToastContainer autoClose={3000} />
        {!shouldHideFooter && <Footer />}
      </PlaceProvider>
    </div>
  );
}

export default App;
