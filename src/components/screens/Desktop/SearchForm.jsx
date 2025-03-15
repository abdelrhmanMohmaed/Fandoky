import React from "react";
import { FaSearch } from "react-icons/fa";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function SearchForm({
  isScrolled,
  startDate,
  endDate,
  showCalendar,
  handleCheckInClick,
  setShowCalendar,
  isHoveredSubmitSearch,
  setIsHoveredSubmitSearch,
  handleSelect,
}) {
  const selectionRange = { startDate, endDate, key: "selection" };

  const handleCalendarClick = (e) => {
    e.stopPropagation();
  };

  const handleDone = (e) => {
    e.stopPropagation();
    setShowCalendar(false);
  };

  return (
    <div
      className={`container mx-auto px-4 ${
        isScrolled ? "py-2" : "py-4"
      } hidden md:block md:w-3/5`}
    >
      <div
        className={`w-full bg-white rounded-full shadow-lg flex items-center ${
          showCalendar ? "overflow-visible" : "overflow-hidden"
        }`}
      >
        {/* Where */}
        <div className="flex items-center px-3 py-2 hover:bg-gray-50 transition-colors cursor-pointer flex-grow relative border-r border-gray-200">
          <label className="text-sm font-semibold py-2 mr-1">Where</label>
          <input
            type="text"
            placeholder="Search destinations"
            className="focus:outline-none bg-transparent placeholder-gray-500 w-full"
          />
        </div>

        {/* Check In + Check Out */}
        <div
          className="relative place-content-evenly flex items-center px-4 py-2 hover:bg-gray-50 transition-colors cursor-pointer flex-grow border-r border-gray-200"
          onClick={handleCheckInClick}
        >
          <div>
            <p className="text-sm font-semibold">Check in</p>
            <p className="text-sm text-gray-500">
              {startDate ? format(startDate, "MMM d") : "Add dates"}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold">Check out</p>
            <p className="text-sm text-gray-500">
              {endDate ? format(endDate, "MMM d") : "Add dates"}
            </p>
          </div>

          {showCalendar && (
            <div
              className="absolute top-full left-0 mt-2 bg-white rounded-md shadow-lg p-4 z-30"
              onClick={handleCalendarClick}
            >
              <DateRange
                editableDateInputs={true}
                onChange={handleSelect}
                moveRangeOnFirstSelection={false}
                ranges={[selectionRange]}
                months={2}
                direction="horizontal"
                rangeColors={["#3b82f6"]}
                className="w-full"
                renderCustomHeader={({
                  date,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div className="flex items-center justify-between px-2 py-2">
                    <button
                      onClick={decreaseMonth}
                      disabled={prevMonthButtonDisabled}
                      className="px-2 py-1 text-sm text-gray-600 hover:text-black"
                    >
                      {"<"}
                    </button>
                    <span className="text-base font-semibold">
                      {format(date, "MMMM yyyy")}
                    </span>
                    <button
                      onClick={increaseMonth}
                      disabled={nextMonthButtonDisabled}
                      className="px-2 py-1 text-sm text-gray-600 hover:text-black"
                    >
                      {">"}
                    </button>
                  </div>
                )}
                dayClassName={() =>
                  "w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
                }
              />
              <button
                onClick={handleDone}
                className="mt-2 bg-brandPrimary text-white px-3 py-1 rounded-md"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Who + Search Button */}
        <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 transition-colors cursor-pointer flex-grow border-r border-gray-200">
          <div>
            <p className="text-sm font-semibold">Who</p>
            <p className="text-sm text-gray-500">Add guests</p>
          </div>
          <button
            type="submit"
            className={`bg-gradient-to-r from-brandPrimary to-brandSecondary text-white rounded-full p-3 ml-2 flex items-center transition-all duration-300 ${
              isHoveredSubmitSearch ? "w-32" : "w-12"
            }`}
            onMouseEnter={() => setIsHoveredSubmitSearch(true)}
            onMouseLeave={() => setIsHoveredSubmitSearch(false)}
          >
            <FaSearch className="h-4 w-4 mr-2" />
            {isHoveredSubmitSearch && <strong>Search</strong>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
