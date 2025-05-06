'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBan, FaCheck, FaEye, FaSearch, FaDownload, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

// Define types
interface Driver {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'blocked';
  arrivalTime: string;
  route: string;
  rating: number;
  joinDate: string;
}

// Mock data - replace with actual API call
const mockDrivers: Driver[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+250788123456', status: 'active', arrivalTime: '08:15', route: 'Kigali - Nyamata', rating: 4.8, joinDate: '2023-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+250788789012', status: 'active', arrivalTime: '07:45', route: 'Kigali - Musanze', rating: 4.6, joinDate: '2023-02-10' },
  { id: 3, name: 'Robert Johnson', email: 'robert@example.com', phone: '+250788345678', status: 'blocked', arrivalTime: '09:30', route: 'Kigali - Huye', rating: 3.2, joinDate: '2023-03-05' },
  { id: 4, name: 'Lisa Brown', email: 'lisa@example.com', phone: '+250788901234', status: 'active', arrivalTime: '08:00', route: 'Kigali - Rwamagana', rating: 4.7, joinDate: '2023-04-20' },
  { id: 5, name: 'Michael Davis', email: 'michael@example.com', phone: '+250788567890', status: 'active', arrivalTime: '08:10', route: 'Kigali - Gisenyi', rating: 4.9, joinDate: '2023-05-12' },
  { id: 6, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+250788234567', status: 'blocked', arrivalTime: '10:00', route: 'Kigali - Rusizi', rating: 3.5, joinDate: '2023-06-18' },
  { id: 7, name: 'David Martinez', email: 'david@example.com', phone: '+250788654321', status: 'active', arrivalTime: '07:55', route: 'Kigali - Kayonza', rating: 4.4, joinDate: '2023-07-22' },
];

const DriversManagement = () => {
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState<keyof Driver>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Filter drivers based on search term and status
  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = 
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.phone.includes(searchTerm) ||
      driver.route.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      driver.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Sort drivers
  const sortedDrivers = [...filteredDrivers].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Toggle driver status (block/unblock)
  const toggleDriverStatus = (driverId: number) => {
    setDrivers(drivers.map(driver => {
      if (driver.id === driverId) {
        const newStatus = driver.status === 'active' ? 'blocked' : 'active';
        return { ...driver, status: newStatus };
      }
      return driver;
    }));
  };

  // Handle sorting
  const handleSort = (field: keyof Driver) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Export drivers data as CSV
  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Status', 'Arrival Time', 'Route', 'Rating', 'Join Date'];
    
    const csvData = sortedDrivers.map(driver => [
      driver.id,
      driver.name,
      driver.email,
      driver.phone,
      driver.status,
      driver.arrivalTime,
      driver.route,
      driver.rating,
      driver.joinDate
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'drivers.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Driver Management</h1>
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search drivers..."
              className="pl-10 pr-4 py-2 border rounded-md w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="p-2 border rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Drivers</option>
            <option value="active">Active Drivers</option>
            <option value="blocked">Blocked Drivers</option>
          </select>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
          >
            <FaDownload /> Export
          </button>
          <Link 
            href="/dashboard/admin/drivers/new"
            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md"
          >
            Add Driver
          </Link>
        </div>
      </div>
      
      {/* Drivers Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th 
                className="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  Name
                  {sortField === 'name' && (
                    sortDirection === 'asc' ? <FaSortAmountUp className="ml-1" /> : <FaSortAmountDown className="ml-1" />
                  )}
                </div>
              </th>
              <th className="py-3 px-4 text-left">Contact</th>
              <th 
                className="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center">
                  Status
                  {sortField === 'status' && (
                    sortDirection === 'asc' ? <FaSortAmountUp className="ml-1" /> : <FaSortAmountDown className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                className="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('arrivalTime')}
              >
                <div className="flex items-center">
                  Arrival Time
                  {sortField === 'arrivalTime' && (
                    sortDirection === 'asc' ? <FaSortAmountUp className="ml-1" /> : <FaSortAmountDown className="ml-1" />
                  )}
                </div>
              </th>
              <th className="py-3 px-4 text-left">Route</th>
              <th 
                className="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('rating')}
              >
                <div className="flex items-center">
                  Rating
                  {sortField === 'rating' && (
                    sortDirection === 'asc' ? <FaSortAmountUp className="ml-1" /> : <FaSortAmountDown className="ml-1" />
                  )}
                </div>
              </th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedDrivers.map((driver) => (
              <tr key={driver.id} className="hover:bg-gray-50">
                <td className="py-3 px-4">{driver.name}</td>
                <td className="py-3 px-4">
                  <div>{driver.email}</div>
                  <div className="text-sm text-gray-500">{driver.phone}</div>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    driver.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {driver.status === 'active' ? 'Active' : 'Blocked'}
                  </span>
                </td>
                <td className="py-3 px-4">{driver.arrivalTime}</td>
                <td className="py-3 px-4">{driver.route}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <span className={`font-medium ${
                      driver.rating >= 4.5 ? 'text-green-600' :
                      driver.rating >= 4.0 ? 'text-blue-600' :
                      driver.rating >= 3.0 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {driver.rating}
                    </span>
                    <span className="text-gray-400 ml-1">/5</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleDriverStatus(driver.id)}
                      className={`p-1 rounded ${
                        driver.status === 'active'
                          ? 'text-red-600 hover:bg-red-100'
                          : 'text-green-600 hover:bg-green-100'
                      }`}
                      title={driver.status === 'active' ? 'Block Driver' : 'Unblock Driver'}
                    >
                      {driver.status === 'active' ? <FaBan /> : <FaCheck />}
                    </button>
                    <Link
                      href={`/dashboard/admin/drivers/${driver.id}`}
                      className="p-1 rounded text-blue-600 hover:bg-blue-100"
                      title="View Details"
                    >
                      <FaEye />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {sortedDrivers.length === 0 && (
        <div className="text-center py-4 bg-white rounded-lg shadow">
          No drivers found matching your search criteria.
        </div>
      )}
      
      {/* Pagination (simplified) */}
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing {sortedDrivers.length} of {drivers.length} drivers
        </div>
        <div className="flex space-x-1">
          <button className="px-3 py-1 border rounded hover:bg-gray-100">Previous</button>
          <button className="px-3 py-1 bg-primary text-white rounded">1</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">2</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">Next</button>
        </div>
      </div>
    </div>
  );
};

export default DriversManagement;