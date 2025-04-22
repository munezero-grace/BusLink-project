'use client';

import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaChartBar } from 'react-icons/fa';

// Sample alert data
const alertsByDay = [
  { 
    day: 'S', 
    date: '28 may 2023',
    seatBeltAlerts: 1,
    overSpeedAlerts: 4,
    harshBrakeAlerts: 3,
    carIdlingAlerts: 2
  },
  { 
    day: 'M', 
    date: '29 may 2023',
    seatBeltAlerts: 1,
    overSpeedAlerts: 3,
    harshBrakeAlerts: 2,
    carIdlingAlerts: 1
  },
  { 
    day: 'T', 
    date: '30 may 2023',
    seatBeltAlerts: 0,
    overSpeedAlerts: 2,
    harshBrakeAlerts: 2,
    carIdlingAlerts: 1
  },
  { 
    day: 'W', 
    date: '31 may 2023',
    seatBeltAlerts: 1,
    overSpeedAlerts: 4,
    harshBrakeAlerts: 3,
    carIdlingAlerts: 2
  },
  { 
    day: 'T', 
    date: '1 june 2023',
    seatBeltAlerts: 1,
    overSpeedAlerts: 2,
    harshBrakeAlerts: 1,
    carIdlingAlerts: 0
  },
  { 
    day: 'F', 
    date: '2 june 2023',
    seatBeltAlerts: 1,
    overSpeedAlerts: 3,
    harshBrakeAlerts: 2,
    carIdlingAlerts: 1
  },
  { 
    day: 'S', 
    date: '3 june 2023',
    seatBeltAlerts: 1,
    overSpeedAlerts: 4,
    harshBrakeAlerts: 3,
    carIdlingAlerts: 0
  }
];

export default function DriverDashboard() {
  const [currentDate, setCurrentDate] = useState('31 may 2023');
  const [selectedDayIndex, setSelectedDayIndex] = useState(3); // Wednesday by default
  
  const selectedDay = alertsByDay[selectedDayIndex];
  const totalAlerts = 
    selectedDay.seatBeltAlerts + 
    selectedDay.overSpeedAlerts + 
    selectedDay.harshBrakeAlerts + 
    selectedDay.carIdlingAlerts;
    
  const goToPreviousDay = () => {
    if (selectedDayIndex > 0) {
      setSelectedDayIndex(selectedDayIndex - 1);
      setCurrentDate(alertsByDay[selectedDayIndex - 1].date);
    }
  };
  
  const goToNextDay = () => {
    if (selectedDayIndex < alertsByDay.length - 1) {
      setSelectedDayIndex(selectedDayIndex + 1);
      setCurrentDate(alertsByDay[selectedDayIndex + 1].date);
    }
  };

  // Calculate the max height for chart visualization (tallest bar)
  const maxBarHeight = Math.max(...alertsByDay.map(day => 
    day.seatBeltAlerts + day.overSpeedAlerts + day.harshBrakeAlerts + day.carIdlingAlerts
  ));

  return (
    <div className="w-full">
      {/* Daily Report Header */}
      <div className="bg-white rounded-full shadow-sm pl-4 pr-2 py-2 flex items-center mb-8 max-w-md">
        <FaChartBar className="text-gray-700 mr-2" />
        <h1 className="text-xl font-semibold text-gray-800">Daily Report</h1>
      </div>
      
      {/* Date Navigation */}
      <div className="bg-white rounded-full shadow-sm flex justify-between items-center max-w-md mx-auto mb-8">
        <button 
          onClick={goToPreviousDay}
          className="p-4 rounded-full hover:bg-gray-100 transition-colors"
        >
          <FaChevronLeft className="text-gray-700" />
        </button>
        <h2 className="text-lg font-medium text-gray-800">{currentDate}</h2>
        <button 
          onClick={goToNextDay}
          className="p-4 rounded-full hover:bg-gray-100 transition-colors"
        >
          <FaChevronRight className="text-gray-700" />
        </button>
      </div>
      
      {/* Alerts Count */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700">{totalAlerts} Alerts</h3>
      </div>
      
      {/* Chart Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-end mb-2 h-60 relative">
          {/* X-axis line */}
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-300"></div>
          
          {/* Chart Bars */}
          {alertsByDay.map((dayData, index) => {
            // Calculate heights for each alert type as percentage of the total height
            const totalDayAlerts = dayData.seatBeltAlerts + dayData.overSpeedAlerts + 
                                   dayData.harshBrakeAlerts + dayData.carIdlingAlerts;
            const barHeight = totalDayAlerts === 0 ? 0 : (totalDayAlerts / maxBarHeight) * 100;
            
            // Calculate individual segment heights
            const seatBeltHeight = (dayData.seatBeltAlerts / (totalDayAlerts || 1)) * barHeight;
            const overSpeedHeight = (dayData.overSpeedAlerts / (totalDayAlerts || 1)) * barHeight;
            const harshBrakeHeight = (dayData.harshBrakeAlerts / (totalDayAlerts || 1)) * barHeight;
            const carIdlingHeight = (dayData.carIdlingAlerts / (totalDayAlerts || 1)) * barHeight;
            
            return (
              <div 
                key={index}
                className={`flex flex-col justify-end items-center mx-2 ${index === selectedDayIndex ? 'opacity-100' : 'opacity-70'}`}
                style={{ width: '12%' }}
              >
                <div className="w-full flex flex-col-reverse">
                  {/* Car Idling Alerts */}
                  {dayData.carIdlingAlerts > 0 && (
                    <div 
                      className="w-full bg-gray-700"
                      style={{ height: `${carIdlingHeight}%` }}
                    ></div>
                  )}
                  
                  {/* Harsh Brake Alerts */}
                  {dayData.harshBrakeAlerts > 0 && (
                    <div 
                      className="w-full bg-primary-dark"
                      style={{ height: `${harshBrakeHeight}%` }}
                    ></div>
                  )}
                  
                  {/* Over Speed Alerts */}
                  {dayData.overSpeedAlerts > 0 && (
                    <div 
                      className="w-full bg-green-500"
                      style={{ height: `${overSpeedHeight}%` }}
                    ></div>
                  )}
                  
                  {/* Seat Belt Alerts */}
                  {dayData.seatBeltAlerts > 0 && (
                    <div 
                      className="w-full bg-blue-400"
                      style={{ height: `${seatBeltHeight}%` }}
                    ></div>
                  )}
                </div>
                
                {/* Day Label */}
                <div className="mt-4 text-lg font-medium text-gray-700">{dayData.day}</div>
              </div>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <div className="w-6 h-3 bg-blue-400 mr-2"></div>
            <span className="text-gray-700">Seat belt alerts -{selectedDay.seatBeltAlerts}</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-3 bg-primary-dark mr-2"></div>
            <span className="text-gray-700">Harsh brake alerts -{selectedDay.harshBrakeAlerts}</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-3 bg-green-500 mr-2"></div>
            <span className="text-gray-700">Over speed alerts -{selectedDay.overSpeedAlerts}</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-3 bg-gray-700 mr-2"></div>
            <span className="text-gray-700">Car-idling alerts -{selectedDay.carIdlingAlerts}</span>
          </div>
        </div>
      </div>
      
      {/* Driver Stats Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Driver Stats</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Trips :</span>
            <span className="font-medium">8</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total distance Driven :</span>
            <span className="font-medium">142 km</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Highest speed of all day :</span>
            <span className="font-medium">87 km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
}
