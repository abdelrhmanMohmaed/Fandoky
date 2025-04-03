import React from "react";
import IconRenderer from "../../icon/IconRenderer";
import { DateRange } from "react-date-range";
import { format } from "date-fns";

import SearchDesktopModal from "./SearchModal";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function SearchForm({
  isScrolled,
  startDate,
  endDate,
  showCalendar,
  handleCheckInClick,
  setShowCalendar,
  setSelectedCategoryFilter,
  isHoveredSubmitSearch,
  setIsHoveredSubmitSearch,
  handleSelect,
  onSearchSubmit,
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
        className={`w-full bg-white rounded-full shadow-lg flex items-center`}
        // ${ showCalendar ? "overflow-visible" : "overflow-hidden" }
      >
        {/* Where Input */}
        <SearchDesktopModal setSelectedCategoryFilter={setSelectedCategoryFilter} />

        {/* Check In + Check Out */}
        <div
          className="relative place-content-evenly flex items-center px-4 py-2 border-r rounded-full border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer flex-grow"
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
              onClick={handleCalendarClick}
              className="absolute top-full left-8 mt-5 bg-white z-30 p-4 rounded rounded-3xl shadow-lg ring-1 ring-gray-900/5"
            >
              {/* //  max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm/6 shadow-lg ring-1 ring-gray-900/5 */}
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
              <div className="flex justify-center">
                <button
                  onClick={handleDone}
                  className="w-4/5 px-3 py-1 mt-2 bg-gradient-to-r from-brandPrimary to-brandSecondary text-white transition-all duration-300 rounded-full hover:from-brandSecondary hover:to-brandPrimary"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Who + Search Button */}
        <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 transition-colors cursor-pointer flex-grow rounded-full border-gray-200">
          <div>
            <p className="text-sm font-semibold">Who</p>
            <p className="text-sm text-gray-500">Add guests</p>
          </div>
          <button
            type="submit"
            className={`bg-gradient-to-r from-brandPrimary to-brandSecondary text-white transition-all duration-300 rounded-full p-3 ml-2 flex items-center transition-all duration-300 ${
              isHoveredSubmitSearch ? "w-32" : "w-12"
            }`}
            onMouseEnter={() => setIsHoveredSubmitSearch(true)}
            onMouseLeave={() => setIsHoveredSubmitSearch(false)}
            onClick={onSearchSubmit}
          >
            <IconRenderer iconName={"FaSearch"} className={"h-4 w-4 mr-2"} />
            {isHoveredSubmitSearch && <strong>Search</strong>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
