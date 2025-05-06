'use client';

import React, { useState, useEffect } from 'react';
import { FaGasPump, FaWrench, FaChartLine, FaCheckCircle, FaExclamationTriangle, FaTachometerAlt, FaRoad, FaClock, FaCalendarAlt, FaClipboardCheck, FaMapMarkedAlt, FaInfoCircle } from 'react-icons/fa';
import { fetchVehicleData } from '@/utils/api-mock';
import BusEfficiencyChart from '@/app/components/driver/BusEfficiencyChart';
import MaintenanceStatusCard from '@/app/components/driver/MaintenanceStatusCard';

// Types for our data
interface VehicleData {
  vehicleId: string;
  vehiclePlate: string;
  vehicleModel: string;
  fuelLevel: number;
  fuelEfficiency: number;
  totalDistance: number;
  totalFuelUsed: number;
  idleTimePercentage: number;
  ecoScore: number;
  maintenanceStatus: string;
  maintenanceAlerts: string[];
}

// Conversion to liters per 100km to miles per gallon
const convertToMPG = (lPer100km: number): number => {
  return 235.214 / lPer100km;
};

// Determine fuel efficiency class
const getFuelEfficiencyClass = (ecoScore: number): string => {
  if (ecoScore >= 85) return 'text-green-500';
  if (ecoScore >= 70) return 'text-yellow-500';
  return 'text-red-500';
};

