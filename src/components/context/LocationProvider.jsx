import React, { useState, useEffect } from "react";
import { LocationContext } from "./LocationContext";

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          setLocationError(err.message);
          console.error("Error getting user location:", err);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <LocationContext.Provider value={{ userLocation, locationError }}>
      {children}
    </LocationContext.Provider>
  );
};
