"use client";

import React, { useState } from "react";
import { 
  FaStar, 
  FaCalendarCheck, 
  FaCarCrash, 
  FaStopwatch, 
  FaChartLine,
  FaExclamationTriangle,
  FaAward,
  FaUserCheck
} from "react-icons/fa";
import Link from "next/link";

// Sample driver performance data
const initialDriversPerformance = [
  { 
    id: 1, 
    name: "Jeanclaude", 
    passengerRating: 4.8,
    scheduleAdherence: 97, // percentage
    safetyIncidents: 0,
    punctualityScore: 95, // percentage
    tripsCompleted: 230,
    complaintsReceived: 2,
    awards: ["Best Driver - March", "Perfect Attendance"],
    performanceStatus: "Excellent"
  },
  { 
    id: 2, 
    name: "Emmanuel", 
    passengerRating: 4.6,
    scheduleAdherence: 95, 
    safetyIncidents: 1,
    punctualityScore: 94,
    tripsCompleted: 210,
    complaintsReceived: 3,
    awards: ["Best Driver - January"],
    performanceStatus: "Good"
  },
  { 
    id: 3, 
    name: "David", 
    passengerRating: 4.2,
    scheduleAdherence: 92, 
    safetyIncidents: 1,
    punctualityScore: 90,
    tripsCompleted: 180,
    complaintsReceived: 5,
    awards: [],
    performanceStatus: "Good"
  },
  { 
    id: 6, 
    name: "Olivier", 
    passengerRating: 4.9,
    scheduleAdherence: 99, 
    safetyIncidents: 0,
    punctualityScore: 98,
    tripsCompleted: 250,
    complaintsReceived: 1,
    awards: ["Perfect Safety Record", "Driver of the Month - April"],
    performanceStatus: "Excellent"
  },
  { 
    id: 7, 
    name: "Patrick", 
    passengerRating: 3.7,
    scheduleAdherence: 88, 
    safetyIncidents: 2,
    punctualityScore: 85,
    tripsCompleted: 160,
    complaintsReceived: 8,
    awards: [],
    performanceStatus: "Needs Improvement"
  },
  { 
    id: 8, 
    name: "Eric", 
    passengerRating: 4.0,
    scheduleAdherence: 90, 
    safetyIncidents: 1,
    punctualityScore: 88,
    tripsCompleted: 175,
    complaintsReceived: 6,
    awards: [],
    performanceStatus: "Satisfactory"
  },
  { 
    id: 9, 
    name: "Jean", 
    passengerRating: 4.3,
    scheduleAdherence: 93, 
    safetyIncidents: 1,
    punctualityScore: 91,
    tripsCompleted: 190,
    complaintsReceived: 4,
    awards: [],
    performanceStatus: "Good"
  },
  { 
    id: 10, 
    name: "Paul", 
    passengerRating: 3.5,
    scheduleAdherence: 80, 
    safetyIncidents: 3,
    punctualityScore: 82,
    tripsCompleted: 145,
    complaintsReceived: 10,
    awards: [],
    performanceStatus: "Needs Improvement"
  },
];

