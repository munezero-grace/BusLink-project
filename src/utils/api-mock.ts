// This file mocks API calls for development purposes
// In a production environment, these would be replaced with actual API calls

import { Alert, generateMockAlerts } from './alert-utils';

// Cache mock data to maintain consistency during a session
let cachedAlerts: Alert[] | null = null;

// Alert-related API functions
export const fetchAlerts = async (): Promise<Alert[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // If we have cached alerts, use them
  if (cachedAlerts) {
    return cachedAlerts;
  }
  
  // Otherwise, generate new mock alerts
  cachedAlerts = generateMockAlerts(12);
  return cachedAlerts;
};

export const markAlertAsRead = async (alertId: number): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (!cachedAlerts) {
    return false;
  }
  
  // Find and update the alert
  const alertIndex = cachedAlerts.findIndex(alert => alert.id === alertId);
  if (alertIndex === -1) {
    return false;
  }
  
  cachedAlerts[alertIndex] = {
    ...cachedAlerts[alertIndex],
    isRead: true
  };
  
  return true;
};

export const markAllAlertsAsRead = async (): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!cachedAlerts) {
    return false;
  }
  
  // Mark all alerts as read
  cachedAlerts = cachedAlerts.map(alert => ({
    ...alert,
    isRead: true
  }));
  
  return true;
};

// Driver performance API functions
export const fetchDriverPerformance = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    overallRating: 4.7,
    safetyScore: 92,
    punctualityScore: 88,
    customerFeedback: 4.5,
    totalTrips: 156,
    totalPassengers: 2340,
    monthlySummary: [
      { month: 'Jan', rating: 4.6, trips: 22 },
      { month: 'Feb', rating: 4.5, trips: 20 },
      { month: 'Mar', rating: 4.7, trips: 24 },
      { month: 'Apr', rating: 4.8, trips: 18 },
      { month: 'May', rating: 4.6, trips: 21 },
      { month: 'Jun', rating: 4.9, trips: 19 },
    ],
    recentFeedback: [
      { id: 1, rating: 5, comment: 'Very professional and punctual driver!', date: '2023-10-14' },
      { id: 2, rating: 4, comment: 'Good service, but driving was a bit fast at times.', date: '2023-10-10' },
      { id: 3, rating: 5, comment: 'Excellent service and very polite.', date: '2023-10-05' },
    ],
    safeDrivingEvents: {
      suddenBraking: { count: 3, trend: 'decreasing' },
      suddenAcceleration: { count: 2, trend: 'stable' },
      overspeeding: { count: 1, trend: 'decreasing' },
    }
  };
};

// Vehicle-related API functions
export const fetchVehicleData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return {
    vehicleId: 'BUS-123',
    vehiclePlate: 'RAC 123A',
    vehicleModel: 'Toyota Coaster 2020',
    fuelLevel: 65,
    fuelEfficiency: 8.2,
    totalDistance: 1250.8,
    totalFuelUsed: 152.5,
    idleTimePercentage: 12,
    ecoScore: 82,
    maintenanceStatus: 'good',
    maintenanceAlerts: []
  };
};

// Schedule-related API functions
export const fetchDriverSchedule = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    { 
      id: 1, 
      startTime: '08:00', 
      endTime: '09:45', 
      route: 'Kigali - Nyamata', 
      stops: 5, 
      passengers: 18, 
      capacity: 30, 
      status: 'completed' 
    },
    { 
      id: 2, 
      startTime: '10:30', 
      endTime: '12:15', 
      route: 'Nyamata - Kigali', 
      stops: 5, 
      passengers: 22, 
      capacity: 30, 
      status: 'in-progress' 
    },
    { 
      id: 3, 
      startTime: '14:00', 
      endTime: '15:45', 
      route: 'Kigali - Nyamata', 
      stops: 5, 
      passengers: 12, 
      capacity: 30, 
      status: 'upcoming' 
    },
    { 
      id: 4, 
      startTime: '16:30', 
      endTime: '18:15', 
      route: 'Nyamata - Kigali', 
      stops: 5, 
      passengers: 8, 
      capacity: 30, 
      status: 'upcoming' 
    },
  ];
};

// The functions can be expanded as needed for different parts of the application