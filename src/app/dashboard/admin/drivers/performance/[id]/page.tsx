"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  FaStar, 
  FaCalendarCheck, 
  FaCarCrash, 
  FaStopwatch, 
  FaChartLine,
  FaExclamationTriangle,
  FaAward,
  FaClock,
  FaRoad,
  FaUsers,
  FaComment,
  FaTrophy,
  FaArrowLeft
} from "react-icons/fa";

// Sample driver performance data - this would come from an API in a real application
const driversPerformanceData = [
  { 
    id: 1, 
    name: "Jeanclaude", 
    photo: "/drivers/driver1.jpg", // Placeholder path
    passengerRating: 4.8,
    scheduleAdherence: 97, // percentage
    safetyIncidents: 0,
    punctualityScore: 95, // percentage
    tripsCompleted: 230,
    totalTrips: 235,
    totalDistance: 12450, // in kilometers
    complaintsReceived: 2,
    complimentsReceived: 15,
    performanceStatus: "Excellent",
    awards: ["Best Driver - March", "Perfect Attendance"],
    monthlyRatings: [4.7, 4.8, 4.9, 4.8, 4.7, 4.8],
    monthlySafetyScore: [98, 99, 100, 100, 98, 97],
    recentFeedback: [
      { date: "2025-04-18", rating: 5, comment: "Very professional and courteous" },
      { date: "2025-04-15", rating: 5, comment: "Excellent driving, made us feel safe" },
      { date: "2025-04-12", rating: 4, comment: "Good service, but was a bit late" },
      { date: "2025-04-08", rating: 5, comment: "Best driver I've had in a long time" },
      { date: "2025-04-03", rating: 5, comment: "Very helpful with luggage" },
    ]
  },
  { 
    id: 2, 
    name: "Emmanuel", 
    photo: "/drivers/driver2.jpg", // Placeholder path
    passengerRating: 4.6,
    scheduleAdherence: 95, 
    safetyIncidents: 1,
    punctualityScore: 94,
    tripsCompleted: 210,
    totalTrips: 220,
    totalDistance: 11200, // in kilometers
    complaintsReceived: 3,
    complimentsReceived: 12,
    performanceStatus: "Good",
    awards: ["Best Driver - January"],
    monthlyRatings: [4.5, 4.6, 4.7, 4.6, 4.5, 4.6],
    monthlySafetyScore: [95, 96, 94, 97, 96, 95],
    recentFeedback: [
      { date: "2025-04-17", rating: 5, comment: "Very friendly and helpful" },
      { date: "2025-04-14", rating: 4, comment: "Good driving, smooth trip" },
      { date: "2025-04-10", rating: 4, comment: "Nice driver but was rushing a bit" },
      { date: "2025-04-05", rating: 5, comment: "Very accommodating with my elderly mother" },
      { date: "2025-04-01", rating: 5, comment: "Excellent service" },
    ]
  },
  { 
    id: 3, 
    name: "David", 
    photo: "/drivers/driver3.jpg", // Placeholder path
    passengerRating: 4.2,
    scheduleAdherence: 92, 
    safetyIncidents: 1,
    punctualityScore: 90,
    tripsCompleted: 180,
    totalTrips: 195,
    totalDistance: 9600, // in kilometers
    complaintsReceived: 5,
    complimentsReceived: 8,
    performanceStatus: "Good",
    awards: [],
    monthlyRatings: [4.0, 4.1, 4.3, 4.2, 4.3, 4.2],
    monthlySafetyScore: [90, 92, 93, 91, 90, 92],
    recentFeedback: [
      { date: "2025-04-16", rating: 4, comment: "Decent service, no complaints" },
      { date: "2025-04-13", rating: 3, comment: "Driving was a bit fast for my comfort" },
      { date: "2025-04-09", rating: 5, comment: "Very courteous and professional" },
      { date: "2025-04-04", rating: 4, comment: "Good driver overall" },
      { date: "2025-03-30", rating: 5, comment: "Helped with directions after dropping off" },
    ]
  },
  // Adding more sample data for other drivers
  { 
    id: 6, 
    name: "Olivier", 
    photo: "/drivers/driver4.jpg", // Placeholder path
    passengerRating: 4.9,
    scheduleAdherence: 99, 
    safetyIncidents: 0,
    punctualityScore: 98,
    tripsCompleted: 250,
    totalTrips: 252,
    totalDistance: 13450, // in kilometers
    complaintsReceived: 1,
    complimentsReceived: 20,
    performanceStatus: "Excellent",
    awards: ["Perfect Safety Record", "Driver of the Month - April"],
    monthlyRatings: [4.8, 4.9, 4.9, 4.9, 4.8, 4.9],
    monthlySafetyScore: [99, 100, 100, 99, 99, 100],
    recentFeedback: [
      { date: "2025-04-19", rating: 5, comment: "Exceptional service!" },
      { date: "2025-04-16", rating: 5, comment: "Best driver I've ever had" },
      { date: "2025-04-13", rating: 5, comment: "Extremely professional" },
      { date: "2025-04-10", rating: 5, comment: "Made us feel very safe and comfortable" },
      { date: "2025-04-07", rating: 5, comment: "Outstanding driver" },
    ]
  },
  { 
    id: 7, 
    name: "Patrick", 
    photo: "/drivers/driver5.jpg", // Placeholder path
    passengerRating: 3.7,
    scheduleAdherence: 88, 
    safetyIncidents: 2,
    punctualityScore: 85,
    tripsCompleted: 160,
    totalTrips: 180,
    totalDistance: 8500, // in kilometers
    complaintsReceived: 8,
    complimentsReceived: 5,
    performanceStatus: "Needs Improvement",
    awards: [],
    monthlyRatings: [3.5, 3.6, 3.8, 3.7, 3.6, 3.7],
    monthlySafetyScore: [85, 86, 84, 87, 86, 88],
    recentFeedback: [
      { date: "2025-04-18", rating: 3, comment: "Took a longer route than necessary" },
      { date: "2025-04-15", rating: 2, comment: "Was late and driving too fast" },
      { date: "2025-04-12", rating: 4, comment: "Better than last time I had him" },
      { date: "2025-04-09", rating: 4, comment: "Decent service" },
      { date: "2025-04-06", rating: 3, comment: "Not very friendly" },
    ]
  }
];

export default function DriverPerformanceDetail() {
  const router = useRouter();
  const params = useParams();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, this would be an API call
    if (params.id) {
      const driverData = driversPerformanceData.find(d => d.id === parseInt(params.id));
      
      if (driverData) {
        setDriver(driverData);
      }
      setLoading(false);
    }
  }, [params.id]);

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
      case "Excellent": return "bg-green-500 text-white";
      case "Good": return "bg-blue-400 text-white";
      case "Satisfactory": return "bg-yellow-400 text-white";
      case "Needs Improvement": return "bg-red-500 text-white";
      default: return "bg-gray-400 text-white";
    }
  };

  // Function to render star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          className={i <= Math.round(rating) ? "text-yellow-400" : "text-gray-400"} 
        />
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white">Loading driver data...</div>
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-white">Driver Not Found</h1>
          <Link 
            href="/dashboard/admin/drivers/performance" 
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back to Performance List
          </Link>
        </div>
        <p className="text-gray-300">The driver you are looking for could not be found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Driver Performance Details</h1>
        <Link 
          href="/dashboard/admin/drivers/performance" 
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back to Performance List
        </Link>
      </div>

      {/* Driver Profile Section */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-3xl font-bold text-blue-400">
            {driver.name.charAt(0)}
          </div>
          <div className="flex-grow">
            <h2 className="text-xl font-bold text-white">{driver.name}</h2>
            <div className="flex items-center mt-2">
              <div className="flex mr-4">
                {renderStars(driver.passengerRating)}
              </div>
              <span className={`${getRatingColor(driver.passengerRating)} text-lg font-bold`}>
                {driver.passengerRating.toFixed(1)}
              </span>
            </div>
          </div>
          <div>
            <span className={`px-4 py-2 rounded-md ${getStatusColor(driver.performanceStatus)}`}>
              {driver.performanceStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Performance Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Schedule Adherence Card */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-300 font-medium">Schedule Adherence</h3>
            <FaCalendarCheck className="text-blue-400 text-xl" />
          </div>
          <div className="mt-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Percentage</span>
              <span className="text-blue-400 font-bold">{driver.scheduleAdherence}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full mt-2">
              <div 
                className="bg-blue-400 h-2 rounded-full" 
                style={{ width: `${driver.scheduleAdherence}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Safety Record Card */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-300 font-medium">Safety Record</h3>
            <FaCarCrash className={driver.safetyIncidents === 0 ? "text-green-500 text-xl" : "text-red-500 text-xl"} />
          </div>
          <div className="mt-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Safety Incidents</span>
              <span className={driver.safetyIncidents === 0 ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
                {driver.safetyIncidents}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-300">Safety Rating</span>
              <span className="text-green-500 font-bold">
                {driver.monthlySafetyScore[driver.monthlySafetyScore.length - 1]}%
              </span>
            </div>
          </div>
        </div>

        {/* Punctuality Card */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-300 font-medium">Punctuality</h3>
            <FaStopwatch className="text-green-500 text-xl" />
          </div>
          <div className="mt-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Punctuality Score</span>
              <span className="text-green-500 font-bold">{driver.punctualityScore}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full mt-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${driver.punctualityScore}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Trip Stats Card */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-300 font-medium">Trip Statistics</h3>
            <FaRoad className="text-blue-400 text-xl" />
          </div>
          <div className="mt-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">Trips Completed</span>
              <span className="text-blue-400 font-bold">{driver.tripsCompleted}/{driver.totalTrips}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Total Distance</span>
              <span className="text-blue-400 font-bold">{driver.totalDistance.toLocaleString()} km</span>
            </div>
          </div>
        </div>

        {/* Feedback Stats Card */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-300 font-medium">Passenger Feedback</h3>
            <FaUsers className="text-yellow-400 text-xl" />
          </div>
          <div className="mt-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">Complaints</span>
              <span className="text-red-500 font-bold">{driver.complaintsReceived}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Compliments</span>
              <span className="text-green-500 font-bold">{driver.complimentsReceived}</span>
            </div>
          </div>
        </div>

        {/* Awards Card */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-300 font-medium">Awards & Recognition</h3>
            <FaTrophy className="text-yellow-400 text-xl" />
          </div>
          <div className="mt-2">
            {driver.awards.length > 0 ? (
              <ul className="space-y-2">
                {driver.awards.map((award, index) => (
                  <li key={index} className="flex items-center">
                    <FaAward className="text-yellow-400 mr-2" />
                    <span className="text-white">{award}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 italic">No awards received yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Feedback Section */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaComment className="mr-2 text-blue-400" /> Recent Passenger Feedback
        </h2>
        <div className="space-y-4">
          {driver.recentFeedback.map((feedback, index) => (
            <div key={index} className="border-b border-gray-700 pb-4 last:border-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {renderStars(feedback.rating)}
                  <span className="ml-2 text-gray-300 text-sm">{feedback.date}</span>
                </div>
              </div>
              <p className="mt-2 text-white">{feedback.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Over Time Section */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaChartLine className="mr-2 text-blue-400" /> Performance Over Time
        </h2>
        <div className="space-y-6">
          {/* Passenger Rating Trend */}
          <div>
            <h3 className="text-lg font-medium text-gray-300 mb-3">Passenger Rating (Last 6 Months)</h3>
            <div className="h-40 bg-gray-900 rounded-lg p-4 flex items-end justify-between">
              {driver.monthlyRatings.map((rating, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className={`w-8 ${getRatingColor(rating)}`} 
                    style={{ 
                      height: `${(rating / 5) * 100}%`,
                      minHeight: '10%'
                    }}
                  ></div>
                  <span className="text-xs text-gray-400 mt-2">Month {index + 1}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Safety Score Trend */}
          <div>
            <h3 className="text-lg font-medium text-gray-300 mb-3">Safety Score (Last 6 Months)</h3>
            <div className="h-40 bg-gray-900 rounded-lg p-4 flex items-end justify-between">
              {driver.monthlySafetyScore.map((score, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className={score >= 95 ? "w-8 bg-green-500" : score >= 90 ? "w-8 bg-blue-400" : "w-8 bg-yellow-400"} 
                    style={{ 
                      height: `${score}%`,
                      minHeight: '10%'
                    }}
                  ></div>
                  <span className="text-xs text-gray-400 mt-2">Month {index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}