export default function DriverPerformance() {
  const [driversPerformance, setDriversPerformance] = useState(initialDriversPerformance);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter drivers based on performance status and search term
  const filteredDrivers = driversPerformance.filter(driver => {
    const matchesFilter = selectedFilter === "All" || driver.performanceStatus === selectedFilter;
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Count drivers by performance status
  const excellentDrivers = driversPerformance.filter(driver => driver.performanceStatus === "Excellent").length;
  const goodDrivers = driversPerformance.filter(driver => driver.performanceStatus === "Good").length;
  const satisfactoryDrivers = driversPerformance.filter(driver => driver.performanceStatus === "Satisfactory").length;
  const improvementNeededDrivers = driversPerformance.filter(driver => driver.performanceStatus === "Needs Improvement").length;

  // Function to get color based on rating
  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "text-green-500";
    if (rating >= 4.0) return "text-blue-400";
    if (rating >= 3.5) return "text-yellow-400";
    return "text-red-500";
  };

  // Function to get color based on performance status
  const getStatusColor = (status) => {
    switch (status) {
      case "Excellent": return "bg-green-500";
      case "Good": return "bg-blue-400";
      case "Satisfactory": return "bg-yellow-400";
      case "Needs Improvement": return "bg-red-500";
      default: return "bg-gray-400";
    }
  };

  // Function to get color based on numerical value
  const getMetricColor = (value) => {
    if (value >= 95) return "text-green-500";
    if (value >= 90) return "text-blue-400";
    if (value >= 85) return "text-yellow-400";
    return "text-red-500";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Driver Performance Ratings</h1>
        <Link 
          href="/dashboard/admin/drivers" 
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Back to Drivers
        </Link>
      </div>

      {/* Performance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Excellent Performers */}
        <div className="bg-gray-800 rounded-lg p-4 flex justify-between items-center">
          <div>
            <p className="text-gray-300 font-medium">Excellent Performers</p>
            <p className="text-green-500 text-3xl font-bold">{excellentDrivers}</p>
          </div>
          <div className="bg-green-500 rounded-full p-2">
            <FaAward className="text-white text-xl" />
          </div>
        </div>

        {/* Good Performers */}
        <div className="bg-gray-800 rounded-lg p-4 flex justify-between items-center">
          <div>
            <p className="text-gray-300 font-medium">Good Performers</p>
            <p className="text-blue-400 text-3xl font-bold">{goodDrivers}</p>
          </div>
          <div className="bg-blue-400 rounded-full p-2">
            <FaUserCheck className="text-white text-xl" />
          </div>
        </div>

        {/* Satisfactory Performers */}
        <div className="bg-gray-800 rounded-lg p-4 flex justify-between items-center">
          <div>
            <p className="text-gray-300 font-medium">Satisfactory</p>
            <p className="text-yellow-400 text-3xl font-bold">{satisfactoryDrivers}</p>
          </div>
          <div className="bg-yellow-400 rounded-full p-2">
            <FaStopwatch className="text-white text-xl" />
          </div>
        </div>

        {/* Needs Improvement */}
        <div className="bg-gray-800 rounded-lg p-4 flex justify-between items-center">
          <div>
            <p className="text-gray-300 font-medium">Needs Improvement</p>
            <p className="text-red-500 text-3xl font-bold">{improvementNeededDrivers}</p>
          </div>
          <div className="bg-red-500 rounded-full p-2">
            <FaExclamationTriangle className="text-white text-xl" />
          </div>
        </div>
      </div>

      {/* Filter and Search Section */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 rounded-md ${selectedFilter === "All" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}`}
            onClick={() => setSelectedFilter("All")}
          >
            All
          </button>
          <button 
            className={`px-3 py-1 rounded-md ${selectedFilter === "Excellent" ? "bg-green-500 text-white" : "bg-gray-700 text-gray-300"}`}
            onClick={() => setSelectedFilter("Excellent")}
          >
            Excellent
          </button>
          <button 
            className={`px-3 py-1 rounded-md ${selectedFilter === "Good" ? "bg-blue-400 text-white" : "bg-gray-700 text-gray-300"}`}
            onClick={() => setSelectedFilter("Good")}
          >
            Good
          </button>
          <button 
            className={`px-3 py-1 rounded-md ${selectedFilter === "Satisfactory" ? "bg-yellow-400 text-white" : "bg-gray-700 text-gray-300"}`}
            onClick={() => setSelectedFilter("Satisfactory")}
          >
            Satisfactory
          </button>
          <button 
            className={`px-3 py-1 rounded-md ${selectedFilter === "Needs Improvement" ? "bg-red-500 text-white" : "bg-gray-700 text-gray-300"}`}
            onClick={() => setSelectedFilter("Needs Improvement")}
          >
            Needs Improvement
          </button>
        </div>
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Search by driver name..."
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Driver Performance Table */}
      <div className="overflow-x-auto bg-primary-dark rounded-lg">
        <table className="w-full text-white">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Passenger Rating</th>
              <th className="py-3 px-4 text-left">Schedule Adherence</th>
              <th className="py-3 px-4 text-left">Safety Record</th>
              <th className="py-3 px-4 text-left">Punctuality</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDrivers.map((driver) => (
              <tr key={driver.id} className="border-b border-gray-700 hover:bg-gray-800">
                <td className="py-4 px-4 font-medium">{driver.name}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <span className={`mr-2 ${getRatingColor(driver.passengerRating)} font-bold`}>
                      {driver.passengerRating.toFixed(1)}
                    </span>
                    <FaStar className={`${getRatingColor(driver.passengerRating)}`} />
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <span className={`mr-2 ${getMetricColor(driver.scheduleAdherence)} font-bold`}>
                      {driver.scheduleAdherence}%
                    </span>
                    <FaCalendarCheck className={`${getMetricColor(driver.scheduleAdherence)}`} />
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <span className={`mr-2 ${driver.safetyIncidents === 0 ? 'text-green-500' : driver.safetyIncidents <= 1 ? 'text-yellow-400' : 'text-red-500'} font-bold`}>
                      {driver.safetyIncidents} incidents
                    </span>
                    <FaCarCrash className={`${driver.safetyIncidents === 0 ? 'text-green-500' : driver.safetyIncidents <= 1 ? 'text-yellow-400' : 'text-red-500'}`} />
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <span className={`mr-2 ${getMetricColor(driver.punctualityScore)} font-bold`}>
                      {driver.punctualityScore}%
                    </span>
                    <FaStopwatch className={`${getMetricColor(driver.punctualityScore)}`} />
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(driver.performanceStatus)} text-white`}>
                    {driver.performanceStatus}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <Link 
                    href={`/dashboard/admin/drivers/performance/${driver.id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
