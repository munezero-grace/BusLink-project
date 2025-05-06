'use client';

import { useState, useEffect } from 'react';
import { 
  FaChartBar, 
  FaCalendarAlt, 
  FaChevronLeft, 
  FaChevronRight,
  FaCarAlt,
  FaRoad,
  FaTachometerAlt,
  FaUserFriends
} from 'react-icons/fa';

// Import custom chart component
import DailyReportChart from '@/app/components/driver/DailyReportChart';

// Define types for driver daily report
interface AlertData {
  type: string;
  count: number;
  color: string;
}

interface DailyStats {
  date: string;
  formattedDate: string;
  totalTrips: number;
  totalDistance: number;
  highestSpeed: number;
  totalPassengers: number;
  alertsData: AlertData[];
  alertsByDay: {
    day: string;
    data: {
      [key: string]: number;
    };
  }[];
}

// Mock data - replace with API call in production
const generateMockData = (): Record<string, DailyStats> => {
  const alertTypes = [
    { type: 'Seat belt alerts', color: '#3b82f6' }, // blue
    { type: 'Harsh brake alerts', color: '#1e3a8a' }, // dark blue
    { type: 'Over speed alerts', color: '#10b981' }, // green
    { type: 'Car-idling alerts', color: '#334155' }  // slate gray
  ];
  
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  const mockData: Record<string, DailyStats> = {};
  
  // Generate data for last 10 days
  const today = new Date();
  for (let i = 0; i < 10; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    const dateStr = date.toISOString().split('T')[0];
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday
    
    // Generate random alert counts
    const alertsData = alertTypes.map(alertType => ({
      ...alertType,
      count: Math.floor(Math.random() * 5) // 0-4 alerts per type
    }));
    
    // Generate alerts for the week (for the graph)
    const alertsByDay = [];
    for (let j = 0; j < 7; j++) {
      const dayData: { [key: string]: number } = {};
      
      alertTypes.forEach(alertType => {
        // If it's the current day in the week, use the same counts as alertsData
        if (j === day) {
          const alert = alertsData.find(a => a.type === alertType.type);
          if (alert) {
            dayData[alertType.type] = alert.count;
          }
        } else {
          // Otherwise generate random counts
          dayData[alertType.type] = Math.floor(Math.random() * 5);
        }
      });
      
      alertsByDay.push({
        day: weekDays[j],
        data: dayData
      });
    }
    
    // Format date as "31 may 2023"
    const formattedDate = date.getDate() + ' ' + 
      date.toLocaleString('default', { month: 'long' }).toLowerCase() + ' ' +
      date.getFullYear();
    
    mockData[dateStr] = {
      date: dateStr,
      formattedDate,
      totalTrips: 5 + Math.floor(Math.random() * 5), // 5-9 trips
      totalDistance: 100 + Math.floor(Math.random() * 80), // 100-179 km
      highestSpeed: 75 + Math.floor(Math.random() * 25), // 75-99 km/h
      totalPassengers: 100 + Math.floor(Math.random() * 100), // 100-199 passengers
      alertsData,
      alertsByDay
    };
  }
  
  return mockData;
};

// Generate mock data once to ensure consistency
const mockDailyStats = generateMockData();

const DailyReport = () => {
  // Initialize with today's date
  const today = new Date().toISOString().split('T')[0];
  const [currentDate, setCurrentDate] = useState(today);
  const [dailyStats, setDailyStats] = useState<DailyStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call delay
    const fetchDailyStats = async () => {
      setIsLoading(true);
      // In production, this would be an API call
      setTimeout(() => {
        // If we don't have data for the current date, use the latest available date
        if (!mockDailyStats[currentDate]) {
          const availableDates = Object.keys(mockDailyStats).sort().reverse();
          if (availableDates.length > 0) {
            setCurrentDate(availableDates[0]);
            setDailyStats(mockDailyStats[availableDates[0]]);
          } else {
            setDailyStats(null);
          }
        } else {
          setDailyStats(mockDailyStats[currentDate]);
        }
        setIsLoading(false);
      }, 500);
    };
    
    fetchDailyStats();
  }, [currentDate]);
  
  // Handle date navigation
  const navigateDay = (direction: 'prev' | 'next') => {
    const currentDateObj = new Date(currentDate);
    const newDate = new Date(currentDateObj);
    
    if (direction === 'prev') {
      newDate.setDate(currentDateObj.getDate() - 1);
    } else {
      newDate.setDate(currentDateObj.getDate() + 1);
    }
    
    const newDateStr = newDate.toISOString().split('T')[0];
    
    // Check if we have data for this date or it's not in the future
    if (mockDailyStats[newDateStr] && newDate <= new Date()) {
      setCurrentDate(newDateStr);
    }
  };
  
  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <FaChartBar className="text-blue-600 mr-3" size={24} />
        <h1 className="text-2xl font-bold">Daily Report</h1>
      </div>
      
      {/* Date Navigation */}
      <div className="bg-white rounded-lg shadow mb-6 p-5">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => navigateDay('prev')}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Previous day"
          >
            <FaChevronLeft className="text-gray-600" />
          </button>
          
          <div className="flex items-center">
            <FaCalendarAlt className="text-blue-600 mr-2" />
            <span className="text-lg font-medium">{dailyStats?.formattedDate || currentDate}</span>
          </div>
          
          <button 
            onClick={() => navigateDay('next')}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Next day"
            disabled={new Date(currentDate) >= new Date()}
          >
            <FaChevronRight className={`${new Date(currentDate) >= new Date() ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading daily report...</p>
        </div>
      ) : dailyStats ? (
        <>
          {/* Alerts Graph Section */}
          <div className="bg-white rounded-lg shadow mb-6 p-5">
            <h2 className="text-lg font-semibold mb-4">
              {dailyStats.alertsData.reduce((sum, item) => sum + item.count, 0)} Alerts
            </h2>
            
            {/* Using our custom chart component */}
            <DailyReportChart 
              data={dailyStats.alertsByDay}
              legends={dailyStats.alertsData}
              highlightedDay={new Date(currentDate).getDay()} // 0-6 for Sunday-Saturday
            />
          </div>
          
          {/* Driver Stats Section */}
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-lg font-semibold mb-4">Driver Stats</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <div className="flex items-center">
                  <FaCarAlt className="text-blue-600 mr-3" />
                  <span>Total Trips :</span>
                </div>
                <span className="font-medium">{dailyStats.totalTrips}</span>
              </div>
              
              <div className="flex justify-between items-center border-b pb-3">
                <div className="flex items-center">
                  <FaRoad className="text-blue-600 mr-3" />
                  <span>Total distance Driven :</span>
                </div>
                <span className="font-medium">{dailyStats.totalDistance} km</span>
              </div>
              
              <div className="flex justify-between items-center border-b pb-3">
                <div className="flex items-center">
                  <FaTachometerAlt className="text-blue-600 mr-3" />
                  <span>Highest speed of all day :</span>
                </div>
                <span className="font-medium">{dailyStats.highestSpeed} km/h</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <FaUserFriends className="text-blue-600 mr-3" />
                  <span>Total passengers :</span>
                </div>
                <span className="font-medium">{dailyStats.totalPassengers}</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600">No data available for this date.</p>
        </div>
      )}
    </div>
  );
};

export default DailyReport;