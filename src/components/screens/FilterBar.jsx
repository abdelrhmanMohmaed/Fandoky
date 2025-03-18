import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaFilter } from "react-icons/fa";

const filters = [
  { id: 1, label: "All", icon: "🔄" },
  { id: 2, label: "Amazing views", icon: "🏞️" },
  { id: 3, label: "Luxury Stay", icon: "😱" },
  { id: 4, label: "Budget Friendly", icon: "🏖️" },
  { id: 5, label: "Seaside Escape", icon: "🔥" },
  { id: 6, label: "Tiny homes", icon: "🏠" },
  { id: 7, label: "Windmills", icon: "💨" },
  { id: 8, label: "Luxe", icon: "💎" },
  { id: 9, label: "Lakefront", icon: "🚣" },
  { id: 10, label: "Play", icon: "🎮" },
  { id: 11, label: "All", icon: "🔄" },
  { id: 12, label: "Amazing views", icon: "🏞️" },
  { id: 13, label: "Luxury Stay", icon: "😱" },
  { id: 14, label: "Budget Friendly", icon: "🏖️" },
  { id: 15, label: "Seaside Escape", icon: "🔥" },
  { id: 16, label: "Tiny homes", icon: "🏠" },
  { id: 17, label: "Windmills", icon: "💨" },
  { id: 18, label: "Luxe", icon: "💎" },
  { id: 19, label: "Lakefront", icon: "🚣" },
  { id: 20, label: "Play", icon: "🎮" },
];

export default function FilterSlider({ onSelect, onOpenAdvancedFilter }) {
  const containerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("All");
  // Scoll Icons
  const [hideRight, setHideRight] = useState(false);
  const [hideLeft, setHideLeft] = useState(true);
  const scrollLeft = () => {
    containerRef.current?.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };
  const scrollRight = () => {
    containerRef.current?.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };
  const handleScroll = (e) => {
    const el = e.target;
    setHideLeft(el.scrollLeft <= 0);
    setHideRight(el.scrollLeft + el.clientWidth >= el.scrollWidth);
  };

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    element.addEventListener("scroll", handleScroll);

    handleScroll({ target: element });

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleFilterSelect = (label) => {
    setActiveFilter(label);
    onSelect?.(label == "All" ? "" : label);
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 relative flex items-center px-4">
      {!hideLeft && (
        <button
          onClick={scrollLeft}
          className="p-2 text-gray-500 hover:text-brandPrimary focus:outline-none"
        >
          <FaChevronLeft size={20} />
        </button>
      )}

      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth hide-scrollbar py-2 mx-2"
      >
        {filters.map((item) => {
          const isActive = item.label === activeFilter;
          return (
            <button
              key={item.id}
              onClick={() => handleFilterSelect(item.label)}
              className={`min-w-[80px] flex flex-col items-center cursor-pointer transition-colors
                ${
                  isActive
                    ? "text-brandPrimary font-semibold"
                    : "text-gray-500 hover:text-brandPrimary"
                }
              `}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs mt-1 whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {!hideRight && (
        <button
          onClick={scrollRight}
          className="p-2 text-gray-500 hover:text-brandPrimary focus:outline-none"
        >
          <FaChevronRight size={20} />
        </button>
      )}

      <button
        onClick={onOpenAdvancedFilter}
        className="ml-2 flex items-center gap-1 bg-gradient-to-r from-brandPrimary to-brandSecondary text-white transition-all duration-300  transition-colors px-3 py-2 rounded hover:from-brandSecondary hover:to-brandPrimary"
      >
        <FaFilter />
        <span>Filter</span>
      </button>
    </div>
  );
}
