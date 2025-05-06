'use client';

import React from 'react';
import { FaTicketAlt, FaRoute, FaBus, FaMapMarkerAlt, FaCalendarAlt, FaHistory, FaClock } from 'react-icons/fa';
import Link from 'next/link';

export default function UserDashboard() {
  // Mock data for upcoming trips
  const upcomingTrips = [
    {
      id: 1,
      from: 'Kigali Heights',
      to: 'Kimironko',
      date: 'May 10, 2025',
      time: '10:30 AM',
      busNumber: 'KH-102',
      status: 'Confirmed'
    },
    {
      id: 2,
      from: 'Nyabugogo',
      to: 'Kacyiru',
      date: 'May 15, 2025',
      time: '08:15 AM',
      busNumber: 'NB-205',
      status: 'Pending'
    }
  ];

  // Mock data for recent routes
  const recentRoutes = [
    { id: 1, name: 'Downtown - Kimironko', frequency: 'Daily' },
    { id: 2, name: 'Nyabugogo - Remera', frequency: 'Weekly' },
    { id: 3, name: 'Kacyiru - Downtown', frequency: 'Monthly' }
  ];

  // Mock data for travel history
  const travelHistory = [
    {
      id: 1,
      from: 'Gikondo',
      to: 'Kigali Heights',
      date: 'May 1, 2025',
      rating: 4
    },
    {
      id: 2,
      from: 'Nyamirambo',
      to: 'Nyabugogo',
      date: 'April 25, 2025',
      rating: 5
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-3">Welcome back, John!</h2>
        <p className="text-gray-600">
          Track your bus bookings, manage your trips, and explore new routes all in one place.
        </p>
        <div className="mt-4">
          <Link 
            href="/booking" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            <FaTicketAlt /> Book a New Trip
          </Link>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 mb-1">Total Trips</p>
              <h3 className="text-2xl font-bold">24</h3>
            </div>
            <div className="bg-primary/10 p-3 rounded-full text-primary">
              <FaHistory size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 mb-1">Saved Routes</p>
              <h3 className="text-2xl font-bold">5</h3>
            </div>
            <div className="bg-primary/10 p-3 rounded-full text-primary">
              <FaRoute size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 mb-1">Payment Methods</p>
              <h3 className="text-2xl font-bold">2</h3>
            </div>
            <div className="bg-primary/10 p-3 rounded-full text-primary">
              <FaTicketAlt size={24} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Upcoming Trips */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Upcoming Trips</h2>
          <Link href="/dashboard/user/bookings" className="text-primary text-sm hover:underline">
            View All
          </Link>
        </div>
        <div className="p-5">
          {upcomingTrips.length > 0 ? (
            <div className="space-y-4">
              {upcomingTrips.map(trip => (
                <div key={trip.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FaBus className="text-primary" />
                      <span className="font-medium">{trip.busNumber}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      trip.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {trip.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-gray-400" size={12} />
                        <span className="text-sm">{trip.from}</span>
                      </div>
                      <div className="h-5 border-l border-dashed border-gray-300 ml-1.5"></div>
                      <div className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-primary" size={12} />
                        <span className="text-sm">{trip.to}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1 text-sm">
                        <FaCalendarAlt className="text-gray-400" size={12} />
                        <span>{trip.date}</span>
                      </div>
                      <div className="flex items-center justify-end gap-1 text-sm">
                        <FaClock className="text-gray-400" size={12} />
                        <span>{trip.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">You don't have any upcoming trips</p>
              <Link 
                href="/booking" 
                className="mt-3 inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              >
                Book Now
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Routes */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-5 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Recent Routes</h2>
            <Link href="/dashboard/user/routes" className="text-primary text-sm hover:underline">
              View All
            </Link>
          </div>
          <div className="p-5">
            {recentRoutes.map(route => (
              <div key={route.id} className="flex justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-2">
                  <FaRoute className="text-primary" />
                  <span className="font-medium">{route.name}</span>
                </div>
                <span className="text-sm text-gray-500">{route.frequency}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Travel History */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-5 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Travel History</h2>
            <Link href="/dashboard/user/history" className="text-primary text-sm hover:underline">
              View All
            </Link>
          </div>
          <div className="p-5">
            {travelHistory.map(trip => (
              <div key={trip.id} className="py-3 border-b border-gray-100 last:border-0">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{trip.from} to {trip.to}</span>
                  <span className="text-sm text-gray-500">{trip.date}</span>
                </div>
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < trip.rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-2">(Your rating)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/tracking" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors">
            <div className="bg-primary/10 p-3 rounded-full text-primary mb-2">
              <FaBus size={20} />
            </div>
            <span className="text-center">Track Bus</span>
          </Link>
          <Link href="/schedules" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors">
            <div className="bg-primary/10 p-3 rounded-full text-primary mb-2">
              <FaClock size={20} />
            </div>
            <span className="text-center">Bus Schedules</span>
          </Link>
          <Link href="/dashboard/user/payment" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors">
            <div className="bg-primary/10 p-3 rounded-full text-primary mb-2">
              <FaTicketAlt size={20} />
            </div>
            <span className="text-center">Manage Payments</span>
          </Link>
          <Link href="/dashboard/user/profile" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors">
            <div className="bg-primary/10 p-3 rounded-full text-primary mb-2">
              <FaMapMarkerAlt size={20} />
            </div>
            <span className="text-center">Update Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
