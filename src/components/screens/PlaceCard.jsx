import React from "react";
import { GoStarFill } from "react-icons/go";
import { FaHeart } from "react-icons/fa";

export default function PlaceCard({ place }) {
  return (
    <div
      key={place.id}
      className="relative border rounded-md overflow-hidden shadow-md"
    >
      <div className="relative">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-48 object-cover"
        />
        {place.badge && (
          <div className="absolute top-2 left-2 bg-white text-black text-xs px-2 py-1 rounded-full shadow">
            {place.badge}
          </div>
        )}
        <button className="absolute top-2 right-2">
          <FaHeart className="text-white hover:text-red-500" size={18} />
        </button>
      </div>

      <div className="p-4 text-sm">
        <div className="flex items-center justify-between text-gray-500 mb-1">
          <span>{place.distance}</span>
          <span>{place.dates}</span>
          <span>{place.category}</span>
        </div>

        <h3 className="font-semibold text-base text-gray-800">{place.name}</h3>

        <div className="flex items-center gap-1 mt-1 text-gray-600">
          <GoStarFill className="text-yellow-400" />
          <span>{place.rating}</span>
        </div>

        <p className="text-gray-800 mt-1">{place.price} total before taxes</p>
      </div>
    </div>
  );
}
