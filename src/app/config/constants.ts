// Environmental constants
export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY";

// Application routes
export const APP_ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  TRACKING: "/tracking",
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  DASHBOARD: "/dashboard",
};

// Bus status options
export const BUS_STATUS = {
  ON_TIME: "On Time",
  DELAYED: "Delayed",
  ARRIVED: "Arrived",
  DEPARTED: "Departed",
};

// Application constants
export const APP_CONSTANTS = {
  BUS_REFRESH_INTERVAL: 30000, // Refresh bus location every 30 seconds
  DEFAULT_ZOOM: 13,
  KIGALI_CENTER: { lat: -1.9441, lng: 30.0619 },
};

// Sample routes data - this would come from an API in production
export const SAMPLE_ROUTES = [
  {
    id: "route-1",
    name: "Rapid Arrival Bus",
    color: "#2980b9", // Primary blue
    path: [
      { lat: -1.9500, lng: 30.0400 }, // Start - Nyabugogo
      { lat: -1.9450, lng: 30.0500 },
      { lat: -1.9400, lng: 30.0600 },
      { lat: -1.9380, lng: 30.0700 },
      { lat: -1.9350, lng: 30.0800 }, // End - Kacyiru
    ],
    stops: [
      { name: "Nyabugogo Terminal", position: { lat: -1.9500, lng: 30.0400 } },
      { name: "Kigali Heights", position: { lat: -1.9420, lng: 30.0580 } },
      { name: "Kacyiru Bus Stop", position: { lat: -1.9350, lng: 30.0800 } },
    ],
  },
  {
    id: "route-2",
    name: "Downtown Express",
    color: "#e74c3c", // Red
    path: [
      { lat: -1.9500, lng: 30.0400 }, // Start
      { lat: -1.9450, lng: 30.0450 },
      { lat: -1.9420, lng: 30.0580 },
      { lat: -1.9400, lng: 30.0650 },
      { lat: -1.9380, lng: 30.0700 }, // End
    ],
  },
];

// Sample buses data - this would come from an API in production
export const SAMPLE_BUSES = [
  {
    id: "Bus-01",
    routeId: "route-1",
    position: { lat: -1.9450, lng: 30.0500 },
    driver: "Driver Name",
    phone: "+250 780 000 000",
    distance: "20km away from bus stop",
    eta: "15 minutes",
    capacity: 40,
    occupancy: 25,
  },
  {
    id: "Bus-02",
    routeId: "route-2",
    position: { lat: -1.9450, lng: 30.0450 },
    driver: "John Doe",
    phone: "+250 780 111 111",
    distance: "5km away from bus stop",
    eta: "7 minutes",
    capacity: 40,
    occupancy: 32,
  },
];
