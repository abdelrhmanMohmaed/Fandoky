import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaUserCircle, FaBars, FaUser, FaUserPlus } from "react-icons/fa";
import { HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";
import Logo from "../assets/logo.png";
import { logout } from "../services/auth";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

// Modals
import SignupModal from "./modals/SignupModal";
import LoginModal from "./modals/LoginModal";

// Media Query
import MobileSearchBar from "./screens/Mobile/SearchBar";
import SearchModal from "./screens/Mobile/SearchModal";
import SearchForm from "./screens/Desktop/SearchForm";

function Navbar() {
  // condition to open models
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Share search models
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  // Location condation
  const location = useLocation();
  // Hover condition
  const [isHoveredSubmitSearch, setIsHoveredSubmitSearch] = useState(false);

  // condition to switch navbar style and Scroll
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Share Date between models and condition to open Calendar and handleSelect date renge
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const handleCheckInClick = () => {
    setShowCalendar(!showCalendar);
  };
  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  // Close sub-menu once click out of box
  const [isOpenSubMenu, setIsOpenSubMenu] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpenSubMenu(false);
      }
    };
    if (isOpenSubMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenSubMenu]);

  const handleLogout = async () => {
    const token = sessionStorage.getItem("token");
    setIsOpenSubMenu(false);
    const success = await logout(token);
    if (success) {
      setIsLoggedIn(false);
      toast.success("Logout successful.", {
        position: "bottom-right",
        className: "bg-brandPrimary text-white",
      });
    } else {
      toast.error("Logout failed. Please try again.", {
        position: "bottom-right",
        className: "bg-red-500 text-white",
      });
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-brandBackground-default border-b-2 border-gray-200">
      {/* ====== Modals (Sign up & Login) ====== */}
      <SignupModal open={signupModalOpen} setOpen={setSignupModalOpen} />
      <LoginModal
        open={loginModalOpen}
        setOpen={setLoginModalOpen}
        setIsLoggedIn={setIsLoggedIn}
      />

      {/* ====== Header (Logo + Links + User Menu) ====== */}
      <div
        className={`container mx-auto flex flex-col ${
          isScrolled ? "pt-0" : "pt-2"
        } px-4 md:w-4/5`}
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/">
            <img src={Logo} alt="Queفند Logo" className="h-16" />
          </NavLink>
          {/* Links */}
          <div className="flex justify-center items-center">
            <NavLink
              to="/"
              className={
                location.pathname === "/"
                  ? "text-black font-bold mx-2"
                  : "text-brandPrimary mx-2 font-bold hover:text-black"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/experiences"
              className={({ isActive }) =>
                isActive
                  ? "text-black font-bold mx-2"
                  : "text-brandPrimary mx-2 font-bold hover:text-black"
              }
            >
              Experiences
            </NavLink>
          </div>
          {/* User Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsOpenSubMenu((prev) => !prev)}
              className={`bg-gradient-to-r ${
                isOpenSubMenu
                  ? "from-brandPrimary to-brandSecondary"
                  : "from-brandSecondary to-brandPrimary"
              } text-white p-3 ml-2 flex items-center shadow-lg rounded-full transition-colors duration-300 ease-in-out hover:from-brandPrimary hover:to-brandSecondary focus:outline-none focus:ring focus:ring-brandSecondary border border-gray-200`}
            >
              <FaBars className="h-4 w-4 mr-2" />
              <FaUser className="h-4 w-4" />
            </button>
            {isOpenSubMenu && (
              <div className="absolute right-4 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20">
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={() => {
                        setIsOpenSubMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <FaUserCircle className="inline-block h-5 w-5 mr-2" />
                      View Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <HiOutlineLogout className="inline-block h-5 w-5 mr-2" />
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setSignupModalOpen(true);
                        setIsOpenSubMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <FaUserPlus className="inline-block h-5 w-5 mr-2" />
                      Sign up
                    </button>
                    <button
                      onClick={() => {
                        setLoginModalOpen(true);
                        setIsOpenSubMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <HiOutlineLogin className="inline-block h-5 w-5 mr-2" />
                      Log in
                    </button>
                  </>
                )}
                <hr className="border-t border-gray-200" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ====== Search Bar in small screen ====== */}
      <MobileSearchBar onOpenModal={() => setIsSearchModalOpen(true)} />

      {/* ====== Search Modal in small screen ====== */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        isHoveredSubmitSearch={isHoveredSubmitSearch}
        setIsHoveredSubmitSearch={setIsHoveredSubmitSearch}
        startDate={startDate}
        endDate={endDate}
        showCalendar={showCalendar}
        setShowCalendar={setShowCalendar}
        handleCheckInClick={handleCheckInClick}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        handleSelect={handleSelect}
      />

      {/* ====== Search Form Mid and Big Screen ====== */}
      <SearchForm
        isScrolled={isScrolled}
        startDate={startDate}
        endDate={endDate}
        showCalendar={showCalendar}
        handleCheckInClick={handleCheckInClick}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setShowCalendar={setShowCalendar}
        isHoveredSubmitSearch={isHoveredSubmitSearch}
        setIsHoveredSubmitSearch={setIsHoveredSubmitSearch}
        handleSelect={handleSelect}
      />
    </div>
  );
}

export default Navbar;
