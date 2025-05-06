'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FaRoute, 
  FaUserFriends, 
  FaTachometerAlt, 
  FaGasPump, 
  FaCalendarDay,
  FaChartLine,
  FaInfoCircle,
  FaBell,
  FaClipboardList,
  FaChartBar
} from 'react-icons/fa';

// Import alerts components
import AlertsWidget from '@/app/components/driver/AlertsWidget';

// Import mock API
import { 
  fetchAlerts, 
  fetchDriverPerformance, 
  fetchVehicleData,
  fetchDriverSchedule
} from '@/utils/api-mock';

const DriverDashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [performanceData, setPerformanceData] = useState(null);
  const [vehicleData, setVehicleData] = useState(null);
  const [scheduleData, setScheduleData] = useState([]);
  const [isLoading, setIsLoading] = useState({
    alerts: true,
    performance: true,
    vehicle: true,
    schedule: true
  });
  
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Fetch alerts
        const alertsData = await fetchAlerts();
        setAlerts(alertsData);
        setIsLoading(prev => ({ ...prev, alerts: false }));
        
        // Fetch performance data
        const performance = await fetchDriverPerformance();
        setPerformanceData(performance);
        setIsLoading(prev => ({ ...prev, performance: false }));
        
        // Fetch vehicle data
        const vehicle = await fetchVehicleData();
        setVehicleData(vehicle);
        setIsLoading(prev => ({ ...prev, vehicle: false }));
        
        // Fetch schedule data
        const schedule = await fetchDriverSchedule();
        setScheduleData(schedule);
        setIsLoading(prev => ({ ...prev, schedule: false }));
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        // Set loading to false even on error to show error state
        setIsLoading({
          alerts: false,
          performance: false,
          vehicle: false,
          schedule: false
        });
      }
    };
    
    loadDashboardData();
  }, []);
  
  // Calculate summary data
  const currentTrip = scheduleData.find(trip => trip.status === 'in-progress');
  const totalPassengers = currentTrip ? currentTrip.passengers : 0;
  const totalCapacity = currentTrip ? currentTrip.capacity : 30;
  const fuelLevel = vehicleData ? vehicleData.fuelLevel : 0;
  const performanceScore = performanceData ? performanceData.safetyScore : 0;
  
  // Get current date formatted as "31 May 2023"
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold">Driver Dashboard</h1>
        
        {/* Quick Links */}
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <Link 
            href="/dashboard/driver/report" 
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md"
          >
            <FaChartBar className="mr-2" /> Daily Report
          </Link>
          <Link 
            href="/dashboard/driver/alerts" 
            className="flex items-center bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-2 rounded-md"
          >
            <FaBell className="mr-2" /> 
            Alerts
            {alerts.filter(a => !a.isRead).length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {alerts.filter(a => !a.isRead).length}
              </span>
            )}
          </Link>
        </div>
      </div>
      
      <div className="mb-4 text-sm text-gray-600">
        <span className="font-medium">{currentDate}</span> • Welcome back, John Driver
      </div>
      
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 border-t-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <FaRoute className="text-blue-500" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Current Route</p>
              <p className="font-bold">{currentTrip ? currentTrip.route : 'No active trip'}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border-t-4 border-green-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 mr-4">
              <FaUserFriends className="text-green-500" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Booked Passengers</p>
              <p className="font-bold">{totalPassengers} / {totalCapacity}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border-t-4 border-yellow-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 mr-4">
              <FaGasPump className="text-yellow-500" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Fuel Level</p>
              <div className="flex items-center">
                <span className="font-bold mr-2">{fuelLevel}%</span>
                <div className="w-16 h-2 bg-gray-200 rounded-full">
                  <div 
                    className={`h-2 rounded-full ${
                      fuelLevel > 50 ? 'bg-green-500' :
                      fuelLevel > 25 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${fuelLevel}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border-t-4 border-purple-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 mr-4">
              <FaTachometerAlt className="text-purple-500" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Performance Score</p>
              <div className="flex items-center">
                <span className="font-bold mr-2">{performanceScore}/100</span>
                <div className="w-16 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="bg-purple-500 h-2 rounded-full" 
                    style={{ width: `${performanceScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="bg-white rounded-lg shadow p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FaCalendarDay className="text-blue-500 mr-2" />
              <h2 className="text-lg font-semibold">Today's Schedule</h2>
            </div>
            <Link 
              href="/dashboard/driver/schedule" 
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              View Full Schedule
            </Link>
          </div>
          
          {isLoading.schedule ? (
            <div className="py-10 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading schedule...</p>
            </div>
          ) : scheduleData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stops</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Passengers</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {scheduleData.map((trip, index) => (
                    <tr 
                      key={trip.id} 
                      className={trip.status === 'in-progress' ? 'bg-blue-50' : trip.status === 'completed' ? 'bg-green-50' : ''}
                    >
                      <td className={`px-4 py-3 text-sm ${trip.status === 'in-progress' ? 'font-medium text-blue-600' : trip.status === 'completed' ? 'text-gray-600' : 'text-gray-500'}`}>
                        {trip.startTime} - {trip.endTime}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium">
                        {trip.route}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {trip.stops} stops
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {trip.passengers}/{trip.capacity}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          trip.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : trip.status === 'in-progress'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}>
                          {trip.status === 'completed' 
                            ? 'Completed' 
                            : trip.status === 'in-progress'
                              ? 'In Progress'
                              : 'Upcoming'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-10 text-center text-gray-500">
              <p>No schedule data available</p>
            </div>
          )}
        </div>
        
        {/* Alerts Widget */}
        <div className="lg:col-span-1">
          {isLoading.alerts ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading alerts...</p>
            </div>
          ) : alerts.length > 0 ? (
            <AlertsWidget alerts={alerts} limit={3} />
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <FaBell className="mx-auto text-gray-300 mb-2" size={32} />
              <h3 className="text-lg font-medium mb-1">No Alerts</h3>
              <p className="text-gray-600">You have no alerts at this time</p>
            </div>
          )}
        </div>
        
        {/* Performance Metrics */}
        <div className="bg-white rounded-lg shadow p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FaChartLine className="text-blue-500 mr-2" />
              <h2 className="text-lg font-semibold">Performance Metrics</h2>
            </div>
            <Link 
              href="/dashboard/driver/performance" 
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              View Details
            </Link>
          </div>
          
          {isLoading.performance ? (
            <div className="py-10 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading performance data...</p>
            </div>
          ) : performanceData ? (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Overall Rating</span>
                  <span className="text-sm font-medium">{performanceData.overallRating}/5.0</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(performanceData.overallRating / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Punctuality</span>
                  <span className="text-sm font-medium">{performanceData.punctualityScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${performanceData.punctualityScore}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Customer Feedback</span>
                  <span className="text-sm font-medium">{performanceData.customerFeedback}/5.0</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full" 
                    style={{ width: `${(performanceData.customerFeedback / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Safe Driving</span>
                  <span className="text-sm font-medium">{performanceData.safetyScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full" 
                    style={{ width: `${performanceData.safetyScore}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Recent Feedback */}
              {performanceData.recentFeedback && performanceData.recentFeedback.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <h3 className="text-sm font-medium mb-2">Recent Feedback</h3>
                  <div className="bg-gray-50 p-3 rounded-lg text-sm">
                    <div className="flex items-center mb-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i}
                            className={`w-3 h-3 ${i < performanceData.recentFeedback[0].rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-xs text-gray-500">{performanceData.recentFeedback[0].date}</span>
                    </div>
                    <p className="text-gray-700">{performanceData.recentFeedback[0].comment}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-10 text-center text-gray-500">
              <p>No performance data available</p>
            </div>
          )}
        </div>
        
        {/* Vehicle Information */}
        <div className="bg-white rounded-lg shadow p-5 lg:col-span-1">
          <div className="flex items-center mb-4">
            <FaInfoCircle className="text-blue-500 mr-2" />
            <h2 className="text-lg font-semibold">Vehicle Information</h2>
          </div>
          
          {isLoading.vehicle ? (
            <div className="py-10 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading vehicle data...</p>
            </div>
          ) : vehicleData ? (
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Vehicle ID</p>
                <p className="font-medium">{vehicleData.vehicleId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">License Plate</p>
                <p className="font-medium">{vehicleData.vehiclePlate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Model</p>
                <p className="font-medium">{vehicleData.vehicleModel}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Fuel Efficiency</p>
                <p className="font-medium">{vehicleData.fuelEfficiency} km/L</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Distance</p>
                <p className="font-medium">{vehicleData.totalDistance.toFixed(1)} km</p>
              </div>
              
              {/* Fuel gauge */}
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-1">Fuel Level</p>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      vehicleData.fuelLevel > 50 ? 'bg-green-500' :
                      vehicleData.fuelLevel > 25 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${vehicleData.fuelLevel}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Empty</span>
                  <span>Full</span>
                </div>
              </div>
              
              <div className="pt-2 flex space-x-2">
                <Link 
                  href="/dashboard/driver/vehicle-efficiency" 
                  className="text-blue-500 hover:text-blue-700 text-sm flex items-center"
                >
                  View Vehicle Efficiency
                </Link>
                <span className="text-gray-300">|</span>
                <Link 
                  href="/dashboard/driver/report" 
                  className="text-blue-500 hover:text-blue-700 text-sm flex items-center"
                >
                  View Daily Report
                </Link>
              </div>
            </div>
          ) : (
            <div className="py-10 text-center text-gray-500">
              <p>No vehicle data available</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <Link
          href="/dashboard/driver/passengers"
          className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center"
        >
          <div className="p-3 rounded-full bg-blue-100 mb-3">
            <FaUserFriends className="text-blue-600" size={20} />
          </div>
          <h3 className="font-medium">Manage Passengers</h3>
          <p className="text-sm text-gray-500 mt-1">View and manage bookings</p>
        </Link>
        
        <Link
          href="/dashboard/driver/report"
          className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center"
        >
          <div className="p-3 rounded-full bg-green-100 mb-3">
            <FaChartBar className="text-green-600" size={20} />
          </div>
          <h3 className="font-medium">Daily Report</h3>
          <p className="text-sm text-gray-500 mt-1">Check your driving stats</p>
        </Link>
        
        <Link
          href="/dashboard/driver/performance"
          className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center"
        >
          <div className="p-3 rounded-full bg-purple-100 mb-3">
            <FaChartLine className="text-purple-600" size={20} />
          </div>
          <h3 className="font-medium">Performance</h3>
          <p className="text-sm text-gray-500 mt-1">View detailed metrics</p>
        </Link>
        
        <Link
          href="/dashboard/driver/vehicle-efficiency"
          className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center"
        >
          <div className="p-3 rounded-full bg-yellow-100 mb-3">
            <FaGasPump className="text-yellow-600" size={20} />
          </div>
          <h3 className="font-medium">Vehicle Efficiency</h3>
          <p className="text-sm text-gray-500 mt-1">Track fuel and maintenance</p>
        </Link>
      </div>
    </div>
  );
};

export default DriverDashboard;