'use client';

import { useState, useEffect } from 'react';
import { FaGasPump, FaRoute, FaClock, FaLeaf, FaHistory, FaTachometerAlt, FaChartLine } from 'react-icons/fa';

// Define types
interface DailyEfficiency {
  date: string;
  fuelConsumption: number;
  distanceTraveled: number;
  idleTime: number;
  ecoScore: number;
}

interface VehicleEfficiencyData {
  vehicleId: string;
  vehiclePlate: string;
  vehicleModel: string;
  fuelLevel: number;
  fuelEfficiency: number;
  totalDistance: number;
  totalFuelUsed: number;
  idleTimePercentage: number;
  ecoScore: number;
  dailyRecords: DailyEfficiency[];
  maintenanceStatus: 'good' | 'attention' | 'service-required';
  maintenanceAlerts: string[];
}

// Mock data - replace with actual API call
const mockEfficiencyData: VehicleEfficiencyData = {
  vehicleId: 'BUS-123',
  vehiclePlate: 'RAC 123A',
  vehicleModel: 'Toyota Coaster 2020',
  fuelLevel: 65,
  fuelEfficiency: 8.2, // km/L
  totalDistance: 1250.8, // km
  totalFuelUsed: 152.5, // L
  idleTimePercentage: 12,
  ecoScore: 82, // out of 100
  dailyRecords: [
    { date: '2023-10-10', fuelConsumption: 21.5, distanceTraveled: 183.4, idleTime: 25, ecoScore: 79 },
    { date: '2023-10-11', fuelConsumption: 19.8, distanceTraveled: 172.6, idleTime: 18, ecoScore: 84 },
    { date: '2023-10-12', fuelConsumption: 22.3, distanceTraveled: 189.5, idleTime: 22, ecoScore: 81 },
    { date: '2023-10-13', fuelConsumption: 20.1, distanceTraveled: 175.3, idleTime: 15, ecoScore: 85 },
    { date: '2023-10-14', fuelConsumption: 23.5, distanceTraveled: 192.1, idleTime: 28, ecoScore: 78 },
    { date: '2023-10-15', fuelConsumption: 24.2, distanceTraveled: 195.6, idleTime: 20, ecoScore: 80 },
    { date: '2023-10-16', fuelConsumption: 21.1, distanceTraveled: 182.3, idleTime: 16, ecoScore: 83 },
  ],
  maintenanceStatus: 'good',
  maintenanceAlerts: []
};

const VehicleEfficiency = () => {
  const [efficiencyData, setEfficiencyData] = useState<VehicleEfficiencyData>(mockEfficiencyData);
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month'>('week');
  
  useEffect(() => {
    // In a real application, you would fetch vehicle efficiency data here
    // This would likely use the timeframe state to get data for different time periods
  }, [timeframe]);

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Vehicle Efficiency</h1>
          <p className="text-gray-600">{efficiencyData.vehiclePlate} - {efficiencyData.vehicleModel}</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex bg-white border rounded-md overflow-hidden">
          <button
            className={`px-3 py-2 ${timeframe === 'day' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setTimeframe('day')}
          >
            Day
          </button>
          <button
            className={`px-3 py-2 ${timeframe === 'week' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setTimeframe('week')}
          >
            Week
          </button>
          <button
            className={`px-3 py-2 ${timeframe === 'month' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setTimeframe('month')}
          >
            Month
          </button>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center mb-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <FaGasPump className="text-blue-600" size={18} />
            </div>
            <p className="text-sm text-gray-500">Fuel Efficiency</p>
          </div>
          <div className="flex items-end">
            <p className="text-2xl font-bold">{efficiencyData.fuelEfficiency}</p>
            <p className="text-sm text-gray-500 ml-1 mb-1">km/L</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center mb-3">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <FaLeaf className="text-green-600" size={18} />
            </div>
            <p className="text-sm text-gray-500">Eco Score</p>
          </div>
          <div className="flex items-end">
            <p className="text-2xl font-bold">{efficiencyData.ecoScore}</p>
            <p className="text-sm text-gray-500 ml-1 mb-1">/100</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center mb-3">
            <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
              <FaClock className="text-yellow-600" size={18} />
            </div>
            <p className="text-sm text-gray-500">Idle Time</p>
          </div>
          <div className="flex items-end">
            <p className="text-2xl font-bold">{efficiencyData.idleTimePercentage}</p>
            <p className="text-sm text-gray-500 ml-1 mb-1">%</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center mb-3">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
              <FaRoute className="text-purple-600" size={18} />
            </div>
            <p className="text-sm text-gray-500">Total Distance</p>
          </div>
          <div className="flex items-end">
            <p className="text-2xl font-bold">{efficiencyData.totalDistance.toFixed(1)}</p>
            <p className="text-sm text-gray-500 ml-1 mb-1">km</p>
          </div>
        </div>
      </div>
      
      {/* Fuel Level */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Fuel Level</h2>
        <div className="flex items-center mb-2">
          <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${
                efficiencyData.fuelLevel > 50 ? 'bg-green-500' :
                efficiencyData.fuelLevel > 25 ? 'bg-yellow-500' :
                'bg-red-500'
              }`}
              style={{ width: `${efficiencyData.fuelLevel}%` }}
            ></div>
          </div>
          <div className="ml-4 font-bold text-xl min-w-[60px]">{efficiencyData.fuelLevel}%</div>
        </div>
        <p className="text-gray-500 text-sm">Estimated range: 450 km</p>
      </div>
      
      {/* Efficiency Chart */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Efficiency Over Time</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Fuel</button>
            <button className="px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">Eco Score</button>
            <button className="px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">Idle Time</button>
          </div>
        </div>
        
        <div className="w-full h-48 bg-gray-50 rounded-lg p-4">
          {/* This would be a chart in a real implementation, using a library like Chart.js */}
          <div className="h-full flex items-end justify-between">
            {efficiencyData.dailyRecords.map((record, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="w-6 bg-blue-500 rounded-t"
                  style={{ 
                    height: `${(record.fuelConsumption / 30) * 100}%`,
                    maxHeight: '100%'
                  }}
                ></div>
                <div className="text-xs text-gray-500 mt-1">{new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Daily Records */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Daily Records</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distance (km)</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fuel (L)</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efficiency (km/L)</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Idle Time (min)</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Eco Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {efficiencyData.dailyRecords.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">
                    {new Date(record.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">{record.distanceTraveled.toFixed(1)}</td>
                  <td className="py-4 px-4 text-sm text-gray-500">{record.fuelConsumption.toFixed(1)}</td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {(record.distanceTraveled / record.fuelConsumption).toFixed(2)}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">{record.idleTime}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div 
                        className={`h-2 w-16 rounded-full ${
                          record.ecoScore >= 85 ? 'bg-green-500' :
                          record.ecoScore >= 75 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                      >
                        <div 
                          className="h-full bg-green-700 rounded-full"
                          style={{ width: `${record.ecoScore}%` }}
                        ></div>
                      </div>
                      <span className="ml-3 text-sm text-gray-500">{record.ecoScore}/100</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Maintenance Alerts */}
      {efficiencyData.maintenanceAlerts.length > 0 && (
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center">
            <FaExclamationTriangle className="mr-2" /> Maintenance Alerts
          </h2>
          <ul className="space-y-2">
            {efficiencyData.maintenanceAlerts.map((alert, index) => (
              <li key={index} className="flex items-start">
                <span className="h-5 w-5 text-yellow-500 mr-2">•</span>
                <span className="text-yellow-800">{alert}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VehicleEfficiency;