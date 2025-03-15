import React from "react";
import imageURL from "../assets/logo.png";

function Home() {
  const places = [
        {
        id: 1,
        name: "Pori Beach, Greece",
        image:
            "https://www.greeka.com/village_beach/photos/1168/pori-top-1-2560.webp",
        description: "Kamari Beach, Apr 1-6",
        rating: 4.89,
        price: "6,202 EGP night",
        },
        {
        id: 2,
        name: "Kaş, Turkey",
        image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Kas_overview.JPG/405px-Kas_overview.JPG",
        description: "Kalkan Public Beach, Mar 17-22",
        rating: 5.0,
        price: "9,948 EGP night",
        },
        {
        id: 3,
        name: "Rhodes, Greece",
        image:
            "https://cdn.britannica.com/65/114965-050-3C4F95F4/citadel-acropolis-Lindos-Greeks-Romans-Byzantines-Ottomans.jpg?w=300",
        description: "Strand, 19",
        rating: 4.81,
        price: "3,764 EGP night",
        },
        {
        id: 4,
        name: "Batroun, Lebanon",
        image:
            "https://www.greeka.com/village_beach/photos/1168/pori-top-1-2560.webp",
        description: "623 kilometers away, Mar 17-22",
        rating: 4.96,
        price: "8,322 EGP night",
        },
        {
        id: 5,
        name: "Maldives",
        image:
            "https://images.unsplash.com/photo-1522735338363-cc7313be0ae0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        description: "Luxury Resort, All Inclusive",
        rating: 4.98,
        price: "12,500 EGP night",
        },
        {
        id: 6,
        name: "Santorini, Greece",
        image:
            "https://cdn.britannica.com/65/114965-050-3C4F95F4/citadel-acropolis-Lindos-Greeks-Romans-Byzantines-Ottomans.jpg?w=300",
        description: "View of the Caldera, Sunset",
        rating: 4.95,
        price: "10,000 EGP night",
        },
        {
        id: 7,
        name: "Bali, Indonesia",
        image:
            "https://images.unsplash.com/photo-1522735338363-cc7313be0ae0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        description: "Rice Terraces, Ubud",
        rating: 4.92,
        price: "8,800 EGP night",
        },
        {
        id: 8,
        name: "Seychelles",
        image:
            "https://www.greeka.com/village_beach/photos/1168/pori-top-1-2560.webp",
        description: "Praslin Island, Anse Lazio",
        rating: 4.97,
        price: "11,200 EGP night",
        },
        {
        id: 9,
        name: "Ibiza, Spain",
        image:
            "https://images.unsplash.com/photo-1522735338363-cc7313be0ae0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        description: "Sunset at Cafe Mambo",
        rating: 4.9,
        price: "9,500 EGP night",
        },
        {
        id: 10,
        name: "Capri, Italy",
        image:
            "https://www.greeka.com/village_beach/photos/1168/pori-top-1-2560.webp",
        description: "Blue Grotto, Boat Tour",
        rating: 4.93,
        price: "10,500 EGP night",
        },
        {
        id: 11,
        name: "Capri, Italy",
        image: imageURL,
        description: "Blue Grotto, Boat Tour",
        rating: 4.93,
        price: "10,500 EGP night",
        },
    ];

    return (
        <div className="container w-4/5 mx-auto pt-3 flex flex-col">
        <div className="flex flex-wrap justify-center mb-4">
            <button className="bg-gray-200 rounded-full px-4 py-2 m-2">
            Beachfront
            </button>
            <button className="bg-gray-200 rounded-full px-4 py-2 m-2">
            Icons
            </button>
            <button className="bg-gray-200 rounded-full px-4 py-2 m-2">
            Trending
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {places.map((place) => (
            <div
                key={place.id}
                className="border rounded-md overflow-hidden shadow-md"
            >
                <img
                src={place.image}
                alt={place.name}
                className="w-full h-48 object-cover"
                />
                <div className="p-4">
                <h3 className="font-semibold">{place.name}</h3>
                <p className="text-sm text-gray-600">{place.description}</p>
                <div className="flex justify-between items-center mt-2">
                    <span className="text-sm">★ {place.rating}</span>
                    <span className="text-sm">{place.price}</span>
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>
  );
}

export default Home;
