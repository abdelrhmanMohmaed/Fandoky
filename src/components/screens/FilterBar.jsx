import React, { useRef, useState, useEffect } from "react";
import IconRenderer from "../icon/IconRenderer";

const filters = [
  { id: 1, label: "All", icon: "ArrowPathIcon" },
  { id: 2, label: "Amazing views", icon: "ChartPieIcon" },
  { id: 3, label: "Luxury Stay", icon: "CursorArrowRaysIcon" },
  { id: 4, label: "Budget Friendly", icon: "FingerPrintIcon" },
  { id: 5, label: "Seaside Escape", icon: "SquaresPlusIcon" },
  { id: 6, label: "Tiny homes", icon: "SquaresPlusIcon" },
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
    <div className="w-full bg-white border-b border-gray-200 relative flex items-center px-4 justify-center">
      {!hideLeft && (
        <button
          onClick={scrollLeft}
          className="p-2 text-gray-500 hover:text-brandPrimary focus:outline-none"
        >
          <IconRenderer iconName={"FaChevronLeft"} />
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
              <IconRenderer
                iconName={item.icon}
                className={"w-5 h-5 text-gray-600"}
              />
              {/* <span className="text-2xl">{item.icon}</span> */}
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
          <IconRenderer iconName={"FaChevronRight"} size={20} />
        </button>
      )}

      <button
        onClick={onOpenAdvancedFilter}
        className="ml-2 flex items-center gap-1 bg-gradient-to-r from-brandPrimary to-brandSecondary text-white transition-all duration-300  transition-colors px-3 py-2 rounded hover:from-brandSecondary hover:to-brandPrimary"
      >
        <IconRenderer iconName={"FaFilter"} />
        <span>Filter</span>
      </button>
    </div>
  );
}
