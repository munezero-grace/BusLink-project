'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ROUTES = [
  "Nyabugogo Bus Stop - Kimironko Bus Stop",
  "Downtown Bus Stop - Kimironko Bus Stop",
  "Nyabugogo Bus Stop - Nyanza Bus Stop",
  "Downtown Bus Stop - Nyanza Bus Stop",
  "Downtown Bus Stop - Gatsinda Bus Stop",
  "Downtown Bus Stop - Remera Bus Stop",
  "Nyabugogo Bus Stop - Remera Bus Stop",
  "Kimironko Bus Stop - Kabuga Bus Stop",
  "Downtown Bus Stop - Zindiro Bus Stop",
  "Downtown Bus Stop - Kacyiru Bus Stop",
  "Downtown Bus Stop - Nyacyonga Bus Stop",
  "Downtown Bus Stop - Nyamirambo Bus Stop",
  "Nyabugogo Bus Stop - Gasanze Bus Stop",
  "Nyabugogo Bus Stop - Kinyinya Bus Stop"
];

export default function RouteListingComponent() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('');
  const [currentCategory, setCurrentCategory] = useState('Kicukiro Route');

  // Filter routes based on search query
  const filteredRoutes = ROUTES.filter(route => 
    route.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRouteSelect = (route: string) => {
    setSelectedRoute(route);
    
    // Navigate to the booking page with the selected route
    router.push(`/booking?route=${encodeURIComponent(route)}`);
  };

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    // In a real implementation, you would filter routes by category
  };

  return (
    <div className="flex flex-col h-full bg-blue-50">
      {/* Header */}
      <header className="bg-primary-dark text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-medium">Kigali Main Bus Stop</h1>
        <button className="text-2xl">☰</button>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500">🔍</span>
          </div>
          <input
            type="search"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white"
            placeholder="Search Here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Route Listings */}
      <div className="flex-1 overflow-auto">
        <ul className="divide-y divide-gray-200">
          {filteredRoutes.map((route, index) => (
            <li 
              key={index}
              className="py-3 px-4 hover:bg-blue-100 cursor-pointer transition duration-150"
              onClick={() => handleRouteSelect(route)}
            >
              <p className="text-gray-900 font-medium">{route}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-primary-dark text-white flex">
        <button 
          className={`flex-1 py-3 text-center ${currentCategory === 'Gasabo Route' ? 'bg-primary-light' : ''}`}
          onClick={() => handleCategoryChange('Gasabo Route')}
        >
          Gasabo Route
        </button>
        <button 
          className={`flex-1 py-3 text-center ${currentCategory === 'Kicukiro Route' ? 'bg-primary-light' : ''}`}
          onClick={() => handleCategoryChange('Kicukiro Route')}
        >
          Kicukiro Route
        </button>
        <button 
          className={`flex-1 py-3 text-center ${currentCategory === 'Nyarugenge Route' ? 'bg-primary-light' : ''}`}
          onClick={() => handleCategoryChange('Nyarugenge Route')}
        >
          Nyarugenge Route
        </button>
      </div>
    </div>
  );
}
