import { useState, useEffect } from "react";
import { PlaceContext } from "./PlaceContext";
import { places } from "../../services/landing-page";

export const PlaceProvider = ({ children }) => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [Places, setPlaces] = useState([]);
  const [pagination, setPagination] = useState(null);
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
      const fetchedPlaces = response.data.data || response.data;

      if (currentPage > 1) {
        setPlaces((prevPlaces) => [...prevPlaces, ...fetchedPlaces]);
      } else {
        setPlaces(fetchedPlaces);
      }

      setPagination(response.data.pagination);
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
  
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 400 &&
        !isLoading &&
        pagination &&
        currentPage < pagination.last_page
      ) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, pagination, currentPage]);
  return (
    <PlaceContext.Provider
      value={{
        selectedFilter,
        setSelectedFilter,
        currentPage,
        setCurrentPage,
        Places,
        pagination,
        isLoading,
        error,
      }}
    >
      {children}
    </PlaceContext.Provider>
  );
};
