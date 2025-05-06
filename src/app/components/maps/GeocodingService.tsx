import { useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaExchangeAlt, FaLocationArrow } from 'react-icons/fa';

interface GeocodingResult {
  id: string;
  name: string;
  address: string;
  coordinates: {
    longitude: number;
    latitude: number;
  };
}

interface GeocodingServiceProps {
  onLocationSelect?: (location: GeocodingResult) => void;
  showCurrentLocation?: boolean;
}

// Mock geocoding results for demo
const mockSearchResults: GeocodingResult[] = [
  {
    id: '1',
    name: 'Kigali Convention Center',
    address: 'KG 2 Roundabout, Kigali, Rwanda',
    coordinates: { longitude: 30.0622, latitude: -1.9536 }
  },
  {
    id: '2',
    name: 'Nyabugogo Bus Terminal',
    address: 'Nyabugogo, Kigali, Rwanda',
    coordinates: { longitude: 30.0425, latitude: -1.9388 }
  },
  {
    id: '3',
    name: 'Kigali International Airport',
    address: 'KK 737 St, Kigali, Rwanda',
    coordinates: { longitude: 30.1328, latitude: -1.9708 }
  }
];

const GeocodingService = ({ 
  onLocationSelect, 
  showCurrentLocation = true 
}: GeocodingServiceProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<GeocodingResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<GeocodingResult | null>(null);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    
    if (e.target.value.length > 2) {
      // In a real app, debounce this request and call the actual geocoding API
      setIsSearching(true);
      
      // Simulate API call delay
      setTimeout(() => {
        // Filter mock results based on search query
        const filteredResults = mockSearchResults.filter(
          result => 
            result.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            result.address.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setSearchResults(filteredResults);
        setIsSearching(false);
      }, 500);
    } else {
      setSearchResults([]);
    }
  };

  // Handle selection of a location from search results
  const handleSelectLocation = (location: GeocodingResult) => {
    setSelectedLocation(location);
    setSearchQuery(location.name);
    setSearchResults([]);
    
    if (onLocationSelect) {
      onLocationSelect(location);
    }
  };

  // Handle getting current location 
  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // In a real app, you would reverse geocode these coordinates
          // to get the address information
          const currentLocation: GeocodingResult = {
            id: 'current',
            name: 'Your Current Location',
            address: 'Current Position',
            coordinates: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          };
          
          setSelectedLocation(currentLocation);
          setSearchQuery(currentLocation.name);
          
          if (onLocationSelect) {
            onLocationSelect(currentLocation);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to retrieve your location. Please ensure location services are enabled.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaMapMarkerAlt className="text-gray-400" />
        </div>
        
        <input
          type="text"
          placeholder="Search for a location..."
          className="pl-10 pr-12 py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        
        {searchQuery && (
          <button
            className="absolute inset-y-0 right-14 px-2 flex items-center text-gray-400 hover:text-gray-600"
            onClick={() => {
              setSearchQuery('');
              setSelectedLocation(null);
              setSearchResults([]);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        )}
        
        {showCurrentLocation && (
          <button
            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600"
            onClick={handleGetCurrentLocation}
            title="Use current location"
          >
            <FaLocationArrow />
          </button>
        )}
      </div>
      
      {/* Search results dropdown */}
      {searchResults.length > 0 && (
        <div className="mt-1 bg-white rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
          <ul>
            {searchResults.map(result => (
              <li 
                key={result.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectLocation(result)}
              >
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-primary mt-1 mr-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{result.name}</p>
                    <p className="text-sm text-gray-500">{result.address}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {isSearching && (
        <div className="mt-1 bg-white rounded-md shadow-lg z-10 p-4 text-center text-gray-500">
          Searching...
        </div>
      )}
      
      {/* Selected location display */}
      {selectedLocation && (
        <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-200">
          <div className="flex items-start">
            <div className="bg-primary h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <FaMapMarkerAlt className="text-white" />
            </div>
            <div>
              <h4 className="font-semibold">{selectedLocation.name}</h4>
              <p className="text-sm text-gray-600">{selectedLocation.address}</p>
              <div className="text-xs text-gray-500 mt-1">
                {selectedLocation.coordinates.latitude.toFixed(6)}, {selectedLocation.coordinates.longitude.toFixed(6)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeocodingService;