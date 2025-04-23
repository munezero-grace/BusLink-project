'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Define route interface
interface Route {
  id: string;
  name: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  availableSeats: number;
  busId: string;
}

// Mock routes data
const ROUTES: Route[] = [
  {
    id: "route-1",
    name: "Nyabugogo Bus Stop - Kimironko Bus Stop",
    from: "Nyabugogo Bus Stop",
    to: "Kimironko Bus Stop",
    departureTime: "08:00 AM",
    arrivalTime: "08:40 AM",
    price: 2500,
    availableSeats: 24,
    busId: "bus-101"
  },
  {
    id: "route-2",
    name: "Downtown Bus Stop - Kimironko Bus Stop",
    from: "Downtown Bus Stop",
    to: "Kimironko Bus Stop",
    departureTime: "09:30 AM",
    arrivalTime: "10:10 AM",
    price: 2500,
    availableSeats: 18,
    busId: "bus-102"
  },
  {
    id: "route-3",
    name: "Nyabugogo Bus Stop - Nyanza Bus Stop",
    from: "Nyabugogo Bus Stop",
    to: "Nyanza Bus Stop",
    departureTime: "10:30 AM",
    arrivalTime: "11:45 AM",
    price: 3000,
    availableSeats: 32,
    busId: "bus-103"
  },
  {
    id: "route-4",
    name: "Downtown Bus Stop - Nyanza Bus Stop",
    from: "Downtown Bus Stop",
    to: "Nyanza Bus Stop",
    departureTime: "11:00 AM",
    arrivalTime: "12:15 PM",
    price: 3000,
    availableSeats: 28,
    busId: "bus-104"
  },
  {
    id: "route-5",
    name: "Downtown Bus Stop - Gatsinda Bus Stop",
    from: "Downtown Bus Stop",
    to: "Gatsinda Bus Stop",
    departureTime: "12:30 PM",
    arrivalTime: "01:15 PM",
    price: 2200,
    availableSeats: 30,
    busId: "bus-105"
  },
  {
    id: "route-6",
    name: "Downtown Bus Stop - Remera Bus Stop",
    from: "Downtown Bus Stop",
    to: "Remera Bus Stop",
    departureTime: "01:30 PM",
    arrivalTime: "02:15 PM",
    price: 2200,
    availableSeats: 22,
    busId: "bus-106"
  },
  {
    id: "route-7",
    name: "Nyabugogo Bus Stop - Remera Bus Stop",
    from: "Nyabugogo Bus Stop",
    to: "Remera Bus Stop",
    departureTime: "02:30 PM",
    arrivalTime: "03:15 PM",
    price: 2200,
    availableSeats: 26,
    busId: "bus-107"
  }
];

export default function RouteListingComponent() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState('Kicukiro Route');
  const currentDate = new Date().toISOString().split('T')[0];

  // Filter routes based on search query
  const filteredRoutes = ROUTES.filter(route => 
    route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.to.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRouteSelect = (route: Route) => {
    // Navigate to the booking page with the selected route
    router.push(`/booking?route=${encodeURIComponent(route.name)}`);
  };

  const handleSelectSeats = (route: Route, event: React.MouseEvent) => {
    // Prevent the click from bubbling up to the parent
    event.stopPropagation();
    
    // Navigate directly to the seat selection page
    router.push(`/booking/seats?routeId=${encodeURIComponent(route.id)}&busId=${encodeURIComponent(route.busId)}&date=${currentDate}`);
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
            placeholder="Search routes, destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Date selector */}
      <div className="px-4 py-2">
        <div className="p-3 bg-white rounded-md shadow-sm">
          <p className="text-gray-600 text-sm mb-1">Today's Date:</p>
          <p className="font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      {/* Route Listings */}
      <div className="flex-1 overflow-auto p-4">
        <h2 className="text-lg font-semibold mb-3">Available Routes</h2>
        <div className="space-y-3">
          {filteredRoutes.map((route) => (
            <div 
              key={route.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition duration-150 overflow-hidden"
            >
              <div 
                className="p-4 cursor-pointer"
                onClick={() => handleRouteSelect(route)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{route.name}</h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {route.availableSeats} seats left
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-sm text-gray-500">Departure</p>
                    <p className="font-medium">{route.departureTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Arrival</p>
                    <p className="font-medium">{route.arrivalTime}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary-dark">{route.price} RWF</span>
                  <button 
                    className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition"
                    onClick={(e) => handleSelectSeats(route, e)}
                  >
                    Select Seats
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredRoutes.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No routes found matching your search.</p>
            </div>
          )}
        </div>
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
