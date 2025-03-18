import { useState, useEffect } from "react";
import { PlaceContext } from "./PlaceContext";
import { places } from "../../services/landing-page";

export const PlaceProvider = ({ children }) => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [Places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPlacesData = async () => {
    try {
      setIsLoading(true);
      setError("");

      const queryParams = new URLSearchParams();
      if (selectedFilter) queryParams.set("filter", selectedFilter);
      queryParams.set("page", currentPage);

      const response = await places(queryParams.toString());
      setPlaces(response.data.data || response.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching places:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlacesData();
  }, [selectedFilter, currentPage]);

  return (
    <PlaceContext.Provider
      value={{
        selectedFilter,
        setSelectedFilter,
        currentPage,
        setCurrentPage,
        Places,
        isLoading,
        error,
      }}
    >
      {children}
    </PlaceContext.Provider>
  );
};
