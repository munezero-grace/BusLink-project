import { useState, useEffect, useRef } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FaBus, FaMapMarkerAlt, FaClock, FaRoute } from 'react-icons/fa';

// This should be in your environment variables
// const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const MAPBOX_TOKEN = 'your_mapbox_token'; // Replace with actual token from env

// Define types
interface BusLocation {
  longitude: number;
  latitude: number;
}

interface Bus {
  id: number;
  routeName: string;
  plateNumber: string;
  location: BusLocation;
  speed: number;
  nextStop: string;
  estimatedArrival: string;
}

// Mock bus data - replace with actual API data
const mockBusData: Bus[] = [
  { id: 1, routeName: 'Kigali - Nyamata', plateNumber: 'RAC 123A', location: { longitude: 30.0615, latitude: -1.9441 }, speed: 45, nextStop: 'Kicukiro Center', estimatedArrival: '10 mins' },
  { id: 2, routeName: 'Kigali - Musanze', plateNumber: 'RAD 456B', location: { longitude: 30.0715, latitude: -1.9341 }, speed: 38, nextStop: 'Nyabugogo', estimatedArrival: '5 mins' },
  { id: 3, routeName: 'Kigali - Huye', plateNumber: 'RAE 789C', location: { longitude: 30.0815, latitude: -1.9541 }, speed: 42, nextStop: 'Downtown', estimatedArrival: '15 mins' },
];

interface TrackingMapProps {
  busId?: number | null;
}

const TrackingMap = ({ busId = null }: TrackingMapProps) => {
  const mapRef = useRef(null);
  const [buses, setBuses] = useState<Bus[]>(mockBusData);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [viewState, setViewState] = useState({
    longitude: 30.0615,
    latitude: -1.9441,
    zoom: 12
  });

  // If a specific busId is provided, focus on that bus
  useEffect(() => {
    if (busId) {
      const bus = buses.find(b => b.id === busId);
      if (bus) {
        setViewState({
          longitude: bus.location.longitude,
          latitude: bus.location.latitude,
          zoom: 14
        });
        setSelectedBus(bus);
      }
    }
  }, [busId, buses]);

  // Simulate real-time updates (replace with WebSocket or polling)
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prevBuses => 
        prevBuses.map(bus => ({
          ...bus,
          location: {
            longitude: bus.location.longitude + (Math.random() - 0.5) * 0.001,
            latitude: bus.location.latitude + (Math.random() - 0.5) * 0.001
          }
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden shadow-lg">
      <Map
        ref={mapRef}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {buses.map(bus => (
          <Marker
            key={bus.id}
            longitude={bus.location.longitude}
            latitude={bus.location.latitude}
            anchor="bottom"
            onClick={e => {
              e.originalEvent.stopPropagation();
              setSelectedBus(bus);
            }}
          >
            <div className="relative w-8 h-8 cursor-pointer">
              {/* Bus icon */}
              <div className="absolute inset-0 bg-blue-600 rounded-full flex items-center justify-center text-white">
                <FaBus className="h-5 w-5" />
              </div>
            </div>
          </Marker>
        ))}

        {selectedBus && (
          <Popup
            longitude={selectedBus.location.longitude}
            latitude={selectedBus.location.latitude}
            anchor="bottom"
            onClose={() => setSelectedBus(null)}
            closeButton={true}
            closeOnClick={false}
          >
            <div className="p-2">
              <h3 className="font-bold text-lg">{selectedBus.plateNumber}</h3>
              <p className="text-sm">{selectedBus.routeName}</p>
              <div className="mt-2 text-xs space-y-1">
                <div className="flex items-center">
                  <FaRoute className="mr-1 text-blue-600" />
                  <span><strong>Speed:</strong> {selectedBus.speed} km/h</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-1 text-red-600" />
                  <span><strong>Next Stop:</strong> {selectedBus.nextStop}</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-1 text-green-600" />
                  <span><strong>ETA:</strong> {selectedBus.estimatedArrival}</span>
                </div>
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default TrackingMap;