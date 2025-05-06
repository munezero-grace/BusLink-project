"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  FaBus, 
  FaPhone, 
  FaRoute, 
  FaMapMarkerAlt, 
  FaClock, 
  FaRegClock, 
  FaUserAlt, 
  FaChevronUp, 
  FaChevronDown,
  FaExclamationTriangle,
  FaInfoCircle,
  FaWifi,
  FaTemperatureHigh,
  FaChargingStation,
  FaUsers
} from "react-icons/fa";

// Mock bus data with real-time positioning
const SAMPLE_BUSES = [
  {
    id: "KGL-EXP-123",
    name: "Kigali Express",
    driver: "Eric Muragatete",
    phone: "+250 788 123 456",
    routeId: "ROUTE-001",
    currentLocation: { lat: -1.9514, lng: 30.0586 },
    speed: 42,
    nextStop: "Kacyiru",
    nextStopETA: "4 mins",
    finalDestination: "Remera",
    finalETA: "16 mins",
    status: "on-time",
    capacity: 42,
    occupancy: 28,
    lastUpdated: new Date().toISOString(),
    vehicleNumber: "RAB 123A",
    amenities: ["WiFi", "Air Conditioning", "USB Charging"]
  },
  {
    id: "KGL-EXP-456",
    name: "Nyabugogo Express",
    driver: "Jean Claude Ndayisaba",
    phone: "+250 788 456 789",
    routeId: "ROUTE-002",
    currentLocation: { lat: -1.9332, lng: 30.0398 },
    speed: 38,
    nextStop: "Gitega",
    nextStopETA: "7 mins",
    finalDestination: "Nyamirambo",
    finalETA: "23 mins",
    status: "delayed",
    capacity: 36,
    occupancy: 36,
    lastUpdated: new Date().toISOString(),
    vehicleNumber: "RAB 456B",
    amenities: ["WiFi", "Air Conditioning"]
  }
];

// Mock routes with stops
const SAMPLE_ROUTES = [
  {
    id: "ROUTE-001",
    name: "Kigali CBD - Remera",
    stops: [
      { name: "Kigali CBD", location: { lat: -1.9462, lng: 30.0620 }, passed: true },
      { name: "Kacyiru", location: { lat: -1.9396, lng: 30.0689 }, passed: false },
      { name: "Kimironko", location: { lat: -1.9342, lng: 30.0900 }, passed: false },
      { name: "Remera", location: { lat: -1.9462, lng: 30.1040 }, passed: false }
    ],
    color: "#4F90F5"
  },
  {
    id: "ROUTE-002",
    name: "Nyabugogo - Nyamirambo",
    stops: [
      { name: "Nyabugogo", location: { lat: -1.9382, lng: 30.0396 }, passed: true },
      { name: "Gitega", location: { lat: -1.9478, lng: 30.0370 }, passed: false },
      { name: "Nyamirambo", location: { lat: -1.9688, lng: 30.0399 }, passed: false }
    ],
    color: "#F5994F"
  }
];

