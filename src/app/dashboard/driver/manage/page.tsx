'use client';

import { useState, useEffect } from 'react';
import { 
  FaBus, 
  FaGasPump, 
  FaTachometerAlt, 
  FaOilCan,
  FaExclamationTriangle,
  FaWrench,
  FaClipboardCheck,
  FaRoad,
  FaChartLine,
  FaTimes,
  FaCheck
} from 'react-icons/fa';
import Link from 'next/link';

// Define types
interface Bus {
  id: string;
  plateNumber: string;
  model: string;
  manufactureYear: number;
  status: 'active' | 'maintenance' | 'inactive';
  fuelLevel: number;
  fuelEfficiency: number;
  totalDistance: number;
  lastMaintenance: string;
  nextMaintenance: string;
  maintenanceStatus: 'good' | 'upcoming' | 'overdue';
  engineOilStatus: 'good' | 'attention' | 'critical';
  tireStatus: 'good' | 'attention' | 'critical';
  brakeStatus: 'good' | 'attention' | 'critical';
  batteryStatus: 'good' | 'attention' | 'critical';
}

// Mock data
const mockBusData: Bus = {
  id: 'BUS-001',
  plateNumber: 'RAC 123A',
  model: 'Toyota Coaster',
  manufactureYear: 2020,
  status: 'active',
  fuelLevel: 65,
  fuelEfficiency: 8.5,
  totalDistance: 24568.5,
  lastMaintenance: '2023-04-15',
  nextMaintenance: '2023-07-15',
  maintenanceStatus: 'upcoming',
  engineOilStatus: 'good',
  tireStatus: 'attention',
  brakeStatus: 'good',
  batteryStatus: 'good'
};

// Mock daily efficiency data
const mockDailyEfficiency = [
  { day: 'Mon', km: 142, fuel: 16.8 },
  { day: 'Tue', km: 131, fuel: 15.2 },
  { day: 'Wed', km: 158, fuel: 18.1 },
  { day: 'Thu', km: 124, fuel: 14.5 },
  { day: 'Fri', km: 151, fuel: 17.2 },
  { day: 'Sat', km: 120, fuel: 14.2 },
  { day: 'Sun', km: 95, fuel: 11.5 }
];

