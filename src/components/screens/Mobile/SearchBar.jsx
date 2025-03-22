import React from "react";
import IconRenderer from "../../icon/IconRenderer";

function SearchBar({ onOpenModal }) {
  return (
    <div className="md:hidden container mx-auto px-4 py-4">
      <div
        className="cursor-pointer flex items-center justify-between bg-white shadow-md rounded-full p-3"
        onClick={onOpenModal}
      >
        <span className="text-gray-500 ml-2">Where to?</span>
          <IconRenderer iconName={"FaSearch"} className={"text-brandPrimary mr-2"} />
      </div>
    </div>
  );
}

export default SearchBar;
