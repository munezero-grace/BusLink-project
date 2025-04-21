'use client';

import React, { useState } from 'react';
import { FaCircle } from 'react-icons/fa';

// Sample bookings data
const initialBookings = [
  { id: 1, origin: 'kicukiro nyanza', destination: 'Nyabugogo', status: 'check-in open' },
  { id: 2, origin: 'kicukiro center', destination: 'Nyabugogo', status: 'check-in open' },
  { id: 3, origin: 'kicukiro center', destination: 'Nyabugogo', status: 'check-in open' },
  { id: 4, origin: 'kicukiro center', destination: 'Rwandex', status: 'check-in open' },
  { id: 5, origin: 'Gatenga', destination: 'Sonatube', status: 'check-in open' },
  { id: 6, origin: 'Gatenga', destination: 'Rwandex', status: 'check-in open' },
  { id: 7, origin: 'Rwandex', destination: 'Nyabugogo', status: 'check-in open' },
  { id: 8, origin: 'Rwandex', destination: 'Nyabugogo', status: 'check-in open' },
  { id: 9, origin: 'Sonatube', destination: 'Nyabugogo', status: 'check-in open' },
];

export default function BookingsPage() {
  const [bookings] = useState(initialBookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter bookings based on search term
  const filteredBookings = bookings.filter(booking => 
    booking.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastBooking = currentPage * itemsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6">Booking</h1>
      
      {/* Search Section */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search bookings..."
            className="w-full pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Bookings Table */}
      <div className="overflow-x-auto w-full bg-gray-100 rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 border-y border-gray-300">
              <th className="py-3 px-6 text-left font-medium text-gray-700">Origin</th>
              <th className="py-3 px-6 text-left font-medium text-gray-700">Destination</th>
              <th className="py-3 px-6 text-left font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.map((booking, index) => (
              <tr 
                key={booking.id} 
                className="border-b border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-6 flex items-center">
                  <FaCircle className="text-blue-500 mr-2 text-xs" />
                  {booking.origin}
                </td>
                <td className="py-3 px-6">{booking.destination}</td>
                <td className="py-3 px-6">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
            {currentBookings.length === 0 && (
              <tr>
                <td colSpan={3} className="py-8 text-center text-gray-500">
                  No bookings found matching your search.
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
            Showing {indexOfFirstBooking + 1} to {Math.min(indexOfLastBooking, filteredBookings.length)} of {filteredBookings.length} bookings
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
