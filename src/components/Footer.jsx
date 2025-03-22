import React from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-white border-t border-gray-200 mt-8 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Inspiration for future getaways
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          <div>
            <h3 className="text-gray-900 font-medium mb-2">Popular</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Canmore</a></li>
              <li><a href="#" className="hover:underline">Bernaldares</a></li>
              <li><a href="#" className="hover:underline">Marbella</a></li>
              <li><a href="#" className="hover:underline">Tucson</a></li>
              <li><a href="#" className="hover:underline">Anaheim</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 font-medium mb-2">Beach</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Kaş</a></li>
              <li><a href="#" className="hover:underline">Santorini</a></li>
              <li><a href="#" className="hover:underline">Rhodes</a></li>
              <li><a href="#" className="hover:underline">Bali</a></li>
              <li><a href="#" className="hover:underline">Seychelles</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 font-medium mb-2">Unique stays</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Tiny homes</a></li>
              <li><a href="#" className="hover:underline">Windmills</a></li>
              <li><a href="#" className="hover:underline">Treehouses</a></li>
              <li><a href="#" className="hover:underline">Cabins</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 font-medium mb-2">Categories</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">OMG!</a></li>
              <li><a href="#" className="hover:underline">Trending</a></li>
              <li><a href="#" className="hover:underline">Luxe</a></li>
              <li><a href="#" className="hover:underline">Lakefront</a></li>
              <li><a href="#" className="hover:underline">Play</a></li>
            </ul>
          </div>
        </div>

        <hr className="my-4" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <h3 className="text-gray-900 font-medium mb-2">Support</h3>
            <ul className="space-y-1">
              <li><a onClick={() => navigate("/contact")} className="hover:underline cursor-pointer">Help Center</a></li>
              <li><a href="#" className="hover:underline">Safety information</a></li>
              <li><a href="#" className="hover:underline">Cancellation options</a></li>
              <li><a href="#" className="hover:underline">Supporting people</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-900 font-medium mb-2">Hosting</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Try hosting</a></li>
              <li><a href="#" className="hover:underline">AirCover for Hosts</a></li>
              <li><a href="#" className="hover:underline">Explore hosting resources</a></li>
              <li><a href="#" className="hover:underline">Visit our community forum</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-900 font-medium mb-2">QUEفند</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Newsroom</a></li>
              <li><a href="#" className="hover:underline">Learn about new features</a></li>
              <li><a href="#" className="hover:underline">Letter from our founders</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
            </ul>
          </div>
        </div>

        <hr className="my-4" />

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>© 2025 QUEفند.</p>
          <div className="space-x-2 mt-2 sm:mt-0">
            <a href="#" className="hover:underline">Terms</a>
            <span>·</span>
            <a href="#" className="hover:underline">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:underline">Sitemap</a>
            <span>·</span>
            <a href="#" className="hover:underline">Destinations</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