export default function BusTracking() {
  const searchParams = useSearchParams();
  const busId = searchParams.get('busId');
  const bookingId = searchParams.get('bookingId');
  
  const [selectedBus, setSelectedBus] = useState(SAMPLE_BUSES[0]);
  const [selectedRoute, setSelectedRoute] = useState(SAMPLE_ROUTES[0]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPanelExpanded, setIsPanelExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPosition, setCurrentPosition] = useState({ lat: -1.9514, lng: 30.0586, accuracy: 50 });
  const [etaMinutes, setEtaMinutes] = useState(16);
  const [isLoading, setIsLoading] = useState(true);
  const [mapUrl, setMapUrl] = useState('');
  const [trafficCondition, setTrafficCondition] = useState('moderate'); // light, moderate, heavy

  // Generate mock ETAs for selected route
  useEffect(() => {
    if (selectedBus && selectedRoute) {
      // Set appropriate map center and zoom
      const centerLat = selectedBus.currentLocation.lat;
      const centerLng = selectedBus.currentLocation.lng;
      
      // Create map URL with bus position marker
      const busMarker = `markers=color:red%7Csize:mid%7Clabel:B%7C${centerLat},${centerLng}`;
      
      // Add stop markers
      const stopMarkers = selectedRoute.stops
        .map((stop, index) => {
          const label = String.fromCharCode(65 + index); // A, B, C, etc.
          return `markers=color:blue%7Csize:small%7Clabel:${label}%7C${stop.location.lat},${stop.location.lng}`;
        })
        .join('&');
      
      // Set map URL
      setMapUrl(`https://maps.googleapis.com/maps/api/staticmap?center=${centerLat},${centerLng}&zoom=13&size=600x400&${busMarker}&${stopMarkers}&key=YOUR_API_KEY`);
      
      // Find the bus by ID if provided in URL params
      if (busId) {
        const bus = SAMPLE_BUSES.find(b => b.id === busId);
        if (bus) {
          setSelectedBus(bus);
          const route = SAMPLE_ROUTES.find(r => r.id === bus.routeId);
          if (route) setSelectedRoute(route);
        }
      }
      
      // Simulate loading
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      
      // Simulate ETA updates
      const etaTimer = setInterval(() => {
        setEtaMinutes(prev => {
          const newEta = prev > 0 ? prev - 1 : 0;
          if (newEta === 0) clearInterval(etaTimer);
          return newEta;
        });
      }, 60000); // Update every minute
      
      // Simulate traffic condition changes
      const trafficTimer = setInterval(() => {
        const conditions = ['light', 'moderate', 'heavy'];
        setTrafficCondition(conditions[Math.floor(Math.random() * conditions.length)]);
      }, 120000); // Update every 2 minutes
      
      return () => {
        clearTimeout(timer);
        clearInterval(etaTimer);
        clearInterval(trafficTimer);
      };
    }
  }, [selectedBus, selectedRoute, busId]);

  // Track user's real position if allowed
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const handleBusSelect = (bus) => {
    setSelectedBus(bus);
    const route = SAMPLE_ROUTES.find(r => r.id === bus.routeId);
    if (route) setSelectedRoute(route);
    setIsSearchOpen(false);
  };

  const filteredBuses = SAMPLE_BUSES.filter(bus => 
    bus.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    bus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bus.routeId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCallDriver = () => {
    if (selectedBus.phone) {
      window.location.href = `tel:${selectedBus.phone.replace(/\s/g, '')}`;
    }
  };

  // Calculate progress for route
  const calculateRouteProgress = () => {
    if (!selectedRoute) return 0;
    
    const passedStops = selectedRoute.stops.filter(stop => stop.passed).length;
    const totalStops = selectedRoute.stops.length;
    
    // Account for current progress between stops
    const progressBetweenStops = 1 / (totalStops - 1);
    const baseProgress = (passedStops / totalStops) * 100;
    
    // If we're at the last stop, return 100%
    if (passedStops === totalStops - 1) {
      const remainingPercentage = 100 - baseProgress;
      // Convert ETA to percentage of remaining journey
      const etaPercent = etaMinutes === 0 ? 100 : Math.min(100, (16 - etaMinutes) / 16 * 100);
      return baseProgress + (remainingPercentage * (etaPercent / 100));
    }
    
    return baseProgress;
  };

  const routeProgress = calculateRouteProgress();

  // Format time considering 12/24 hour format
  const formatTime = (minutes) => {
    if (minutes === 0) return "Arriving now";
    return `${minutes} min${minutes > 1 ? 's' : ''}`;
  };

  // Get traffic color
  const getTrafficColor = () => {
    switch (trafficCondition) {
      case 'light': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'heavy': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  return (
    <main className="relative h-screen w-full flex flex-col bg-gray-100">
      {/* Header for the tracking page */}
      <header className="bg-primary-dark text-white shadow-md px-4 py-3 z-20 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">BusLink</Link>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="bg-primary hover:bg-primary-light p-2 rounded-full transition-colors"
          >
            <FaBus className="text-white" />
          </button>
          <Link 
            href="/booking"
            className="bg-primary hover:bg-primary-light px-4 py-2 rounded transition-colors"
          >
            Book a Trip
          </Link>
        </div>
      </header>

      {/* Search Panel */}
      {isSearchOpen && (
        <div className="absolute top-16 right-4 w-80 bg-white shadow-lg rounded-lg z-20 overflow-hidden">
          <div className="p-3 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search buses by ID or route..."
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="max-h-80 overflow-y-auto">
            {filteredBuses.length > 0 ? (
              filteredBuses.map((bus) => (
                <div 
                  key={bus.id}
                  className="p-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleBusSelect(bus)}
                >
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${bus.status === 'on-time' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                    <div>
                      <p className="font-medium">{bus.name}</p>
                      <p className="text-sm text-gray-600">{bus.id}</p>
                      <p className="text-xs text-gray-500">
                        {SAMPLE_ROUTES.find(r => r.id === bus.routeId)?.name || "Unknown Route"}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-600">No buses found</div>
            )}
          </div>
        </div>
      )}

      {/* Map Container */}
      <div className="relative flex-grow w-full">
        {isLoading ? (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
          </div>
        ) : (
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63799.41051610002!2d30.0333854!3d-1.9441631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca6eef12d6443%3A0xed139784e825cd16!2sKacyiru%2C%20Kigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1650123456789!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bus tracking map"
            className="absolute inset-0"
          />
        )}

        {/* Traffic Indicator */}
        <div className="absolute top-20 right-4 bg-white p-2 rounded-lg shadow-md z-10 flex items-center">
          <div className="flex items-center mr-2">
            <div className={`w-3 h-3 rounded-full mr-1 ${getTrafficColor()}`}></div>
            <span className="text-xs capitalize">{trafficCondition} traffic</span>
          </div>
        </div>

        {/* ETA Display */}
        <div className="absolute top-20 left-4 bg-white p-3 rounded-lg shadow-md z-10">
          <div className="text-center mb-1">
            <span className="text-xs text-gray-500">Estimated arrival</span>
          </div>
          <div className="flex items-center justify-center">
            <FaClock className="text-primary mr-2" />
            <span className="text-lg font-bold">{formatTime(etaMinutes)}</span>
          </div>
        </div>

        {/* Bus Information Panel */}
        <div className={`absolute ${isPanelExpanded ? 'bottom-0' : 'bottom-10'} left-0 w-full bg-white text-gray-800 z-20 rounded-t-lg shadow-lg transition-all duration-300`}>
          {/* Panel Header with Expand/Collapse Button */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
            <button 
              onClick={() => setIsPanelExpanded(!isPanelExpanded)}
              className="bg-white rounded-full p-2 shadow-md flex items-center justify-center w-10 h-10"
            >
              {isPanelExpanded ? <FaChevronDown /> : <FaChevronUp />}
            </button>
          </div>

          {/* Panel Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full mr-3 ${selectedBus.status === 'on-time' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
              <h2 className="font-bold text-lg">{selectedBus.name}</h2>
            </div>
            <div className="text-sm text-gray-500">
              {selectedBus.id}
            </div>
          </div>

          {/* Expanded Content */}
          {isPanelExpanded && (
            <div className="p-4">
              {/* Route Visualization */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                  <FaRoute className="mr-2" /> Route Progress
                </h3>
                
                <div className="relative">
                  {/* Progress Bar */}
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${routeProgress}%` }}
                    ></div>
                  </div>
                  
                  {/* Stops */}
                  <div className="flex justify-between mt-2">
                    {selectedRoute.stops.map((stop, index) => (
                      <div 
                        key={index} 
                        className="flex flex-col items-center relative"
                        style={{ left: `${index / (selectedRoute.stops.length - 1) * 100}%`, marginLeft: '-10px' }}
                      >
                        <div className={`w-4 h-4 rounded-full ${stop.passed ? 'bg-primary' : 'bg-gray-300'}`}></div>
                        <span className="text-xs mt-1 text-center whitespace-nowrap max-w-[60px] overflow-hidden text-ellipsis" title={stop.name}>
                          {stop.name}
                        </span>
                        {selectedBus.nextStop === stop.name && (
                          <span className="text-xs font-bold text-primary mt-1">
                            {selectedBus.nextStopETA}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Bus Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* From - To */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="text-xs text-gray-500 mb-1">Route</h4>
                  <p className="font-medium">
                    {selectedRoute.stops[0].name} - {selectedRoute.stops[selectedRoute.stops.length - 1].name}
                  </p>
                </div>
                
                {/* Driver */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="text-xs text-gray-500 mb-1">Driver</h4>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{selectedBus.driver}</p>
                    <button
                      onClick={handleCallDriver}
                      className="bg-primary text-white rounded-full p-1.5 text-xs hover:bg-primary-light transition-colors"
                      aria-label="Call driver"
                    >
                      <FaPhone />
                    </button>
                  </div>
                </div>
                
                {/* Arrival Time */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="text-xs text-gray-500 mb-1">Arrival At Destination</h4>
                  <p className="font-medium flex items-center">
                    <FaRegClock className="mr-1 text-primary" /> {selectedBus.finalETA}
                  </p>
                </div>
                
                {/* Current Occupancy */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="text-xs text-gray-500 mb-1">Current Occupancy</h4>
                  <div className="flex items-center">
                    <div className="flex-grow mr-2">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${selectedBus.occupancy / selectedBus.capacity > 0.8 ? 'bg-red-500' : 'bg-green-500'}`} 
                          style={{ width: `${(selectedBus.occupancy / selectedBus.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium whitespace-nowrap">
                      {selectedBus.occupancy}/{selectedBus.capacity}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Amenities */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Bus Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedBus.amenities.includes('WiFi') && (
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center">
                      <FaWifi className="mr-1" /> WiFi
                    </span>
                  )}
                  {selectedBus.amenities.includes('Air Conditioning') && (
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center">
                      <FaTemperatureHigh className="mr-1" /> A/C
                    </span>
                  )}
                  {selectedBus.amenities.includes('USB Charging') && (
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center">
                      <FaChargingStation className="mr-1" /> USB Charging
                    </span>
                  )}
                </div>
              </div>
              
              {/* Status / Alerts */}
              {selectedBus.status === 'delayed' && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaExclamationTriangle className="text-yellow-500 mt-0.5" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">This bus is currently running behind schedule.</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex gap-2">
                <Link
                  href={`/booking?routeId=${selectedBus.routeId}`}
                  className="flex-1 bg-primary text-white text-center py-3 rounded-md hover:bg-primary-light transition-colors"
                >
                  Book This Route
                </Link>
                <Link
                  href="/contact"
                  className="bg-gray-200 text-gray-700 px-4 py-3 rounded-md hover:bg-gray-300 transition-colors flex items-center justify-center"
                >
                  <FaInfoCircle />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}