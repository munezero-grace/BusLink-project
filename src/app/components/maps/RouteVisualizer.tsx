import { useState, useEffect, useRef } from 'react';
import Map, { Source, Layer, NavigationControl, FullscreenControl, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FaBus, FaMapMarkerAlt } from 'react-icons/fa';

// This should be in your environment variables
// const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const MAPBOX_TOKEN = 'your_mapbox_token'; // Replace with actual token from env

// Define types
interface RoutePoint {
  longitude: number;
  latitude: number;
}

interface BusStop {
  id: number;
  name: string;
  location: RoutePoint;
}

interface RouteData {
  id: string;
  name: string;
  stops: BusStop[];
  path: RoutePoint[];
  trafficLevel: 'low' | 'medium' | 'high';
}

// Mock route data - replace with actual API data
const mockRouteData: RouteData = {
  id: 'route-1',
  name: 'Kigali - Nyamata',
  stops: [
    { id: 1, name: 'Nyabugogo Terminal', location: { longitude: 30.0425, latitude: -1.9388 } },
    { id: 2, name: 'Kicukiro Center', location: { longitude: 30.0567, latitude: -1.9654 } },
    { id: 3, name: 'Gahanga', location: { longitude: 30.0722, latitude: -1.9988 } },
    { id: 4, name: 'Nyamata Bus Stop', location: { longitude: 30.1235, latitude: -2.1387 } }
  ],
  path: [
    { longitude: 30.0425, latitude: -1.9388 },
    { longitude: 30.0467, latitude: -1.9423 },
    { longitude: 30.0512, latitude: -1.9501 },
    { longitude: 30.0567, latitude: -1.9654 },
    { longitude: 30.0623, latitude: -1.9745 },
    { longitude: 30.0722, latitude: -1.9988 },
    { longitude: 30.0845, latitude: -2.0345 },
    { longitude: 30.0978, latitude: -2.0789 },
    { longitude: 30.1235, latitude: -2.1387 }
  ],
  trafficLevel: 'medium'
};

interface RouteVisualizerProps {
  routeId?: string;
  showTraffic?: boolean;
}

const getTrafficColor = (level: 'low' | 'medium' | 'high') => {
  switch (level) {
    case 'low': return '#4CAF50'; // Green
    case 'medium': return '#FF9800'; // Orange
    case 'high': return '#F44336'; // Red
    default: return '#4CAF50';
  }
};

const RouteVisualizer = ({ routeId = 'route-1', showTraffic = true }: RouteVisualizerProps) => {
  const mapRef = useRef(null);
  const [route, setRoute] = useState<RouteData | null>(null);
  const [viewState, setViewState] = useState({
    longitude: 30.0615,
    latitude: -1.9441,
    zoom: 11
  });

  // Load route data
  useEffect(() => {
    // In a real app, fetch the route data based on routeId
    // For now, use mock data
    setRoute(mockRouteData);
    
    // Set initial view to show the whole route
    if (mockRouteData.path.length > 0) {
      const start = mockRouteData.path[0];
      setViewState({
        longitude: start.longitude,
        latitude: start.latitude,
        zoom: 11
      });
    }
  }, [routeId]);

  // Create GeoJSON data for the route
  const routeGeoJson = route ? {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: route.path.map(point => [point.longitude, point.latitude])
    }
  } : null;

  const layerStyle = {
    id: 'route',
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': showTraffic && route ? getTrafficColor(route.trafficLevel) : '#1E88E5',
      'line-width': 6
    }
  };

  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden shadow-lg">
      {route && (
        <Map
          ref={mapRef}
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          {/* Add controls */}
          <NavigationControl position="top-right" />
          <FullscreenControl position="top-right" />

          {/* Render the route line */}
          <Source id="route-source" type="geojson" data={routeGeoJson as any}>
            <Layer {...layerStyle as any} />
          </Source>

          {/* Render bus stops */}
          {route.stops.map((stop, index) => (
            <Marker
              key={stop.id}
              longitude={stop.location.longitude}
              latitude={stop.location.latitude}
              anchor="bottom"
            >
              <div className="relative group">
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded shadow-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {stop.name}
                </div>
                <div 
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    index === 0 || index === route.stops.length - 1 
                      ? 'bg-red-500' 
                      : 'bg-blue-500'
                  }`}
                >
                  <FaMapMarkerAlt className="text-white text-sm" />
                </div>
              </div>
            </Marker>
          ))}
          
          {/* Render a bus on the route (simulating movement) */}
          <Marker
            longitude={route.path[Math.floor(route.path.length / 2)].longitude}
            latitude={route.path[Math.floor(route.path.length / 2)].latitude}
            anchor="bottom"
          >
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center animate-pulse">
              <FaBus className="text-white" />
            </div>
          </Marker>
        </Map>
      )}
      
      {/* Legend */}
      {showTraffic && (
        <div className="absolute bottom-4 right-4 bg-white rounded-md shadow-md p-3 z-10">
          <h4 className="font-semibold text-sm mb-2">Traffic Levels</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs">Low Traffic</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-xs">Medium Traffic</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
              <span className="text-xs">High Traffic</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteVisualizer;