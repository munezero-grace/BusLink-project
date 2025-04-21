'use client';

import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

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
];

export default function BusManagement() {
  const [buses] = useState(initialBuses);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter buses based on search term
  const filteredBuses = buses.filter(bus => 
    bus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.departureTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.arrivalTime.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastBus = currentPage * itemsPerPage;
  const indexOfFirstBus = indexOfLastBus - itemsPerPage;
  const currentBuses = filteredBuses.slice(indexOfFirstBus, indexOfLastBus);
  const totalPages = Math.ceil(filteredBuses.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6 text-primary-dark">Bus Management</h1>
      
      {/* Search Section */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search buses..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
        </div>
      </div>
      
      {/* Buses Table */}
      <div className="overflow-x-auto w-full bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-primary-dark text-white">
              <th className="py-4 px-6 text-left font-medium">Bus</th>
              <th className="py-4 px-6 text-left font-medium">License plate</th>
              <th className="py-4 px-6 text-left font-medium">Departure time</th>
              <th className="py-4 px-6 text-left font-medium">Arrival time</th>
            </tr>
          </thead>
          <tbody>
            {currentBuses.map((bus, index) => (
              <tr 
                key={bus.id} 
                className={`
                  border-b border-gray-200 hover:bg-gray-50 transition-colors
                  ${index === currentBuses.length - 1 ? 'border-b-0' : ''}
                `}
              >
                <td className="py-4 px-6">{bus.name}</td>
                <td className="py-4 px-6">{bus.licensePlate}</td>
                <td className="py-4 px-6">{bus.departureTime}</td>
                <td className="py-4 px-6">{bus.arrivalTime}</td>
              </tr>
            ))}
            {currentBuses.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">
                  No buses found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing {indexOfFirstBus + 1} to {Math.min(indexOfLastBus, filteredBuses.length)} of {filteredBuses.length} buses
          </div>
          
          <div className="flex space-x-1">
            <button 
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`
                px-3 py-1 rounded-md
                ${currentPage === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'}
              `}
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`
                  px-3 py-1 rounded-md
                  ${currentPage === number
                    ? 'bg-primary text-white'
                    : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'}
                `}
              >
                {number}
              </button>
            ))}
            
            <button 
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`
                px-3 py-1 rounded-md
                ${currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'}
              `}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
