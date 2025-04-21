"use client";

import { useState } from "react";
import { FaBus, FaPhone } from "react-icons/fa";
import { SAMPLE_ROUTES, SAMPLE_BUSES } from "../config/constants";

export default function BusTracking() {
  const [selectedBus, setSelectedBus] = useState(SAMPLE_BUSES[0]);

  const handleBookNow = () => {
    alert("Booking feature will be implemented soon!");
  };

  const handleCallDriver = () => {
    alert(`Calling driver: ${selectedBus.phone}`);
  };

  return (
    <main className="relative h-screen w-full flex flex-col bg-gray-100">
      {/* Header for the tracking page */}
      <header className="bg-white shadow-md px-4 py-2 z-10"></header>

      {/* Map Container - Using iframe like in the contact page */}
      <div className="relative flex-grow w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63799.41051610002!2d30.0333854!3d-1.9441631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca6eef12d6443%3A0xed139784e825cd16!2sKacyiru%2C%20Kigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1650123456789!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Kigali map"
          className="absolute inset-0"
        />

        {/* Bus Information Panel */}
        <div className="absolute bottom-0 left-0 w-full bg-primary-dark text-white z-20 rounded-t-lg shadow-lg">
          <div className="p-6">
            {/* Bus Title */}
            <div className="flex items-center mb-4">
              <FaBus className="text-white text-2xl mr-4" />
              <h2 className="font-semibold text-xl">
                {SAMPLE_ROUTES.find((r) => r.id === selectedBus.routeId)
                  ?.name || "Rapid Arrival Bus"}
              </h2>
            </div>

            {/* Bus Details */}
            <div className="space-y-4 ml-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-white rounded-full mr-4"></div>
                <div>
                  <p className="font-medium">{selectedBus.id}</p>
                  <p className="text-sm text-gray-300">
                    {selectedBus.distance}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-600 my-4"></div>

              <div className="flex items-center">
                <div className="w-3 h-3 bg-white rounded-full mr-4"></div>
                <div className="flex-grow">
                  <p className="font-medium">Driver</p>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-sm">{selectedBus.driver}</p>
                    <button
                      onClick={handleCallDriver}
                      className="bg-primary rounded-full p-3 text-white hover:bg-primary-light transition-colors"
                      aria-label="Call driver"
                    >
                      <FaPhone />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Book Now Button */}
            <button
              onClick={handleBookNow}
              className="w-full bg-white text-primary-dark font-medium py-3 rounded-md mt-6 hover:bg-gray-200 transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
