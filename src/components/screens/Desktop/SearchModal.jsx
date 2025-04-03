import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { CiLocationArrow1 } from "react-icons/ci";
import {
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { PhoneIcon, PlayCircleIcon } from "@heroicons/react/20/solid";

const solutions = [
  {
    name: "Nearby",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: CiLocationArrow1,
  },
  {
    name: "Amazing views",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Luxury Stay",
    description: "Your customers' data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Budget Friendly",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Seaside Escape",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];

export default function SearchModal({ setSelectedCategoryFilter }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSolutions = solutions.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Popover className="relative w-2/5 rounded-full">
      <>
        <PopoverButton
          className={`
              rounded-full w-full inline-flex flex-col items-start px-3 py-2
              hover:bg-gray-50 transition-colors cursor-pointer flex-grow relative
              border-r border-gray-200
              focus:outline-none focus:ring-0 active:outline-none active:ring-0
            `}
        >
          <span className="text-xs font-semibold text-gray-700 mb-1">
            Where
          </span>
          <div className="w-full flex items-center">
            <span className="text-sm text-gray-500">
              {searchTerm || "Search destinations"}
            </span>
          </div>
        </PopoverButton>

        <PopoverPanel
          transition
          className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              <div className="mb-4 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search destinations"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent placeholder-gray-500 text-sm focus:outline-none"
                />
                {searchTerm && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategoryFilter("");
                    }}
                    className="text-gray-500"
                  >
                    X
                  </button>
                )}
              </div>
              {filteredSolutions.length > 0 ? (
                filteredSolutions.map((item) => (
                  <div
                    key={item.name}
                    className="group flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setSearchTerm(item.name);
                      setSelectedCategoryFilter(item.name);
                    }}
                  >
                    <item.icon
                      className="w-5 h-5 text-gray-600"
                      aria-hidden="true"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.description}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-gray-500">
                  No results found
                </div>
              )}
            </div>

            {/* Youtube and contact us Links */}
            <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
              <a
                href="https://www.youtube.com/watch?v=pqY0VowLdmk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold text-gray-900 hover:bg-gray-100"
              >
                <PlayCircleIcon
                  aria-hidden="true"
                  className="w-5 h-5 flex-none text-gray-400"
                />
                Watch Our Tour
              </a>

              <NavLink
                to="/contact"
                className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold text-gray-900 hover:bg-gray-100"
              >
                <PhoneIcon
                  aria-hidden="true"
                  className="w-5 h-5 flex-none text-gray-400"
                />
                Contact us
              </NavLink>
            </div>
          </div>
        </PopoverPanel>
      </>
    </Popover>
  );
}