export default function BusManagePage() {
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);
  const [showRefuelForm, setShowRefuelForm] = useState(false);
  
  // Fetch data
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchVehicleData();
        setVehicleData(data);
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Mocked maintenance history data
  const maintenanceHistory = [
    { date: '2025-04-15', type: 'Oil Change', note: 'Routine oil change and filter replacement', cost: 120 },
    { date: '2025-03-02', type: 'Brake Inspection', note: 'Brake pads replaced and system flushed', cost: 350 },
    { date: '2025-02-10', type: 'Tire Rotation', note: 'Rotation and pressure check', cost: 80 },
    { date: '2025-01-05', type: 'Full Service', note: 'Annual maintenance service', cost: 560 },
  ];
  
  // Fuel consumption history (mock data)
  const fuelHistory = [
    { date: '2025-04-25', amount: 40, cost: 120, odometer: 1250.8 },
    { date: '2025-04-18', amount: 38, cost: 114, odometer: 1130.2 },
    { date: '2025-04-11', amount: 42, cost: 126, odometer: 1005.6 },
    { date: '2025-04-04', amount: 35, cost: 105, odometer: 875.3 },
  ];
  
  // Helper function to render loading state
  const renderLoading = () => (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
  
  // Render fuel gauge
  const renderFuelGauge = (level: number) => {
    // Determine color based on fuel level
    let color = 'bg-green-500';
    if (level < 25) color = 'bg-red-500';
    else if (level < 50) color = 'bg-yellow-500';
    
    return (
      <div className="relative h-32 w-32 mx-auto">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-24 w-24 rounded-full bg-gray-200">
            <div className="h-20 w-20 rounded-full bg-white absolute top-2 left-2 flex items-center justify-center">
              <span className="text-2xl font-bold">{level}%</span>
            </div>
          </div>
        </div>
        <svg className="absolute inset-0" viewBox="0 0 100 100">
          <path 
            d="M50 10 A40 40 0 0 1 50 90" 
            fill="none" 
            stroke="#e5e7eb" 
            strokeWidth="10" 
            strokeLinecap="round"
          />
          <path 
            d="M50 10 A40 40 0 0 1 50 90" 
            fill="none" 
            stroke={color} 
            strokeWidth="10" 
            strokeLinecap="round"
            strokeDasharray={`${level * 1.26} 126`}
          />
        </svg>
      </div>
    );
  };
  
  // Render metrics grid
  const renderMetricsGrid = (data: VehicleData) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center mb-2">
          <FaGasPump className="text-primary mr-2" />
          <h3 className="font-semibold">Fuel Efficiency</h3>
        </div>
        <p className="text-2xl font-bold">{data.fuelEfficiency} L/100km</p>
        <p className="text-gray-500 text-sm">{convertToMPG(data.fuelEfficiency).toFixed(1)} MPG</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center mb-2">
          <FaRoad className="text-primary mr-2" />
          <h3 className="font-semibold">Total Distance</h3>
        </div>
        <p className="text-2xl font-bold">{data.totalDistance.toFixed(1)} km</p>
        <p className="text-gray-500 text-sm">Lifetime mileage</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center mb-2">
          <FaClock className="text-primary mr-2" />
          <h3 className="font-semibold">Idle Time</h3>
        </div>
        <p className="text-2xl font-bold">{data.idleTimePercentage}%</p>
        <p className="text-gray-500 text-sm">Of total engine time</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center mb-2">
          <FaChartLine className="text-primary mr-2" />
          <h3 className="font-semibold">Eco Score</h3>
        </div>
        <p className={`text-2xl font-bold ${getFuelEfficiencyClass(data.ecoScore)}`}>{data.ecoScore}/100</p>
        <p className="text-gray-500 text-sm">Overall efficiency rating</p>
      </div>
    </div>
  );
  
  // Maintenance request form
  const renderMaintenanceForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Request Maintenance</h3>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Maintenance Type</label>
            <select className="w-full border border-gray-300 rounded px-3 py-2">
              <option value="">Select Type</option>
              <option value="oil">Oil Change</option>
              <option value="tires">Tire Service</option>
              <option value="brakes">Brake Service</option>
              <option value="engine">Engine Service</option>
              <option value="general">General Inspection</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Priority</label>
            <select className="w-full border border-gray-300 rounded px-3 py-2">
              <option value="low">Low - Schedule for next regular maintenance</option>
              <option value="medium">Medium - Schedule within next week</option>
              <option value="high">High - Schedule as soon as possible</option>
              <option value="urgent">Urgent - Safety critical issue</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2 h-32"
              placeholder="Describe the issue or maintenance needed..."
            ></textarea>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowMaintenanceForm(false)}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                // Mock form submission
                setShowMaintenanceForm(false);
                alert('Maintenance request submitted!');
              }}
              className="px-4 py-2 bg-primary text-white rounded"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
  // Refuel log form
  const renderRefuelForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Log Refueling</h3>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded px-3 py-2"
              defaultValue={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Fuel Amount (Liters)</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="e.g. 40"
              min="1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Cost (USD)</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="e.g. 120"
              min="1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Odometer Reading (km)</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Current odometer reading"
              defaultValue={vehicleData?.totalDistance.toFixed(1)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Notes</label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2 h-20"
              placeholder="Any additional notes..."
            ></textarea>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowRefuelForm(false)}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                // Mock form submission
                setShowRefuelForm(false);
                alert('Refueling recorded!');
              }}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
  // Render different tabs
  const renderTabContent = () => {
    if (!vehicleData) return null;
    
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow col-span-1">
                <h3 className="font-semibold mb-4 text-center">Fuel Level</h3>
                {renderFuelGauge(vehicleData.fuelLevel)}
                <div className="mt-4 text-center">
                  <p className="text-gray-500">
                    Estimated Range: <span className="font-bold">450 km</span>
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow col-span-1 md:col-span-2">
                <h3 className="font-semibold mb-4">Vehicle Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 mb-1">Vehicle ID</p>
                    <p className="font-medium">{vehicleData.vehicleId}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">License Plate</p>
                    <p className="font-medium">{vehicleData.vehiclePlate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Model</p>
                    <p className="font-medium">{vehicleData.vehicleModel}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Maintenance Status</p>
                    <p className="font-medium flex items-center">
                      {vehicleData.maintenanceStatus === 'good' 
                        ? <><FaCheckCircle className="text-green-500 mr-1" /> Good</>
                        : <><FaExclamationTriangle className="text-red-500 mr-1" /> Needs Attention</>
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {renderMetricsGrid(vehicleData)}
            
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Efficiency Trends</h3>
                <div>
                  <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                    <option value="week">Last Week</option>
                    <option value="month" selected>Last Month</option>
                    <option value="quarter">Last 3 Months</option>
                  </select>
                </div>
              </div>
              <BusEfficiencyChart />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <button 
                  className="btn bg-primary hover:bg-primary-dark text-white p-2 rounded-lg flex items-center justify-center"
                  onClick={() => setShowMaintenanceForm(true)}
                >
                  <FaWrench className="mr-2" /> Request Maintenance
                </button>
                <button className="btn bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg flex items-center justify-center">
                  <FaTachometerAlt className="mr-2" /> Efficiency Report
                </button>
                <button 
                  className="btn bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg flex items-center justify-center"
                  onClick={() => setShowRefuelForm(true)}
                >
                  <FaGasPump className="mr-2" /> Log Refuel
                </button>
                <button className="btn bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg flex items-center justify-center">
                  <FaExclamationTriangle className="mr-2" /> Report Issue
                </button>
              </div>
            </div>
          </>
        );
        
      case 'maintenance':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-6 mb-6">
              <div className="col-span-1 md:col-span-4">
                <MaintenanceStatusCard />
              </div>
              <div className="col-span-1 md:col-span-3 bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-4">Upcoming Maintenance</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    <div className="flex items-start">
                      <FaWrench className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Oil Change Due</p>
                        <p className="text-gray-600 text-sm">Scheduled for: May 15, 2025</p>
                        <p className="text-gray-600 text-sm">Estimated cost: $120</p>
                        <div className="mt-2">
                          <button className="text-blue-600 text-sm font-medium hover:underline">
                            Reschedule
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                    <div className="flex items-start">
                      <FaClipboardCheck className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Annual Safety Inspection</p>
                        <p className="text-gray-600 text-sm">Due by: June 30, 2025</p>
                        <p className="text-gray-600 text-sm">Required for compliance</p>
                        <div className="mt-2">
                          <button className="text-blue-600 text-sm font-medium hover:underline">
                            Schedule Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Maintenance History</h3>
                <button className="text-blue-600 text-sm font-medium hover:underline flex items-center">
                  <FaInfoCircle className="mr-1" /> View Complete Service Records
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b text-left">Date</th>
                      <th className="py-2 px-4 border-b text-left">Type</th>
                      <th className="py-2 px-4 border-b text-left">Notes</th>
                      <th className="py-2 px-4 border-b text-left">Cost (USD)</th>
                      <th className="py-2 px-4 border-b text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {maintenanceHistory.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                        <td className="py-2 px-4 border-b">
                          <div className="flex items-center">
                            <FaCalendarAlt className="text-gray-400 mr-2" />
                            {item.date}
                          </div>
                        </td>
                        <td className="py-2 px-4 border-b">{item.type}</td>
                        <td className="py-2 px-4 border-b">{item.note}</td>
                        <td className="py-2 px-4 border-b">${item.cost}</td>
                        <td className="py-2 px-4 border-b">
                          <button className="text-blue-600 hover:underline text-sm">
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
        
      case 'fuel':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-4">Fuel Consumption Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Monthly Average</p>
                    <p className="text-xl font-bold">{vehicleData.fuelEfficiency} L/100km</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Total Fuel Used</p>
                    <p className="text-xl font-bold">{vehicleData.totalFuelUsed} L</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Current Fuel Level</p>
                    <p className="text-xl font-bold">{vehicleData.fuelLevel}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Eco Score</p>
                    <p className={`text-xl font-bold ${getFuelEfficiencyClass(vehicleData.ecoScore)}`}>
                      {vehicleData.ecoScore}/100
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-4">Fuel Efficiency Tips</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Maintain constant speed and avoid unnecessary acceleration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Reduce idle time by turning off engine when stopped for over 1 minute</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Ensure proper tire pressure for optimal fuel efficiency</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Plan routes to avoid traffic congestion and unnecessary stops</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Fuel Efficiency Trends</h3>
                <button 
                  className="btn bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg flex items-center text-sm"
                  onClick={() => setShowRefuelForm(true)}
                >
                  <FaGasPump className="mr-1" /> Log New Refuel
                </button>
              </div>
              <BusEfficiencyChart />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-4">Refueling History</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b text-left">Date</th>
                      <th className="py-2 px-4 border-b text-left">Amount (L)</th>
                      <th className="py-2 px-4 border-b text-left">Cost (USD)</th>
                      <th className="py-2 px-4 border-b text-left">Odometer (km)</th>
                      <th className="py-2 px-4 border-b text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fuelHistory.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                        <td className="py-2 px-4 border-b">{item.date}</td>
                        <td className="py-2 px-4 border-b">{item.amount}</td>
                        <td className="py-2 px-4 border-b">${item.cost}</td>
                        <td className="py-2 px-4 border-b">{item.odometer}</td>
                        <td className="py-2 px-4 border-b">
                          <button className="text-blue-600 hover:underline text-sm mr-2">
                            Edit
                          </button>
                          <button className="text-red-600 hover:underline text-sm">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-primary-dark">Bus Management</h1>
      
      {/* Tab Navigation */}
      <div className="flex border-b mb-6">
        <button 
          onClick={() => setActiveTab('overview')} 
          className={`py-2 px-4 font-medium ${activeTab === 'overview' 
            ? 'text-primary border-b-2 border-primary' 
            : 'text-gray-500 hover:text-primary'}`}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('maintenance')} 
          className={`py-2 px-4 font-medium ${activeTab === 'maintenance' 
            ? 'text-primary border-b-2 border-primary' 
            : 'text-gray-500 hover:text-primary'}`}
        >
          Maintenance
        </button>
        <button 
          onClick={() => setActiveTab('fuel')} 
          className={`py-2 px-4 font-medium ${activeTab === 'fuel' 
            ? 'text-primary border-b-2 border-primary' 
            : 'text-gray-500 hover:text-primary'}`}
        >
          Fuel Management
        </button>
      </div>
      
      {/* Main Content */}
      {isLoading ? renderLoading() : renderTabContent()}
      
      {/* Modals */}
      {showMaintenanceForm && renderMaintenanceForm()}
      {showRefuelForm && renderRefuelForm()}
    </div>
  );
}