// Function to check if maintenance is due soon
const getDaysUntilMaintenance = (nextMaintenanceDate: string): number => {
  const today = new Date();
  const nextDate = new Date(nextMaintenanceDate);
  const diffTime = nextDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const BusManage = () => {
  const [busData, setBusData] = useState<Bus | null>(null);
  const [loading, setLoading] = useState(true);
  const [refueling, setRefueling] = useState(false);
  const [refuelAmount, setRefuelAmount] = useState(0);
  const [reportMaintenanceIssue, setReportMaintenanceIssue] = useState(false);
  const [maintenanceIssue, setMaintenanceIssue] = useState('');
  const [issuePriority, setIssuePriority] = useState('medium');
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBusData(mockBusData);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Calculate days until next maintenance
  const daysUntilMaintenance = busData 
    ? getDaysUntilMaintenance(busData.nextMaintenance) 
    : 0;
  
  // Calculate average fuel efficiency
  const avgFuelEfficiency = mockDailyEfficiency.length > 0
    ? mockDailyEfficiency.reduce((sum, day) => sum + (day.km / day.fuel), 0) / mockDailyEfficiency.length
    : 0;
  
  // Handle refueling
  const handleRefuel = () => {
    if (!busData || refuelAmount <= 0) return;
    
    // Calculate new fuel level
    const newFuelLevel = Math.min(100, busData.fuelLevel + refuelAmount);
    
    // Update bus data
    setBusData({
      ...busData,
      fuelLevel: newFuelLevel
    });
    
    // Reset refueling state
    setRefueling(false);
    setRefuelAmount(0);
  };
  
  // Handle maintenance issue reporting
  const handleReportIssue = () => {
    if (!busData || !maintenanceIssue) return;
    
    // In a real application, this would send the issue to the backend
    console.log('Maintenance issue reported:', {
      busId: busData.id,
      issue: maintenanceIssue,
      priority: issuePriority
    });
    
    // Reset form
    setReportMaintenanceIssue(false);
    setMaintenanceIssue('');
    setIssuePriority('medium');
    
    // Show success message (in a real app)
    alert('Maintenance issue reported successfully!');
  };
  
  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-800';
      case 'attention':
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Bus Management</h1>
      
      {loading ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading bus information...</p>
        </div>
      ) : busData ? (
        <>
          {/* Bus Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 mr-3">
                  <FaBus className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Vehicle ID</p>
                  <p className="text-xl font-bold">{busData.id}</p>
                  <p className="text-xs text-gray-500">{busData.plateNumber} • {busData.model}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 mr-3">
                  <FaRoad className="text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Distance</p>
                  <p className="text-xl font-bold">{busData.totalDistance.toLocaleString()} km</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 mr-3">
                  <FaGasPump className="text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fuel Level</p>
                  <div className="flex items-center">
                    <p className="text-xl font-bold mr-2">{busData.fuelLevel}%</p>
                    <button 
                      onClick={() => setRefueling(true)}
                      className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                    >
                      Refuel
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-red-100 mr-3">
                  <FaWrench className="text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Next Maintenance</p>
                  <p className="text-xl font-bold">{daysUntilMaintenance} days</p>
                  <p className="text-xs text-gray-500">{busData.nextMaintenance}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Fuel Gauge */}
          <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Fuel Status</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <FaGasPump className={`mr-2 ${
                  busData.fuelLevel > 50 ? 'text-green-500' :
                  busData.fuelLevel > 25 ? 'text-yellow-500' : 'text-red-500'
                }`} />
                <span className="font-medium">Current Fuel Level</span>
              </div>
              <div className="w-full h-6 bg-gray-200 rounded-full mb-2">
                <div 
                  className={`h-6 rounded-full ${
                    busData.fuelLevel > 50 ? 'bg-green-500' :
                    busData.fuelLevel > 25 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${busData.fuelLevel}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Empty</span>
                <span>Full ({busData.fuelLevel}%)</span>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-md font-medium mb-2">Fuel Efficiency</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Current</p>
                        <p className="text-xl font-bold">{busData.fuelEfficiency.toFixed(1)} km/L</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Weekly Avg</p>
                        <p className="text-xl font-bold">{avgFuelEfficiency.toFixed(1)} km/L</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium mb-2">Weekly Consumption</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Distance</p>
                        <p className="text-xl font-bold">
                          {mockDailyEfficiency.reduce((sum, day) => sum + day.km, 0)} km
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Fuel Used</p>
                        <p className="text-xl font-bold">
                          {mockDailyEfficiency.reduce((sum, day) => sum + day.fuel, 0).toFixed(1)} L
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Maintenance Status */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Maintenance Status</h2>
              <button 
                onClick={() => setReportMaintenanceIssue(true)}
                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm flex items-center"
              >
                <FaExclamationTriangle className="mr-2" /> Report Issue
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Engine Oil</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeColor(busData.engineOilStatus)}`}>
                      {busData.engineOilStatus.charAt(0).toUpperCase() + busData.engineOilStatus.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center mt-3">
                    <FaOilCan className={`mr-2 ${
                      busData.engineOilStatus === 'good' ? 'text-green-500' :
                      busData.engineOilStatus === 'attention' ? 'text-yellow-500' : 'text-red-500'
                    }`} />
                    <span className="text-sm text-gray-600">Last changed: 3 weeks ago</span>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Tires</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeColor(busData.tireStatus)}`}>
                      {busData.tireStatus.charAt(0).toUpperCase() + busData.tireStatus.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center mt-3">
                    <FaExclamationTriangle className={`mr-2 ${
                      busData.tireStatus === 'good' ? 'text-green-500' :
                      busData.tireStatus === 'attention' ? 'text-yellow-500' : 'text-red-500'
                    }`} />
                    <span className="text-sm text-gray-600">Tire pressure check recommended</span>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Brakes</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeColor(busData.brakeStatus)}`}>
                      {busData.brakeStatus.charAt(0).toUpperCase() + busData.brakeStatus.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center mt-3">
                    <FaCheck className="mr-2 text-green-500" />
                    <span className="text-sm text-gray-600">Checked during last maintenance</span>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Battery</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeColor(busData.batteryStatus)}`}>
                      {busData.batteryStatus.charAt(0).toUpperCase() + busData.batteryStatus.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center mt-3">
                    <FaCheck className="mr-2 text-green-500" />
                    <span className="text-sm text-gray-600">Battery health optimal</span>
                  </div>
                </div>
              </div>
              
              {/* Maintenance Timeline */}
              <div className="mt-8">
                <h3 className="text-md font-medium mb-4">Maintenance Timeline</h3>
                <div className="relative">
                  <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  
                  <div className="relative z-10 mb-6">
                    <div className="flex items-center">
                      <div className="bg-blue-500 h-10 w-10 rounded-full flex items-center justify-center text-white">
                        <FaClipboardCheck />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <h4 className="font-medium">Last Maintenance</h4>
                          <span className="ml-2 px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span>
                        </div>
                        <p className="text-sm text-gray-500">{busData.lastMaintenance}</p>
                        <p className="text-sm text-gray-600 mt-1">Regular service including oil change, filter replacement, and safety checks.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center">
                      <div className="bg-yellow-500 h-10 w-10 rounded-full flex items-center justify-center text-white">
                        <FaClipboardCheck />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <h4 className="font-medium">Next Scheduled Maintenance</h4>
                          <span className="ml-2 px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                            {daysUntilMaintenance} days remaining
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{busData.nextMaintenance}</p>
                        <p className="text-sm text-gray-600 mt-1">Regular service including oil change, filter replacement, brake inspection, and tire rotation.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Daily Efficiency */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Daily Efficiency</h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                      <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distance (km)</th>
                      <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fuel Used (L)</th>
                      <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efficiency (km/L)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockDailyEfficiency.map((day, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-3 px-4">{day.day}</td>
                        <td className="py-3 px-4">{day.km}</td>
                        <td className="py-3 px-4">{day.fuel.toFixed(1)}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <span className="font-medium mr-2">{(day.km / day.fuel).toFixed(1)}</span>
                            <div className={`h-2 w-16 rounded-full ${
                              (day.km / day.fuel) > 8.5 ? 'bg-green-500' :
                              (day.km / day.fuel) > 7.5 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td className="py-3 px-4 font-medium">Weekly Total</td>
                      <td className="py-3 px-4 font-medium">
                        {mockDailyEfficiency.reduce((sum, day) => sum + day.km, 0)} km
                      </td>
                      <td className="py-3 px-4 font-medium">
                        {mockDailyEfficiency.reduce((sum, day) => sum + day.fuel, 0).toFixed(1)} L
                      </td>
                      <td className="py-3 px-4 font-medium">
                        {avgFuelEfficiency.toFixed(1)} km/L
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <FaBus className="mx-auto text-gray-300 mb-4" size={48} />
          <h2 className="text-xl font-medium text-gray-900 mb-2">No bus assigned</h2>
          <p className="text-gray-500">You do not have a bus assigned to you at the moment.</p>
        </div>
      )}
      
      {/* Refueling Modal */}
      {refueling && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Refuel Vehicle</h2>
              <button 
                onClick={() => setRefueling(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            <div className="mb-4">
              <p className="text-gray-600 mb-2">Current fuel level: <span className="font-medium">{busData?.fuelLevel}%</span></p>
              <div className="w-full h-4 bg-gray-200 rounded-full">
                <div 
                  className={`h-4 rounded-full ${
                    (busData?.fuelLevel || 0) > 50 ? 'bg-green-500' :
                    (busData?.fuelLevel || 0) > 25 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${busData?.fuelLevel || 0}%` }}
                ></div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Refuel Amount (%)
              </label>
              <input
                type="number"
                min="1"
                max={100 - (busData?.fuelLevel || 0)}
                value={refuelAmount}
                onChange={(e) => setRefuelAmount(Number(e.target.value))}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                New fuel level: <span className="font-medium">{(busData?.fuelLevel || 0) + refuelAmount}%</span>
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setRefueling(false)}
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleRefuel}
                disabled={refuelAmount <= 0 || refuelAmount > (100 - (busData?.fuelLevel || 0))}
                className={`px-4 py-2 rounded-md text-white ${
                  refuelAmount <= 0 || refuelAmount > (100 - (busData?.fuelLevel || 0))
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Confirm Refueling
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Report Maintenance Issue Modal */}
      {reportMaintenanceIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Report Maintenance Issue</h2>
              <button 
                onClick={() => setReportMaintenanceIssue(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bus ID
              </label>
              <input
                type="text"
                value={busData?.id || ''}
                disabled
                className="w-full p-2 border rounded-md bg-gray-50"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issue Description
              </label>
              <textarea
                value={maintenanceIssue}
                onChange={(e) => setMaintenanceIssue(e.target.value)}
                placeholder="Describe the issue in detail..."
                className="w-full p-2 border rounded-md h-32"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                value={issuePriority}
                onChange={(e) => setIssuePriority(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="low">Low - Can be addressed during next maintenance</option>
                <option value="medium">Medium - Should be checked soon</option>
                <option value="high">High - Requires immediate attention</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setReportMaintenanceIssue(false)}
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleReportIssue}
                disabled={!maintenanceIssue}
                className={`px-4 py-2 rounded-md text-white ${
                  !maintenanceIssue
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusManage;