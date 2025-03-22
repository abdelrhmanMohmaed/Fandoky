import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import IconRenderer from "../../icon/IconRenderer";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function SearchModal({
  isOpen,
  onClose,
  isHoveredSubmitSearch,
  setIsHoveredSubmitSearch,
  startDate,
  endDate,
  handleSelect,
}) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    search: "",
    category: "",
  });

  const [showCalendar, setShowCalendar] = useState(false);

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleClearForm = () => {
    setFormData({ search: "", category: "" });
    handleSelect({ selection: { startDate: null, endDate: null } });
    setShowCalendar(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* ====== Modals (Sign up & Login) ====== */}
      <div className="sticky top-0 flex items-center justify-between p-4 border-b border-gray-200">
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900 text-2xl font-bold"
        >
          <IconRenderer iconName={"FaTimes"} className={"h-4 w-4 mr-2"} />
        </button>
        <h2 className="text-lg font-semibold">Search</h2>
        <div className="w-8" />
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {/* Where */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Where
          </label>
          <input
            type="text"
            placeholder="Search destinations"
            value={formData.search}
            onChange={(e) =>
              setFormData({ ...formData, search: e.target.value })
            }
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brandPrimary"
          />
        </div>

        {/* Date Range Picker */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Select Dates
          </label>
          <div
            className="border border-gray-300 rounded-md px-3 py-2 cursor-pointer"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            {startDate && endDate ? (
              <span>
                {format(startDate, "MMM d")} - {format(endDate, "MMM d")}
              </span>
            ) : (
              "Add dates"
            )}
          </div>

          {showCalendar && (
            <div className="mt-2 shadow-lg rounded-md overflow-hidden">
              <DateRange
                editableDateInputs={true}
                onChange={handleSelect}
                moveRangeOnFirstSelection={false}
                ranges={[selectionRange]}
                months={2}
                direction="horizontal"
                rangeColors={["#3b82f6"]}
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* Who */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Who
          </label>
          <div className="border border-gray-300 rounded-md px-3 py-2">
            Add guests
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 flex items-center justify-between space-x-4">
        <button
          type="button"
          className="p-3 flex items-center underline underline-offset-1"
          onClick={handleClearForm}
        >
          <p className="md:inline">Clear All</p>
        </button>

        <button
          type="submit"
          className={`bg-gradient-to-r text-white rounded-full p-3 flex items-center transition-all duration-300 w-32 ${
            isHoveredSubmitSearch
              ? "from-brandSecondary to-brandPrimary"
              : "from-brandPrimary to-brandSecondary"
          }`}
          onMouseEnter={() => setIsHoveredSubmitSearch(true)}
          onMouseLeave={() => setIsHoveredSubmitSearch(false)}
        >
          <IconRenderer iconName={"FaSearch"} className={"h-4 w-4 mr-2"} />
          <strong>Search</strong>
        </button>
      </div>
    </div>
  );
}

export default SearchModal;
