'use client';

import React, { useState } from 'react';
import { FaBus, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaDownload, FaStar, FaRegStar } from 'react-icons/fa';

export default function TravelHistory() {
  // State for date range filter
  const [dateRange, setDateRange] = useState('all');
  
  // Mock data for travel history
  const historyData = [
    {
      id: 1,
      from: 'Gikondo',
      to: 'Kigali Heights',
      date: 'May 1, 2025',
      time: '09:20 AM',
      busNumber: 'GK-101',
      price: '1,500 RWF',
      rating: 4,
      driverName: 'Emmanuel K.',
      feedback: 'Good experience, bus was clean and on time.'
    },
    {
      id: 2,
      from: 'Nyamirambo',
      to: 'Nyabugogo',
      date: 'April 25, 2025',
      time: '13:45 PM',
      busNumber: 'NM-203',
      price: '1,200 RWF',
      rating: 5,
      driverName: 'Pascal N.',
      feedback: 'Excellent service, very comfortable ride.'
    },
    {
      id: 3,
      from: 'Kimironko',
      to: 'Downtown',
      date: 'April 12, 2025',
      time: '10:30 AM',
      busNumber: 'KM-305',
      price: '1,400 RWF',
      rating: 3,
      driverName: 'James R.',
      feedback: 'Bus was a bit late, but the journey was comfortable.'
    },
    {
      id: 4,
      from: 'Remera',
      to: 'Kacyiru',
      date: 'March 28, 2025',
      time: '08:15 AM',
      busNumber: 'RM-102',
      price: '1,000 RWF',
      rating: 4,
      driverName: 'Alice M.',
      feedback: 'Good driver, safe journey.'
    },
    {
      id: 5,
      from: 'Kigali Heights',
      to: 'Nyabugogo',
      date: 'March 15, 2025',
      time: '16:45 PM',
      busNumber: 'KH-209',
      price: '1,300 RWF',
      rating: 2,
      driverName: 'Peter K.',
      feedback: 'Bus was very crowded and delayed by 20 minutes.'
    }
  ];

  // Filter history based on date range
  const filteredHistory = () => {
    if (dateRange === 'all') return historyData;
    
    const today = new Date();
    let compareDate = new Date();
    
    switch(dateRange) {
      case 'month':
        compareDate.setMonth(today.getMonth() - 1);
        break;
      case '3months':
        compareDate.setMonth(today.getMonth() - 3);
        break;
      case '6months':
        compareDate.setMonth(today.getMonth() - 6);
        break;
      default:
        return historyData;
    }
    
    // This is a simplified filter for mock data
    // In a real app, you would parse the dates and compare them properly
    if (dateRange === 'month') {
      return historyData.filter(item => !item.date.includes('March'));
    } else if (dateRange === '3months') {
      return historyData;
    } else if (dateRange === '6months') {
      return historyData;
    }
    
    return historyData;
  };

  // Render star rating
  const renderRating = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <span key={i}>
            {i < rating ? <FaStar className="text-yellow-500" /> : <FaRegStar className="text-gray-300" />}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Travel History</h1>
        <button 
          onClick={() => alert('Downloading travel history...')}
          className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors flex items-center gap-2"
        >
          <FaDownload /> Export History
        </button>
      </div>
      
      {/* Date Range Filter */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-medium mb-3">Filter by Date</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => setDateRange('all')}
            className={`px-4 py-2 rounded-md ${
              dateRange === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Time
          </button>
          <button
            onClick={() => setDateRange('month')}
            className={`px-4 py-2 rounded-md ${
              dateRange === 'month'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Last Month
          </button>
          <button
            onClick={() => setDateRange('3months')}
            className={`px-4 py-2 rounded-md ${
              dateRange === '3months'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Last 3 Months
          </button>
          <button
            onClick={() => setDateRange('6months')}
            className={`px-4 py-2 rounded-md ${
              dateRange === '6months'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Last 6 Months
          </button>
        </div>
      </div>
      
      {/* History List */}
      <div className="space-y-4">
        {filteredHistory().length > 0 ? (
          filteredHistory().map(trip => (
            <div key={trip.id} className="bg-white rounded-lg shadow p-5">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FaBus className="text-primary" />
                    <span className="font-medium">{trip.busNumber}</span>
                    <span className="text-gray-500 text-sm ml-2">Driver: {trip.driverName}</span>
                  </div>
                  
                  <div className="flex items-start mb-4">
                    <div className="mt-1">
                      <div className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-gray-400" size={14} />
                        <span className="text-gray-500">From:</span>
                      </div>
                      <div className="h-8 border-l border-dashed border-gray-300 ml-1.5 my-1"></div>
                      <div className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-primary" size={14} />
                        <span className="text-gray-500">To:</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">{trip.from}</p>
                      <div className="h-8"></div>
                      <p className="font-medium">{trip.to}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-gray-400" />
                      <span>{trip.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaClock className="text-gray-400" />
                      <span>{trip.time}</span>
                    </div>
                    <div className="text-gray-500">
                      Price: <span className="font-medium">{trip.price}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-4 flex flex-col gap-2">
                  <div>
                    <p className="text-gray-700 font-medium mb-1">Your Rating</p>
                    {renderRating(trip.rating)}
                  </div>
                  
                  <div>
                    <p className="text-gray-700 font-medium mb-1">Your Feedback</p>
                    <p className="text-gray-600 text-sm">{trip.feedback}</p>
                  </div>
                  
                  <div className="mt-2">
                    <button
                      onClick={() => alert('Ticket was sent to your email')} 
                      className="px-3 py-1.5 text-sm border border-primary text-primary rounded hover:bg-primary hover:text-white transition-colors"
                    >
                      View Receipt
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">No travel history found for the selected period</p>
          </div>
        )}
      </div>
    </div>
  );
}
