'use client';

import React, { useState } from 'react';

// Sample claims data
const initialClaims = [
  { id: '001', passengerName: 'Jimmy Gatete', driverId: '001', claim: 'Great service!', status: 'Opened' },
  { id: '001', passengerName: 'Jimmy Gatete', driverId: '001', claim: 'Great service!', status: 'Opened' },
  { id: '002', passengerName: 'Jean pierre', driverId: '003', claim: 'Delayed pickup', status: 'Closed' },
  { id: '001', passengerName: 'Jimmy Gatete', driverId: '001', claim: 'Great service!', status: 'Opened' },
  { id: '001', passengerName: 'Jimmy Gatete', driverId: '001', claim: 'Great service!', status: 'Opened' },
  { id: '001', passengerName: 'Jimmy Gatete', driverId: '001', claim: 'Great service!', status: 'Opened' },
  { id: '001', passengerName: 'Jimmy Gatete', driverId: '001', claim: 'Great service!', status: 'Opened' },
  { id: '001', passengerName: 'Jimmy Gatete', driverId: '001', claim: 'Great service!', status: 'Opened' },
];

export default function ClaimsAndFeedback() {
  const [claims] = useState(initialClaims);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter claims based on search term
  const filteredClaims = claims.filter(claim => 
    claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.passengerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.driverId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.claim.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastClaim = currentPage * itemsPerPage;
  const indexOfFirstClaim = indexOfLastClaim - itemsPerPage;
  const currentClaims = filteredClaims.slice(indexOfFirstClaim, indexOfLastClaim);
  const totalPages = Math.ceil(filteredClaims.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6 text-primary-dark">Claims & Feedback</h1>
      
      {/* Search Section */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search claims..."
            className="w-full pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Claims Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-primary-dark text-white">
              <th className="py-4 px-6 text-left font-medium">Claim ID</th>
              <th className="py-4 px-6 text-left font-medium">Passenger Info</th>
              <th className="py-4 px-6 text-left font-medium">Driver Info</th>
              <th className="py-4 px-6 text-left font-medium">Claim</th>
              <th className="py-4 px-6 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentClaims.map((claim, index) => (
              <tr 
                key={index} 
                className="border-b border-gray-200"
              >
                <td className="py-4 px-6">{claim.id}</td>
                <td className="py-4 px-6">{claim.passengerName}</td>
                <td className="py-4 px-6">{claim.driverId}</td>
                <td className="py-4 px-6">{claim.claim}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    claim.status === 'Opened' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-green-500 text-white'
                  }`}>
                    {claim.status}
                  </span>
                </td>
              </tr>
            ))}
            {currentClaims.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  No claims found matching your search.
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
            Showing {indexOfFirstClaim + 1} to {Math.min(indexOfLastClaim, filteredClaims.length)} of {filteredClaims.length} claims
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
