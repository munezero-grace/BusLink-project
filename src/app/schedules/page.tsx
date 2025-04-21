'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaBus, FaClock, FaMapMarkerAlt, FaSearch, FaFilter, FaCalendarAlt } from 'react-icons/fa';

// Sample data for schedules
const SAMPLE_ROUTES = [
  {
    id: 1,
    name: 'Nyabugogo - Kacyiru',
    description: 'Via Downtown',
    stops: ['Nyabugogo Terminal', 'Kinamba', 'Downtown', 'Kigali Heights', 'Kacyiru'],
    image: '/images/kacyiru-bus-stop.jpeg',
  },
  {
    id: 2,
    name: 'Remera - Downtown',
    description: 'Via Nyarutarama',
    stops: ['Remera Bus Stop', 'Gishushu', 'Nyarutarama', 'Kigali Heights', 'Downtown'],
    image: '/images/remera-bus-stop.jpg',
  },
  {
    id: 3,
    name: 'Airport - City Center',
    description: 'Express Route',
    stops: ['Kigali International Airport', 'Kanombe', 'Kacyiru', 'Downtown'],
    image: '/images/downtown-bus-stop.jpg',
  },
];

const SAMPLE_SCHEDULES = [
  {
    id: 1,
    routeId: 1,
    departureTime: '06:00 AM',
    arrivalTime: '06:45 AM',
    busId: 'Bus-01',
    daysActive: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    status: 'On Time'
  },
  {
    id: 2,
    routeId: 1,
    departureTime: '07:00 AM',
    arrivalTime: '07:45 AM',
    busId: 'Bus-02',
    daysActive: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    status: 'On Time'
  },
  {
    id: 3,
    routeId: 1,
    departureTime: '08:00 AM',
    arrivalTime: '08:45 AM',
    busId: 'Bus-03',
    daysActive: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    status: 'Delayed'
  },
  {
    id: 4,
    routeId: 2,
    departureTime: '06:30 AM',
    arrivalTime: '07:15 AM',
    busId: 'Bus-04',
    daysActive: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    status: 'On Time'
  },
  {
    id: 5,
    routeId: 2,
    departureTime: '07:30 AM',
    arrivalTime: '08:15 AM',
    busId: 'Bus-05',
    daysActive: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    status: 'On Time'
  },
  {
    id: 6,
    routeId: 3,
    departureTime: '08:00 AM',
    arrivalTime: '08:30 AM',
    busId: 'Bus-06',
    daysActive: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    status: 'On Time'
  },
  {
    id: 7,
    routeId: 3,
    departureTime: '10:00 AM',
    arrivalTime: '10:30 AM',
    busId: 'Bus-07',
    daysActive: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    status: 'On Time'
  },
];

