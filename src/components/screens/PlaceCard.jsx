import React, { useState } from "react";
import IconRenderer from "../icon/IconRenderer";
import { useNavigate } from "react-router-dom";

export default function PlaceCard({ place }) {
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev == 0 ? place.images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev == place.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full p-5 md:p-0">
      <div className="relative border rounded-[12px] overflow-hidden">
        <div className="relative w-full group">
          <div className="relative overflow-hidden">
            <div className="h-56 sm:h-64 md:h-72 lg:h-80 cursor-pointer">
              {place.images.map((imageObj, index) => (
                <div onClick={() => navigate(`/place/${place.id}`)} key={index}>
                  <img
                    key={index}
                    src={imageObj.name}
                    alt={`image ${index + 1}`}
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                      index == currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="hidden group-hover:block absolute top-1/2 transform -translate-y-1/2 left-4 bg-white/60 hover:bg-white/90 rounded-full p-1 focus:outline-none"
          >
            <IconRenderer
              iconName={"GrFormPrevious"}
              size={22}
              className={"text-black font-bold"}
            />
            <span className="sr-only">Previous</span>
          </button>

          <button
            onClick={nextSlide}
            className="hidden group-hover:block absolute top-1/2 transform -translate-y-1/2 right-4 bg-white/60 hover:bg-white/90 rounded-full p-1 focus:outline-none"
          >
            <IconRenderer
              iconName={"GrFormNext"}
              size={22}
              className={"text-black font-bold"}
            />
            <span className="sr-only">Next</span>
          </button>

          <button className="absolute top-2 right-2">
            <IconRenderer
              iconName={"FaHeart"}
              size={18}
              className={"text-white hover:text-red-500"}
            />
          </button>

          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
            {place.images.map((_, index) => (
              <span
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? "bg-brandPrimary" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </div>

      <div className="py-2 text-sm">
        <div className="flex justify-between items-center gap-2 mt-1">
          <h3 className="font-semibold text-base text-brandPrimary">
            {place.name}
          </h3>
          <div className="flex items-center gap-1  ">
            <IconRenderer
              iconName={"GoStarFill"}
              size={18}
              className={"text-brandPrimary"}
            />
            <span className="text-brandPrimary">
              {parseFloat(place.rating).toFixed(2)}
            </span>
          </div>
        </div>
        <span className="text-brandSecondary">{place.category}</span>
        <p className="text-brandPrimary mt-1">
          {parseFloat(place.price).toFixed(2)} ج/م night
        </p>
      </div>
    </div>
  );
}
