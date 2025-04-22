'use client';

import React, { useState } from 'react';
import { FaUser, FaCheck, FaTimes, FaSearch } from 'react-icons/fa';

// Sample passenger data
const initialPassengers = [
  { id: 1, name: 'John Doe', seatNumber: 'A1', origin: 'Kicukiro', destination: 'Nyabugogo', status: 'Checked In' },
  { id: 2, name: 'Jane Smith', seatNumber: 'A2', origin: 'Kicukiro', destination: 'Nyabugogo', status: 'Checked In' },
  { id: 3, name: 'James Johnson', seatNumber: 'A3', origin: 'Kicukiro', destination: 'Remera', status: 'Pending' },
  { id: 4, name: 'Emily Brown', seatNumber: 'B1', origin: 'Remera', destination: 'Nyabugogo', status: 'Checked In' },
  { id: 5, name: 'Robert Davis', seatNumber: 'B2', origin: 'Gatenga', destination: 'Sonatube', status: 'Pending' },
  { id: 6, name: 'Michael Wilson', seatNumber: 'B3', origin: 'Sonatube', destination: 'Nyabugogo', status: 'Checked In' },
  { id: 7, name: 'Sarah Taylor', seatNumber: 'C1', origin: 'Kicukiro', destination: 'Rwandex', status: 'Checked In' },
  { id: 8, name: 'Daniel Thomas', seatNumber: 'C2', origin: 'Rwandex', destination: 'Nyabugogo', status: 'Pending' },
  { id: 9, name: 'Jessica Robinson', seatNumber: 'C3', origin: 'Gatenga', destination: 'Rwandex', status: 'Checked In' },
  { id: 10, name: 'David Wilson', seatNumber: 'D1', origin: 'Kicukiro', destination: 'Nyabugogo', status: 'Pending' },
];

export default function PassengersPage() {
  const [passengers, setPassengers] = useState(initialPassengers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Filter passengers based on search term and status filter
  const filteredPassengers = passengers.filter(passenger => 
    (passenger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     passenger.seatNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
     passenger.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
     passenger.destination.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'All' || passenger.status === statusFilter)
  );
  
  // Counts for metrics
  const totalPassengers = passengers.length;
  const checkedInPassengers = passengers.filter(p => p.status === 'Checked In').length;
  const pendingPassengers = passengers.filter(p => p.status === 'Pending').length;
  
  // Handle updating passenger status
  const handleStatusChange = (id: number, newStatus: string) => {
    setPassengers(prevPassengers =>
      prevPassengers.map(passenger =>
        passenger.id === id ? { ...passenger, status: newStatus } : passenger
      )
    );
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-primary-dark mb-6">Passenger List</h1>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-primary-dark rounded-full p-3 mr-4">
              <FaUser className="text-white text-xl" />
            </div>
            <div>
              <p className="text-gray-600">Total Passengers</p>
              <h3 className="text-3xl font-bold text-primary-dark">{totalPassengers}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-green-500 rounded-full p-3 mr-4">
              <FaCheck className="text-white text-xl" />
            </div>
            <div>
              <p className="text-gray-600">Checked In</p>
              <h3 className="text-3xl font-bold text-green-500">{checkedInPassengers}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-orange-500 rounded-full p-3 mr-4">
              <FaTimes className="text-white text-xl" />
            </div>
            <div>
              <p className="text-gray-600">Pending</p>
              <h3 className="text-3xl font-bold text-orange-500">{pendingPassengers}</h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search passengers..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          
          <div className="w-full md:w-auto">
            <select
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Checked In">Checked In</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Passengers Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-primary-dark text-white">
              <th className="px-6 py-4 text-left font-medium">Passenger</th>
              <th className="px-6 py-4 text-left font-medium">Seat</th>
              <th className="px-6 py-4 text-left font-medium">Origin</th>
              <th className="px-6 py-4 text-left font-medium">Destination</th>
              <th className="px-6 py-4 text-left font-medium">Status</th>
              <th className="px-6 py-4 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPassengers.map((passenger) => (
              <tr key={passenger.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <FaUser className="text-gray-500" />
                    </div>
                    {passenger.name}
                  </div>
                </td>
                <td className="px-6 py-4">{passenger.seatNumber}</td>
                <td className="px-6 py-4">{passenger.origin}</td>
                <td className="px-6 py-4">{passenger.destination}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    passenger.status === 'Checked In' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {passenger.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {passenger.status === 'Pending' ? (
                    <button
                      onClick={() => handleStatusChange(passenger.id, 'Checked In')}
                      className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Check In
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatusChange(passenger.id, 'Pending')}
                      className="px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Undo
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filteredPassengers.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                  No passengers found matching your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
