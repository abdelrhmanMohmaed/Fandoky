import React, { useContext, useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { toast } from "react-toastify";
import { format } from "date-fns";

// APIS Services
import { logout } from "../services/auth";
import { places_filter } from "../services/places_filter";

// contexts
import { LocationContext } from "./context/LocationContext";
import { UserContext } from "./context/UserContext";
import { PlaceContext } from "./context/PlaceContext";

// icons
import IconRenderer from "./icon/IconRenderer";

// modals
import SignupModal from "./modals/SignupModal";
import LoginModal from "./modals/LoginModal";
import VerifiedModal from "./modals/VerifiedModal";

// media Query
import MobileSearchBar from "./screens/Mobile/SearchBar";
import SearchModal from "./screens/Mobile/SearchModal";
import SearchForm from "./screens/Desktop/SearchForm";
import FilterSlider from "./screens/FilterBar";

function Navbar() {
  // context Shared data
  const { userName, verified, isLoggedIn, updateUser, updateVerified } =
    useContext(UserContext);
  const { setSelectedFilter } = useContext(PlaceContext);
  const { userLocation } = useContext(LocationContext);

  // Models
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [verifiedModalOpen, setVerifiedModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isUrlEmpty = location.pathname === "/"; // useing in hidden filter bar
  const [isHoveredSubmitSearch, setIsHoveredSubmitSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpenSubMenu, setIsOpenSubMenu] = useState(false);
  const menuRef = useRef(null); 

  // Search filter
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("");
  const [guests, setGuests] = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);

  // Action with scroll window
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // sub-meuo in the top-left
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

  // Filter Actions filter handler, open calendar and take a range
  const handleCheckInClick = () => {
    setShowCalendar((prev) => !prev);
    // setShowCalendar(!showCalendar);
  };
  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };
  // Handle search submit
  const handleSearchSubmit = () => {
    const queryParams = new URLSearchParams();

    if (selectedCategoryFilter) {
      queryParams.append("filter", selectedCategoryFilter);
    }
    if (startDate) {
      queryParams.append("start_date", format(startDate, "yyyy-MM-dd"));
    }
    if (endDate) {
      queryParams.append("end_date", format(endDate, "yyyy-MM-dd"));
    }
    if (guests) {
      queryParams.append("guests", guests);
    }
    if (userLocation) {
      queryParams.append("lat", userLocation.lat);
      queryParams.append("lng", userLocation.lng);
    }

    places_filter(queryParams.toString())
      .then((response) => {
        navigate("/place-filters", { state: { results: response.data } });
      })
      .catch((error) => {
        console.error("Error fetching filtered places:", error);
      });
  };
  // logout function
  const handleLogout = async () => {
    setIsOpenSubMenu(false);
    try {
      await logout();

      updateUser(null);
      updateVerified(null); // update context (shared commponent)

      toast.success("Logout successful.", {
        position: "bottom-right",
        className:
          "bg-gradient-to-r from-brandPrimary to-brandSecondary text-white custom-toast-success",
      });
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.", {
        position: "bottom-right",
        className: "bg-gradient-to-r from-red-600 to-brandPrimary text-white",
      });
    }
  };

  return (
    <div className="sticky top-0 z-40 bg-brandBackground-default border-b-2 border-gray-200">
      {/* ====== Header (verified Alert) ====== */}
      {isLoggedIn && !verified && (
        <div
          className="p-4 mb-4 text-sm text-yellow-800 bg-brandPrimary dark:text-yellow-300"
          role="alert"
        >
          <span className="font-medium">Warning alert!</span> Your account is
          not verified.
          <button
            onClick={() => {
              setVerifiedModalOpen(true);
            }}
            className="underline ml-1"
          >
            Verify now
          </button>
        </div>
      )}

      {/* ====== Modals (Sign up & Login) ====== */}
      <SignupModal open={signupModalOpen} setOpen={setSignupModalOpen} />
      <LoginModal open={loginModalOpen} setOpen={setLoginModalOpen} />
      <VerifiedModal open={verifiedModalOpen} setOpen={setVerifiedModalOpen} />

      {/* ====== Header (Logo + Links + User Menu) ====== */}
      <div
        className={`container mx-auto flex flex-col ${
          isScrolled ? "pt-0" : "pt-2"
        } px-4 md:w-4/5`}
      >
        {/* {token} */}
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
              <IconRenderer iconName={"FaBars"} className={"h-4 w-4 mr-2"} />
              {isLoggedIn ? (
                `Hi, ${userName}`
              ) : (
                <IconRenderer iconName={"FaUser"} className={"h-4 w-4"} />
              )}
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
                      <IconRenderer
                        iconName={"FaUserCircle"}
                        className={"inline-block h-5 w-5 mr-2"}
                      />
                      View Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <IconRenderer
                        iconName={"HiOutlineLogout"}
                        className={"inline-block h-5 w-5 mr-2"}
                      />
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
                      <IconRenderer
                        iconName={"FaUserPlus"}
                        className={"inline-block h-5 w-5 mr-2"}
                      />
                      Sign up
                    </button>
                    <button
                      onClick={() => {
                        setLoginModalOpen(true);
                        setIsOpenSubMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <IconRenderer
                        iconName={"HiOutlineLogin"}
                        className={"inline-block h-5 w-5 mr-2"}
                      />
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
        setGuests={setGuests}
        setSelectedCategoryFilter={setSelectedCategoryFilter}
        isHoveredSubmitSearch={isHoveredSubmitSearch}
        setIsHoveredSubmitSearch={setIsHoveredSubmitSearch}
        handleSelect={handleSelect}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* ====== Filter ====== */}
      {isUrlEmpty && (
        <FilterSlider onSelect={(filter) => setSelectedFilter(filter)} />
      )}
    </div>
  );
}
export default Navbar;