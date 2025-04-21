'use client';

import React from 'react';
import { 
  FaUsers, 
  FaUserTie, 
  FaBus, 
  FaTicketAlt, 
  FaRoute, 
  FaCalendarAlt,
  FaMoneyBillWave, 
  FaChartLine,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';

export default function AdminDashboard() {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);
  
  return (
    <div>
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">WELCOME <span className="text-blue-500">Admin.</span></h1>
        <div className="h-1 w-full bg-gray-200 mt-2"></div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Passengers Card */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 flex justify-center">
            <FaUsers className="text-gray-700 text-4xl" />
          </div>
          <div className="bg-white text-center p-4">
            <h3 className="text-2xl font-bold text-gray-800">200</h3>
          </div>
          <div className="bg-gray-700 text-white text-center p-3">
            <h4 className="font-medium">Passengers</h4>
          </div>
        </div>
        
        {/* Admin Card */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 flex justify-center">
            <FaUserTie className="text-blue-500 text-4xl" />
          </div>
          <div className="bg-white text-center p-4">
            <h3 className="text-2xl font-bold text-gray-800">1</h3>
          </div>
          <div className="bg-blue-500 text-white text-center p-3">
            <h4 className="font-medium">Admin</h4>
          </div>
        </div>
        
        {/* Buses Card */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 flex justify-center">
            <FaBus className="text-gray-700 text-4xl" />
          </div>
          <div className="bg-white text-center p-4">
            <h3 className="text-2xl font-bold text-gray-800">30</h3>
          </div>
          <div className="bg-gray-700 text-white text-center p-3">
            <h4 className="font-medium">Buses</h4>
          </div>
        </div>
        
        {/* Bookings Card */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 flex justify-center">
            <FaTicketAlt className="text-gray-700 text-4xl" />
          </div>
          <div className="bg-white text-center p-4">
            <h3 className="text-2xl font-bold text-gray-800">40</h3>
          </div>
          <div className="bg-gray-700 text-white text-center p-3">
            <h4 className="font-medium">Bookings</h4>
          </div>
        </div>
      </div>
      
      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Routes Card */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 flex justify-center">
            <FaRoute className="text-gray-700 text-4xl" />
          </div>
          <div className="bg-white text-center p-4">
            <h3 className="text-2xl font-bold text-gray-800">15</h3>
          </div>
          <div className="bg-gray-700 text-white text-center p-3">
            <h4 className="font-medium">Routes</h4>
          </div>
        </div>
        
        {/* Date Card */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 flex justify-center">
            <FaCalendarAlt className="text-gray-700 text-4xl" />
          </div>
          <div className="bg-white text-center p-4">
            <h3 className="text-lg font-medium text-gray-800">{formattedDate}</h3>
          </div>
          <div className="bg-gray-700 text-white text-center p-3">
            <h4 className="font-medium">Date</h4>
          </div>
        </div>
        
        {/* Driver Report and Revenue Cards can be added here for 2 more cards */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 flex justify-center">
            <FaUserTie className="text-gray-700 text-4xl" />
          </div>
          <div className="bg-white text-center p-4">
            <h3 className="text-2xl font-bold text-gray-800">25</h3>
          </div>
          <div className="bg-gray-700 text-white text-center p-3">
            <h4 className="font-medium">Drivers</h4>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 flex justify-center">
            <FaMoneyBillWave className="text-green-600 text-4xl" />
          </div>
          <div className="bg-white text-center p-4">
            <h3 className="text-2xl font-bold text-gray-800">$1,230</h3>
          </div>
          <div className="bg-green-600 text-white text-center p-3">
            <h4 className="font-medium">Revenue</h4>
          </div>
        </div>
      </div>
      
      {/* Summary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Stats */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Traffic Statistics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Nyabugogo - Kacyiru</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <span className="text-blue-600 font-bold">85%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Remera - Downtown</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <span className="text-blue-600 font-bold">70%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Airport - City Center</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <span className="text-blue-600 font-bold">60%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Kimironko - Nyabugogo</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <span className="text-blue-600 font-bold">45%</span>
            </div>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-500">
                  <FaArrowUp className="h-4 w-4" />
                </span>
              </div>
              <div>
                <p className="font-medium">New booking</p>
                <p className="text-sm text-gray-500">John Doe booked a seat on Remera - Downtown route</p>
                <p className="text-xs text-gray-400">10 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-500">
                  <FaArrowDown className="h-4 w-4" />
                </span>
              </div>
              <div>
                <p className="font-medium">Driver reported late</p>
                <p className="text-sm text-gray-500">Bus-05 arrived 15 minutes late at Downtown stop</p>
                <p className="text-xs text-gray-400">45 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-500">
                  <FaChartLine className="h-4 w-4" />
                </span>
              </div>
              <div>
                <p className="font-medium">Traffic report updated</p>
                <p className="text-sm text-gray-500">Daily traffic report for all routes updated</p>
                <p className="text-xs text-gray-400">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-500">
                  <FaArrowUp className="h-4 w-4" />
                </span>
              </div>
              <div>
                <p className="font-medium">New driver added</p>
                <p className="text-sm text-gray-500">James Smith was added as a new driver</p>
                <p className="text-xs text-gray-400">5 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
