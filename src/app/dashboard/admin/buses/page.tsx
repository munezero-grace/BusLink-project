'use client';

import React, { useState } from 'react';
import { FaBus, FaEdit, FaTrash } from 'react-icons/fa';

// Sample bus data
const initialBuses = [
  { id: 1, name: 'NY-kicukiro', licensePlate: 'NP 345 C', departureTime: '01/06/2023 09:00', arrivalTime: '01/06/2023 10:30' },
  { id: 2, name: 'NY-kicukiro', licensePlate: 'NP 345 C', departureTime: '01/06/2023 09:00', arrivalTime: '01/06/2023 10:30' },
  { id: 3, name: 'NY-kicukiro', licensePlate: 'NP 345 C', departureTime: '01/06/2023 09:00', arrivalTime: '01/06/2023 10:30' },
  { id: 4, name: 'NY-kicukiro', licensePlate: 'NP 345 C', departureTime: '01/06/2023 09:00', arrivalTime: '01/06/2023 10:30' },
  { id: 5, name: 'NY-kicukiro', licensePlate: 'NP 345 C', departureTime: '01/06/2023 09:00', arrivalTime: '01/06/2023 10:30' },
  { id: 6, name: 'NY-kicukiro', licensePlate: 'NP 345 C', departureTime: '01/06/2023 09:00', arrivalTime: '01/06/2023 10:30' },
  { id: 7, name: 'NY-kicukiro', licensePlate: 'NP 345 C', departureTime: '01/06/2023 09:00', arrivalTime: '01/06/2023 10:30' },
  { id: 8, name: 'NY-kicukiro', licensePlate: 'NP 345 C', departureTime: '01/06/2023 09:00', arrivalTime: '01/06/2023 10:30' },
  { id: 9, name: 'RY-remera', licensePlate: 'NP 346 C', departureTime: '01/06/2023 10:00', arrivalTime: '01/06/2023 11:30' },
  { id: 10, name: 'KM-kimironko', licensePlate: 'NP 347 C', departureTime: '01/06/2023 08:00', arrivalTime: '01/06/2023 09:30' },
  { id: 11, name: 'KG-kacyiru', licensePlate: 'NP 348 C', departureTime: '01/06/2023 07:00', arrivalTime: '01/06/2023 08:30' },
  { id: 12, name: 'KN-kanombe', licensePlate: 'NP 349 C', departureTime: '01/06/2023 07:30', arrivalTime: '01/06/2023 09:00' },
];

export default function BusManagement() {
  const [buses, setBuses] = useState(initialBuses);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter buses based on search term
  const filteredBuses = buses.filter(bus => 
    bus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Bus Management</h1>
      
      {/* Search and Add Bus Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Search buses..."
            className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute right-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>
        
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-colors w-full md:w-auto flex items-center justify-center">
          <FaBus className="mr-2" />
          Add New Bus
        </button>
      </div>
      
      {/* Buses Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white border-collapse">
          <thead>
            <tr className="bg-primary-dark text-white">
              <th className="py-3 px-4 text-left">Bus</th>
              <th className="py-3 px-4 text-left">License plate</th>
              <th className="py-3 px-4 text-left">Departure time</th>
              <th className="py-3 px-4 text-left">Arrival time</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBuses.map((bus, index) => (
              <tr key={bus.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="py-3 px-4 border-b border-gray-200">{bus.name}</td>
                <td className="py-3 px-4 border-b border-gray-200">{bus.licensePlate}</td>
                <td className="py-3 px-4 border-b border-gray-200">{bus.departureTime}</td>
                <td className="py-3 px-4 border-b border-gray-200">{bus.arrivalTime}</td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <div className="flex space-x-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      <FaEdit />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          Showing {filteredBuses.length} of {buses.length} buses
        </div>
        
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
            Previous
          </button>
          <button className="px-3 py-1 bg-primary text-white rounded-md hover:bg-primary-light transition-colors">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
            2
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