export default function SchedulesPage() {
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>('All Days');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSchedules, setFilteredSchedules] = useState(SAMPLE_SCHEDULES);
  const days = ['All Days', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Filter schedules based on selected route, day and search term
  useEffect(() => {
    let filtered = SAMPLE_SCHEDULES;
    
    // Filter by route
    if (selectedRoute) {
      filtered = filtered.filter(schedule => schedule.routeId === selectedRoute);
    }
    
    // Filter by day
    if (selectedDay !== 'All Days') {
      filtered = filtered.filter(schedule => schedule.daysActive.includes(selectedDay));
    }
    
    // Filter by search term (search by bus ID or route name)
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(schedule => {
        const route = SAMPLE_ROUTES.find(r => r.id === schedule.routeId);
        return (
          schedule.busId.toLowerCase().includes(term) ||
          (route && route.name.toLowerCase().includes(term)) ||
          schedule.departureTime.toLowerCase().includes(term)
        );
      });
    }
    
    setFilteredSchedules(filtered);
  }, [selectedRoute, selectedDay, searchTerm]);

  // Get route details by ID
  const getRouteById = (id: number) => {
    return SAMPLE_ROUTES.find(route => route.id === id);
  };

  // Handle book schedule
  const handleBookSchedule = (scheduleId: number) => {
    alert(`Booking functionality for schedule ${scheduleId} will be implemented soon!`);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section with Background */}
      <section className="w-full h-[300px] relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-dark/70 z-10 flex items-center justify-center">
          <div className="text-center px-4 max-w-2xl">
            <h1 className="text-4xl font-bold text-white mb-4">Bus Schedules</h1>
            <p className="text-white text-lg">Find and book buses on your preferred routes</p>
          </div>
        </div>
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <Image 
              src="/images/bus-hero.jpg" 
              alt="Bus Schedules"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
              quality={90}
            />
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white shadow-md py-6 sticky top-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            {/* Search */}
            <div className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by route, bus, or time..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            
            {/* Route Filter */}
            <div className="md:w-1/4">
              <div className="relative">
                <select
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                  value={selectedRoute || ''}
                  onChange={(e) => setSelectedRoute(e.target.value ? Number(e.target.value) : null)}
                >
                  <option value="">All Routes</option>
                  {SAMPLE_ROUTES.map(route => (
                    <option key={route.id} value={route.id}>{route.name}</option>
                  ))}
                </select>
                <FaFilter className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            
            {/* Day Filter */}
            <div className="md:w-1/4">
              <div className="relative">
                <select
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                >
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedules Display Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6">
            {filteredSchedules.length > 0 ? (
              filteredSchedules.map(schedule => {
                const route = getRouteById(schedule.routeId);
                return (
                  <div key={schedule.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="flex flex-col md:flex-row">
                      {/* Route Image */}
                      <div className="md:w-1/4 h-40 md:h-auto relative">
                        {route && (
                          <Image
                            src={route.image}
                            alt={route.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 25vw"
                          />
                        )}
                      </div>
                      
                      {/* Schedule Details */}
                      <div className="p-6 md:w-2/4">
                        <div className="flex items-center mb-3">
                          <FaBus className="text-primary text-lg mr-2" />
                          <h3 className="text-xl font-semibold text-primary-dark">
                            {route ? route.name : 'Unknown Route'}
                          </h3>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{route ? route.description : ''}</p>
                        
                        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                          <div className="flex items-center">
                            <FaClock className="text-gray-500 mr-2" />
                            <span className="text-gray-700 font-medium">Departure: {schedule.departureTime}</span>
                          </div>
                          <div className="flex items-center">
                            <FaClock className="text-gray-500 mr-2" />
                            <span className="text-gray-700 font-medium">Arrival: {schedule.arrivalTime}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <FaMapMarkerAlt className="text-gray-500" />
                          <div className="flex overflow-x-auto no-scrollbar">
                            {route && route.stops.map((stop, index) => (
                              <div key={index} className="flex items-center">
                                <span className="text-sm text-gray-600">{stop}</span>
                                {index < route.stops.length - 1 && (
                                  <span className="mx-1 text-gray-400">→</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {schedule.daysActive.map(day => (
                            <span key={day} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                              {day}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Actions Section */}
                      <div className="p-6 md:w-1/4 flex flex-col justify-between bg-gray-50 border-t md:border-t-0 md:border-l border-gray-100">
                        <div>
                          <div className="mb-3">
                            <span className="font-medium text-gray-700">Bus ID</span>
                            <div className="text-primary-dark font-bold text-lg">{schedule.busId}</div>
                          </div>
                          
                          <div className="mb-3">
                            <span className="font-medium text-gray-700">Status</span>
                            <div className={`font-bold text-lg ${schedule.status === 'On Time' ? 'text-green-500' : 'text-red-500'}`}>
                              {schedule.status}
                            </div>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => handleBookSchedule(schedule.id)}
                          className="w-full bg-primary hover:bg-primary-light text-white py-3 rounded-lg transition-colors duration-300 mt-4"
                        >
                          Book Seat
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-10">
                <FaBus className="text-gray-300 text-5xl mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No schedules found</h3>
                <p className="text-gray-500">Try adjusting your filters or search term</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-primary-dark text-center mb-8">Schedule Information</h2>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-primary-dark mb-2">How to read schedules</h3>
                  <p className="text-gray-700">
                    Our schedules show departure times from the starting point of each route. Arrival times are 
                    estimated based on typical traffic conditions. During peak hours, actual arrival times may vary.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-primary-dark mb-2">Booking information</h3>
                  <p className="text-gray-700">
                    You can book a seat up to 30 minutes before departure time. Bookings can be made online or through 
                    our mobile app. For last-minute bookings, please visit the bus station directly.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-primary-dark mb-2">Schedule changes</h3>
                  <p className="text-gray-700">
                    Routes and schedules may change during public holidays or special events. Please check our 
                    announcements or contact our customer service for the most up-to-date information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
