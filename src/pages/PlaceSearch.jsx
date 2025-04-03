import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { places_filter } from "../services/places_filter";
import PlaceCard from "../components/screens/PlaceCard";
import MapComponent from "../components/map/MapComponent";
import Pagination from "../components/paginations/Pagination";

const PlaceSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { results, filters } = location.state || {};

  const handlePageChange = (page) => {
    const queryParams = new URLSearchParams();

    if (filters?.selectedCategoryFilter) {
      queryParams.append("filter", filters.selectedCategoryFilter);
    }
    if (filters?.startDate) {
      queryParams.append(
        "start_date",
        format(new Date(filters.startDate), "yyyy-MM-dd")
      );
    }
    if (filters?.endDate) {
      queryParams.append(
        "end_date",
        format(new Date(filters.endDate), "yyyy-MM-dd")
      );
    }
    if (filters?.guests) {
      queryParams.append("guests", filters.guests);
    }
    if (filters?.userLocation) {
      queryParams.append("lat", filters.userLocation.lat);
      queryParams.append("lng", filters.userLocation.lng);
    }

    queryParams.append("page", page);

    places_filter(queryParams.toString())
      .then((response) => {
        navigate("/place-filters", { state: { results: response.data } });
      })
      .catch((error) => {
        console.error("Error fetching filtered places:", error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results && results.data.length > 0 ? (
              results.data.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))
            ) : (
              <p>No results found.</p>
            )}
          </div>

          {results && results.pagination && (
            <Pagination
              pagination={results.pagination}
              onPageChange={handlePageChange}
            />
          )}
        </div>
        <div className="md:col-span-4">
          <div className="h-64 md:h-screen sticky top-0">
            <MapComponent places={results.data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceSearch;