'use client';

import { useState, useEffect } from 'react';
import { FaTachometerAlt, FaClock, FaUsers, FaStar, FaExclamationTriangle, FaCalendarAlt } from 'react-icons/fa';

// Define types
interface SafetyMetric {
  count: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

interface SafetyEvents {
  suddenBraking: SafetyMetric;
  suddenAcceleration: SafetyMetric;
  overspeeding: SafetyMetric;
}

interface MonthlySummary {
  month: string;
  rating: number;
  trips: number;
}

interface Feedback {
  id: number;
  rating: number;
  comment: string;
  date: string;
}

interface PerformanceData {
  driverName: string;
  overallRating: number;
  safetyScore: number;
  punctualityScore: number;
  customerFeedback: number;
  totalTrips: number;
  totalPassengers: number;
  monthlySummary: MonthlySummary[];
  recentFeedback: Feedback[];
  safeDrivingEvents: SafetyEvents;
}

// Mock performance data - replace with actual API call
const mockPerformanceData: PerformanceData = {
  driverName: 'John Doe',
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

const PerformanceMetrics = () => {
  const [performanceData, setPerformanceData] = useState<PerformanceData>(mockPerformanceData);
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');
  
  useEffect(() => {
    // In a real application, you would fetch performance data here
    // This would likely use the timeframe state to get data for different time periods
  }, [timeframe]);

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-2 md:mb-0">Driver Performance</h1>
        
        <div className="flex bg-white border rounded-md overflow-hidden">
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
          <button
            className={`px-3 py-2 ${timeframe === 'year' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setTimeframe('year')}
          >
            Year
          </button>
        </div>
      </div>
      
      {/* Rating Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            <FaStar className="text-blue-600" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Overall Rating</p>
            <p className="text-2xl font-bold text-gray-800">{performanceData.overallRating}/5</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
            <FaTachometerAlt className="text-green-600" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Safety Score</p>
            <p className="text-2xl font-bold text-gray-800">{performanceData.safetyScore}%</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
            <FaClock className="text-purple-600" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Punctuality</p>
            <p className="text-2xl font-bold text-gray-800">{performanceData.punctualityScore}%</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
            <FaUsers className="text-yellow-600" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Passengers</p>
            <p className="text-2xl font-bold text-gray-800">{performanceData.totalPassengers}</p>
          </div>
        </div>
      </div>
      
      {/* Performance History */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Performance History</h2>
        <div className="w-full h-64 bg-gray-50 rounded-lg p-4">
          {/* This would be a chart in a real implementation, using a library like Chart.js */}
          <div className="h-full flex items-center justify-center">
            <div className="space-y-4 w-full">
              <div className="flex items-center">
                <div className="w-24 text-sm text-gray-600">Ratings</div>
                <div className="h-8 flex-grow bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(performanceData.overallRating / 5) * 100}%` }}
                  ></div>
                </div>
                <div className="w-12 text-right text-sm font-medium">{performanceData.overallRating}/5</div>
              </div>
              
              <div className="flex items-center">
                <div className="w-24 text-sm text-gray-600">Safety</div>
                <div className="h-8 flex-grow bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${performanceData.safetyScore}%` }}
                  ></div>
                </div>
                <div className="w-12 text-right text-sm font-medium">{performanceData.safetyScore}%</div>
              </div>
              
              <div className="flex items-center">
                <div className="w-24 text-sm text-gray-600">Punctuality</div>
                <div className="h-8 flex-grow bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${performanceData.punctualityScore}%` }}
                  ></div>
                </div>
                <div className="w-12 text-right text-sm font-medium">{performanceData.punctualityScore}%</div>
              </div>
              
              <div className="flex items-center">
                <div className="w-24 text-sm text-gray-600">Feedback</div>
                <div className="h-8 flex-grow bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-500 rounded-full"
                    style={{ width: `${(performanceData.customerFeedback / 5) * 100}%` }}
                  ></div>
                </div>
                <div className="w-12 text-right text-sm font-medium">{performanceData.customerFeedback}/5</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Safe Driving Metrics */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Safe Driving Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium">Sudden Braking</p>
              <div className={`px-2 py-1 rounded-full text-xs ${
                performanceData.safeDrivingEvents.suddenBraking.trend === 'decreasing' 
                  ? 'bg-green-100 text-green-800' 
                  : performanceData.safeDrivingEvents.suddenBraking.trend === 'increasing'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
              }`}>
                {performanceData.safeDrivingEvents.suddenBraking.trend}
              </div>
            </div>
            <div className="flex items-center">
              <FaExclamationTriangle className={`mr-2 ${
                performanceData.safeDrivingEvents.suddenBraking.count > 5 
                  ? 'text-red-500' 
                  : 'text-yellow-500'
              }`} />
              <span className="text-2xl font-bold">{performanceData.safeDrivingEvents.suddenBraking.count}</span>
              <span className="ml-2 text-gray-500">events this month</span>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium">Sudden Acceleration</p>
              <div className={`px-2 py-1 rounded-full text-xs ${
                performanceData.safeDrivingEvents.suddenAcceleration.trend === 'decreasing' 
                  ? 'bg-green-100 text-green-800' 
                  : performanceData.safeDrivingEvents.suddenAcceleration.trend === 'increasing'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
              }`}>
                {performanceData.safeDrivingEvents.suddenAcceleration.trend}
              </div>
            </div>
            <div className="flex items-center">
              <FaExclamationTriangle className={`mr-2 ${
                performanceData.safeDrivingEvents.suddenAcceleration.count > 5 
                  ? 'text-red-500' 
                  : 'text-yellow-500'
              }`} />
              <span className="text-2xl font-bold">{performanceData.safeDrivingEvents.suddenAcceleration.count}</span>
              <span className="ml-2 text-gray-500">events this month</span>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium">Overspeeding</p>
              <div className={`px-2 py-1 rounded-full text-xs ${
                performanceData.safeDrivingEvents.overspeeding.trend === 'decreasing' 
                  ? 'bg-green-100 text-green-800' 
                  : performanceData.safeDrivingEvents.overspeeding.trend === 'increasing'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
              }`}>
                {performanceData.safeDrivingEvents.overspeeding.trend}
              </div>
            </div>
            <div className="flex items-center">
              <FaExclamationTriangle className={`mr-2 ${
                performanceData.safeDrivingEvents.overspeeding.count > 2 
                  ? 'text-red-500' 
                  : 'text-yellow-500'
              }`} />
              <span className="text-2xl font-bold">{performanceData.safeDrivingEvents.overspeeding.count}</span>
              <span className="ml-2 text-gray-500">events this month</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Monthly Summary */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Monthly Performance</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trips</th>
                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {performanceData.monthlySummary.map((month, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">{month.month}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className="text-sm font-medium">{month.rating}</span>
                      <div className="ml-2 flex">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={i < Math.floor(month.rating) ? 'text-yellow-400' : 'text-gray-300'} 
                            size={12}
                          />
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{month.trips}</td>
                  <td className="py-3 px-4">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          month.rating >= 4.5 ? 'bg-green-500' :
                          month.rating >= 4.0 ? 'bg-blue-500' :
                          month.rating >= 3.0 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${(month.rating / 5) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Recent Feedback */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Passenger Feedback</h2>
        <div className="space-y-4">
          {performanceData.recentFeedback.map((feedback) => (
            <div key={feedback.id} className="border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-center mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">{feedback.date}</span>
              </div>
              <p className="text-gray-700">{feedback.comment}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <button className="text-primary hover:underline text-sm font-medium">
            View All Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;