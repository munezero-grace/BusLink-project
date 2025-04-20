import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="relative min-h-[500px] flex items-center">
      {/* Hero Image Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/images/hero-bus.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Your next stop awaits
        </h1>
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Find schedule</h2>
          <p className="text-gray-600 text-sm mb-4">
            Search for your schedule times for a specific bus stop, bus route or station.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3">
            <div className="flex-grow">
              <input 
                type="text" 
                placeholder="Enter your location or route name" 
                className="w-full input-field"
              />
            </div>
            <div className="w-full sm:w-28">
              <select className="w-full input-field">
                <option value="">Area</option>
                <option value="kigali">Kigali</option>
                <option value="north">North</option>
                <option value="south">South</option>
                <option value="east">East</option>
                <option value="west">West</option>
              </select>
            </div>
            <button className="btn-primary sm:w-auto w-full">Find schedule</button>
          </form>
        </div>
        <div className="mt-4">
          <Link href="/tracking" className="bg-primary text-white px-4 py-2 rounded mr-4 inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Track your bus
          </Link>
          <Link href="/routes" className="text-white border border-white px-4 py-2 rounded inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Bus Schedule
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
