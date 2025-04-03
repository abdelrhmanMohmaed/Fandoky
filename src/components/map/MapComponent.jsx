import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import { LocationContext } from "../context/LocationContext";
import ReactDOMServer from "react-dom/server";
import { GrLocationPin } from "react-icons/gr";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

// defaultCenter cairo
const defaultCenter = {
  lat: 30.0444,
  lng: 31.2357,
};

const MapComponent = ({ places }) => {
  const { userLocation } = useContext(LocationContext);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  // center map position use user location or defualt location cairo
  const center = userLocation
    ? { lat: parseFloat(userLocation.lat), lng: parseFloat(userLocation.lng) }
    : defaultCenter;

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  // transform single place to array to be able to use this componecnt by array or single place
  const placesArray = Array.isArray(places) ? places : places ? [places] : [];

  // custom user location icon
  const customUserIcon = {
    url:
      "data:image/svg+xml;charset=UTF-8," +
      encodeURIComponent(
        ReactDOMServer.renderToString(<GrLocationPin color="Green" size={40} />)
      ),
    scaledSize: new window.google.maps.Size(80, 40),
  };

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={9.8} center={center}>
      {userLocation && (
        <Marker
          position={{
            lat: parseFloat(userLocation.lat),
            lng: parseFloat(userLocation.lng),
          }}
          icon={customUserIcon}
        />
      )}

      {placesArray.map((place) => (
        <Marker
          key={place.id}
          position={{
            lat: parseFloat(place.latitude),
            lng: parseFloat(place.longitude),
          }}
          onClick={() => setSelectedPlace(place)}
        />
      ))}

      {selectedPlace && (
        <InfoWindow
          position={{
            lat: parseFloat(selectedPlace.latitude),
            lng: parseFloat(selectedPlace.longitude),
          }}
          onCloseClick={() => setSelectedPlace(null)}
        >
          <div>
            <h2 className="text-xl font-bold">{selectedPlace.name}</h2>
            <p className="text-gray-700 mb-2">{selectedPlace.description}</p>
            <p className="text-green-600 font-semibold">
              {selectedPlace.price} ج.م/night
            </p>
            <NavLink
              to={`/place/${selectedPlace.id}`}
              className="text-blue-500 hover:underline"
            >
              View
            </NavLink>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default MapComponent;
