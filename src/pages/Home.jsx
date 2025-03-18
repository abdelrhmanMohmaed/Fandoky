import React, { useContext } from "react";
import { PlaceContext } from "../components/context/PlaceContext";
import PlaceCard from "../components/screens/PlaceCard";

function Home() {
  const { Places, isLoading, error } = useContext(PlaceContext);

  // Loading Pending
  // if (isLoading == false) {
  if (isLoading) {
    return (
      <div className="container w-4/5 mx-auto pt-3 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="border rounded-md overflow-hidden shadow-md p-4 animate-pulse"
            >
              <div className="w-full h-48 bg-gray-200 rounded" />
              <div className="mt-4 h-4 bg-gray-200 rounded w-3/4" />
              <div className="mt-2 h-3 bg-gray-200 rounded w-1/2" />
              <div className="mt-2 h-3 bg-gray-200 rounded w-2/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="mt-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container w-4/5 mx-auto pt-3 flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Places.map((place) => (
          <PlaceCard  key={place.id} place={place} />
        ))}
      </div>
    </div>
  );
}

export default Home;
