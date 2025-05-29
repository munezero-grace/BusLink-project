'use client';

import React, { useState } from 'react';
import { FaRoute, FaMapMarkerAlt, FaClock, FaHeart, FaRegHeart, FaStar, FaFilter, FaSearch } from 'react-icons/fa';
import Link from 'next/link';

export default function UserRoutes() {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [timeFilter, setTimeFilter] = useState('all');
  const [showFavorites, setShowFavorites] = useState(false);
  
  // Mock data for routes
  const routesData = [
    {
      id: 1,
      name: 'Downtown - Kimironko',
      start: 'Downtown (City Center)',
      end: 'Kimironko Bus Terminal',
      frequency: 'Every 15 minutes',
      operatingHours: '5:00 AM - 10:00 PM',
      price: '1,500 RWF',
      rating: 4.5,
      isFavorite: true,
      timings: ['5:00 AM', '5:15 AM', '5:30 AM', '5:45 AM', '6:00 AM', '6:15 AM'],
      stops: ['Downtown', 'Central Hospital', 'Convention Center', 'MTN Center', 'Kigali Heights', 'Kimironko']
    },
    {
      id: 2,
      name: 'Nyabugogo - Remera',
      start: 'Nyabugogo Bus Terminal',
      end: 'Remera Bus Stop',
      frequency: 'Every 20 minutes',
      operatingHours: '5:30 AM - 9:30 PM',
      price: '1,200 RWF',
      rating: 4.2,
      isFavorite: true,
      timings: ['5:30 AM', '5:50 AM', '6:10 AM', '6:30 AM', '6:50 AM', '7:10 AM'],
      stops: ['Nyabugogo', 'Muhima', 'Kigali Business Center', 'Kacyiru', 'Remera']
    },
    {
      id: 3,
      name: 'Kacyiru - Downtown',
      start: 'Kacyiru Main Road',
      end: 'Downtown Bus Stop',
      frequency: 'Every 30 minutes',
      operatingHours: '6:00 AM - 9:00 PM',
      price: '1,000 RWF',
      rating: 3.8,
      isFavorite: false,
      timings: ['6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM'],
      stops: ['Kacyiru', 'Ministry Complex', 'Kigali Convention Center', 'Downtown']
    },
    {
      id: 4,
      name: 'Gikondo - Kigali Heights',
      start: 'Gikondo Bus Terminal',
      end: 'Kigali Heights',
      frequency: 'Every 25 minutes',
      operatingHours: '5:45 AM - 9:45 PM',
      price: '1,400 RWF',
      rating: 4.0,
      isFavorite: false,
      timings: ['5:45 AM', '6:10 AM', '6:35 AM', '7:00 AM', '7:25 AM', '7:50 AM'],
      stops: ['Gikondo', 'Nyenyeri', 'Remera', 'Airport Road', 'Kigali Heights']
    },
    {
      id: 5,
      name: 'Kicukiro - Nyamirambo',
      start: 'Kicukiro Center',
      end: 'Nyamirambo Bus Stop',
      frequency: 'Every 20 minutes',
      operatingHours: '6:00 AM - 9:00 PM',
      price: '1,300 RWF',
      rating: 4.3,
      isFavorite: false,
      timings: ['6:00 AM', '6:20 AM', '6:40 AM', '7:00 AM', '7:20 AM', '7:40 AM'],
      stops: ['Kicukiro', 'Sonatubes', 'Rwandex', 'Nyabugogo', 'Gitega', 'Nyamirambo']
    }
  ];

  // State for favorites
  const [routes, setRoutes] = useState(routesData);
  
  // Toggle favorite status
  const toggleFavorite = (id) => {
    setRoutes(routes.map(route => 
      route.id === id ? {...route, isFavorite: !route.isFavorite} : route
    ));
  };

  // Filter routes based on search term, favorites, and time filter
  const filteredRoutes = routes.filter(route => {
    // Filter by search term
    const matchesSearch = route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          route.start.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          route.end.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by favorites
    const matchesFavorites = showFavorites ? route.isFavorite : true;
    
    // Filter by operating hours (simplified for demo)
    let matchesTime = true;
    if (timeFilter === 'morning') {
      matchesTime = route.timings.some(time => time.includes('AM'));
    } else if (timeFilter === 'afternoon') {
      matchesTime = route.timings.some(time => 
        time.includes('PM') && parseInt(time.split(':')[0]) < 5
      );
    } else if (timeFilter === 'evening') {
      matchesTime = route.timings.some(time => 
        time.includes('PM') && parseInt(time.split(':')[0]) >= 5
      );
    }
    
    return matchesSearch && matchesFavorites && matchesTime;
  });

  // Star rating component
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar key={i} className={i < Math.floor(rating) ? "text-yellow-500" : "text-gray-300"} />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Bus Routes</h1>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search routes..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          
          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50"
          >
            <FaFilter /> Filters
          </button>
          
          {/* Favorites Toggle */}
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
              showFavorites 
                ? 'bg-primary text-white' 
                : 'border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {showFavorites ? <FaHeart /> : <FaRegHeart />} Favorites
          </button>
        </div>
      </div>
      
      {/* Filter Options */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-medium mb-3">Filter by Time</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => setTimeFilter('all')}
              className={`px-4 py-2 rounded-md ${
                timeFilter === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Times
            </button>
            <button
              onClick={() => setTimeFilter('morning')}
              className={`px-4 py-2 rounded-md ${
                timeFilter === 'morning'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Morning (5AM-12PM)
            </button>
            <button
              onClick={() => setTimeFilter('afternoon')}
              className={`px-4 py-2 rounded-md ${
                timeFilter === 'afternoon'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Afternoon (12PM-5PM)
            </button>
            <button
              onClick={() => setTimeFilter('evening')}
              className={`px-4 py-2 rounded-md ${
                timeFilter === 'evening'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Evening (5PM-10PM)
            </button>
          </div>
        </div>
      )}
      
      {/* Routes List */}
      <div className="space-y-4">
        {filteredRoutes.length > 0 ? (
          filteredRoutes.map(route => (
            <div key={route.id} className="bg-white rounded-lg shadow">
              <div className="p-5 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <FaRoute className="text-primary" />
                      <h3 className="text-lg font-semibold">{route.name}</h3>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {route.frequency} • {route.operatingHours}
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleFavorite(route.id)}
                    className="p-2 text-2xl"
                  >
                    {route.isFavorite ? 
                      <FaHeart className="text-red-500" /> : 
                      <FaRegHeart className="text-gray-400 hover:text-red-500" />
                    }
                  </button>
                </div>
              </div>
              
              <div className="p-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-start mb-4">
                      <div className="mt-1">
                        <div className="flex items-center gap-1">
                          <FaMapMarkerAlt className="text-gray-400" size={14} />
                          <span className="text-gray-500">From:</span>
                        </div>
                        <div className="h-8 border-l border-dashed border-gray-300 ml-1.5 my-1"></div>
                        <div className="flex items-center gap-1">
                          <FaMapMarkerAlt className="text-primary" size={14} />
                          <span className="text-gray-500">To:</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="font-medium">{route.start}</p>
                        <div className="h-8"></div>
                        <p className="font-medium">{route.end}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-700 font-medium mb-2">Bus Stops</p>
                      <div className="flex flex-wrap gap-2">
                        {route.stops.map((stop, idx) => (
                          <div key={idx} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                            {stop}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <p className="text-gray-700 font-medium">Rating</p>
                        <p className="text-gray-700">{route.rating}/5</p>
                      </div>
                      <div className="flex gap-1">
                        {renderStars(route.rating)}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-700 font-medium mb-2">Next Departures</p>
                      <div className="grid grid-cols-3 gap-2">
                        {route.timings.slice(0, 6).map((time, idx) => (
                          <div key={idx} className="flex items-center gap-1 text-sm">
                            <FaClock className="text-gray-400" size={12} />
                            <span>{time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-700 font-medium">Fare</p>
                      <p className="text-lg font-semibold text-primary">{route.price}</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                      <Link 
                        href={`/booking/routes?route=${route.id}`}
                        className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors text-center"
                      >
                        Book This Route
                      </Link>
                      <button className="flex-1 px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors">
                        View Schedule
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">No routes found matching your criteria</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setTimeFilter('all');
                setShowFavorites(false);
              }}
              className="mt-3 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
