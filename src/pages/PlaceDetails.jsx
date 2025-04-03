import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPlaceById } from "../services/landing-page";
import BookingModal from "../components/screens/BookingModal";
import MapComponent from "../components/map/MapComponent";
import { StarIcon } from "@heroicons/react/20/solid";

const product = {
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PlaceDetails() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await getPlaceById(id);
        setPlace(response.data);
        // console.log(response);
      } catch (err) {
        console.error("Error fetching place details:", err);
      } finally {
        console.error("Error fetching place details:");
      }
    };
    fetchPlace();
  }, [id]);

  if (!place) return <p>Place not found.</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li>
              <div className="flex items-center">
                <a href="/" className="mr-2 text-sm font-medium text-gray-900">
                  Home
                </a>
              </div>
            </li>
            <svg
              fill="currentColor"
              width={16}
              height={20}
              viewBox="0 0 16 20"
              aria-hidden="true"
              className="h-5 w-4 text-gray-300"
            >
              <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
            </svg>
            <li>
              <div className="flex items-center">
                <a className="mr-2 text-sm font-medium text-gray-400">
                  {place.name}
                </a>
              </div>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <img
            alt={place.images[0].alt}
            src={place.images[0].name}
            className="hidden size-full rounded-lg object-cover lg:block"
          />
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <img
              alt={place.images[1].alt}
              src={place.images[1].name}
              className="aspect-[3/2] w-full rounded-lg object-cover"
            />
            <img
              alt={place.images[2].alt}
              src={place.images[2].name}
              className="aspect-[3/2] w-full rounded-lg object-cover"
            />
          </div>
          <img
            alt={place.images[3].alt}
            src={place.images[3].name}
            className="aspect-[4/5] size-full object-cover sm:rounded-lg lg:aspect-auto"
          />
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {place.name}
            </h1>
          </div>

          {/* Booking Form and rating and price*/}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2>Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              {place.price} ج/م night
            </p>

            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        place.rating > rating
                          ? "text-gray-900"
                          : "text-gray-200",
                        "size-5 shrink-0"
                      )}
                    />
                  ))}
                </div>
                <p className="sr-only">{place.rating} out of 5 stars</p>
                <a
                  href="/"
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {place.rating} reviews
                </a>
              </div>
            </div>

            {/* Booking Form */}
            <BookingModal place={place} />
          </div>

          {/* Description and details */}
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{place.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.details}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <hr />
      {/* Map Location */}
      <div className="mx-auto px-6 py-6">
        <h2 className="text-gray-900 my-3">Where you’ll be</h2>
        <div className="h-64 md:h-64">
          <div className="h-64 md:h-80">
            <MapComponent places={place} />
          </div>
        </div>
      </div>
    </div>
  );
}
