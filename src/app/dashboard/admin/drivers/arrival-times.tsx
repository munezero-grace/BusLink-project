'use client';

import { useState, useEffect } from 'react';
import { FaSearch, FaSortAmountDown, FaSortAmountUp, FaCalendarAlt, FaDownload, FaExclamationTriangle } from 'react-icons/fa';

// Define types
interface ArrivalRecord {
  id: number;
  driverId: number;
  driverName: string;
  scheduledArrival: string;
  actualArrival: string;
  status: 'on-time' | 'late' | 'early' | 'absent';
  date: string;
  route: string;
  minutesDeviation: number;
}

// Mock data - replace with actual API call
const mockArrivalData: ArrivalRecord[] = [
  { id: 1, driverId: 1, driverName: 'John Doe', scheduledArrival: '08:00', actualArrival: '07:55', status: 'early', date: '2023-10-15', route: 'Kigali - Nyamata', minutesDeviation: -5 },
  { id: 2, driverId: 2, driverName: 'Jane Smith', scheduledArrival: '08:30', actualArrival: '08:32', status: 'on-time', date: '2023-10-15', route: 'Kigali - Musanze', minutesDeviation: 2 },
  { id: 3, driverId: 3, driverName: 'Robert Johnson', scheduledArrival: '09:00', actualArrival: '09:25', status: 'late', date: '2023-10-15', route: 'Kigali - Huye', minutesDeviation: 25 },
  { id: 4, driverId: 4, driverName: 'Lisa Brown', scheduledArrival: '07:45', actualArrival: '07:43', status: 'on-time', date: '2023-10-15', route: 'Kigali - Rwamagana', minutesDeviation: -2 },
  { id: 5, driverId: 5, driverName: 'Michael Davis', scheduledArrival: '08:15', actualArrival: '08:10', status: 'on-time', date: '2023-10-15', route: 'Kigali - Gisenyi', minutesDeviation: -5 },
  { id: 6, driverId: 6, driverName: 'Sarah Wilson', scheduledArrival: '09:15', actualArrival: '09:50', status: 'late', date: '2023-10-15', route: 'Kigali - Rusizi', minutesDeviation: 35 },
  { id: 7, driverId: 7, driverName: 'David Martinez', scheduledArrival: '08:45', actualArrival: '08:44', status: 'on-time', date: '2023-10-15', route: 'Kigali - Kayonza', minutesDeviation: -1 },
  { id: 8, driverId: 8, driverName: 'Emily Johnson', scheduledArrival: '07:30', actualArrival: '', status: 'absent', date: '2023-10-15', route: 'Kigali - Bugesera', minutesDeviation: 0 },
];

const DriverArrivalTimes = () => {
  const [arrivalRecords, setArrivalRecords] = useState<ArrivalRecord[]>(mockArrivalData);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState<keyof ArrivalRecord>('driverName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Filter arrival records
  const filteredRecords = arrivalRecords.filter(record => {
    const matchesSearch = 
      record.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.route.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      record.status === statusFilter;
    
    // Date filtering
    let matchesDate = true;
    if (startDate && endDate) {
      const recordDate = new Date(record.date);
      const startFilterDate = new Date(startDate);
      const endFilterDate = new Date(endDate);
      matchesDate = recordDate >= startFilterDate && recordDate <= endFilterDate;
    } else if (startDate) {
      const recordDate = new Date(record.date);
      const startFilterDate = new Date(startDate);
      matchesDate = recordDate >= startFilterDate;
    } else if (endDate) {
      const recordDate = new Date(record.date);
      const endFilterDate = new Date(endDate);
      matchesDate = recordDate <= endFilterDate;
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Sort records
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Handle sorting
  const handleSort = (field: keyof ArrivalRecord) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Export data as CSV
  const exportToCSV = () => {
    const headers = ['ID', 'Driver Name', 'Scheduled Arrival', 'Actual Arrival', 'Status', 'Date', 'Route', 'Minutes Deviation'];
    
    const csvData = sortedRecords.map(record => [
      record.id,
      record.driverName,
      record.scheduledArrival,
      record.actualArrival || 'Not Arrived',
      record.status,
      record.date,
      record.route,
      record.minutesDeviation
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'driver_arrival_times.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate summary statistics
  const statistics = {
    total: filteredRecords.length,
    onTime: filteredRecords.filter(r => r.status === 'on-time' || r.status === 'early').length,
    late: filteredRecords.filter(r => r.status === 'late').length,
    absent: filteredRecords.filter(r => r.status === 'absent').length,
    onTimePercentage: Math.round((filteredRecords.filter(r => r.status === 'on-time' || r.status === 'early').length / filteredRecords.length) * 100) || 0
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Driver Arrival Times</h1>
      
      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Total Records</div>
          <div className="text-2xl font-bold">{statistics.total}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">On Time / Early</div>
          <div className="text-2xl font-bold text-green-600">{statistics.onTime} ({statistics.onTimePercentage}%)</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Late Arrivals</div>
          <div className="text-2xl font-bold text-yellow-600">{statistics.late}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Absent</div>
          <div className="text-2xl font-bold text-red-600">{statistics.absent}</div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search drivers or routes..."
              className="pl-10 pr-4 py-2 border rounded-md w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCalendarAlt className="text-gray-400" />
              </div>
              <input
                type="date"
                placeholder="Start Date"
                className="pl-10 pr-4 py-2 border rounded-md w-full"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <span className="text-gray-500">to</span>
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCalendarAlt className="text-gray-400" />
              </div>
              <input
                type="date"
                placeholder="End Date"
                className="pl-10 pr-4 py-2 border rounded-md w-full"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          
          <select
            className="p-2 border rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="on-time">On Time</option>
            <option value="early">Early</option>
            <option value="late">Late</option>
            <option value="absent">Absent</option>
          </select>
          
          <button
            onClick={exportToCSV}
            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
          >
            <FaDownload /> Export Data
          </button>
        </div>
      </div>
      
      {/* Arrival Times Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th 
                className="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('driverName')}
              >
                <div className="flex items-center">
                  Driver
                  {sortField === 'driverName' && (
                    sortDirection === 'asc' ? <FaSortAmountUp className="ml-1" /> : <FaSortAmountDown className="ml-1" />
                  )}
                </div>
              </th>
              <th className="py-3 px-4 text-left">Route</th>
              <th 
                className="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center">
                  Date
                  {sortField === 'date' && (
                    sortDirection === 'asc' ? <FaSortAmountUp className="ml-1" /> : <FaSortAmountDown className="ml-1" />
                  )}
                </div>
              </th>
              <th className="py-3 px-4 text-left">Scheduled Time</th>
              <th className="py-3 px-4 text-left">Actual Time</th>
              <th 
                className="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('minutesDeviation')}
              >
                <div className="flex items-center">
                  Deviation
                  {sortField === 'minutesDeviation' && (
                    sortDirection === 'asc' ? <FaSortAmountUp className="ml-1" /> : <FaSortAmountDown className="ml-1" />
                  )}
                </div>
              </th>
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
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedRecords.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="py-3 px-4">{record.driverName}</td>
                <td className="py-3 px-4">{record.route}</td>
                <td className="py-3 px-4">{record.date}</td>
                <td className="py-3 px-4">{record.scheduledArrival}</td>
                <td className="py-3 px-4">
                  {record.actualArrival || (
                    <span className="text-red-600 flex items-center">
                      <FaExclamationTriangle className="mr-1" /> Not Arrived
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  {record.status !== 'absent' ? (
                    <span className={`${
                      record.minutesDeviation > 15 ? 'text-red-600' :
                      record.minutesDeviation > 5 ? 'text-yellow-600' :
                      record.minutesDeviation < 0 ? 'text-green-600' : 
                      'text-gray-600'
                    }`}>
                      {record.minutesDeviation > 0 ? `+${record.minutesDeviation}` : record.minutesDeviation} min
                    </span>
                  ) : '—'}
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    record.status === 'on-time' ? 'bg-green-100 text-green-800' :
                    record.status === 'early' ? 'bg-blue-100 text-blue-800' :
                    record.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {record.status === 'on-time' ? 'On Time' :
                     record.status === 'early' ? 'Early' :
                     record.status === 'late' ? 'Late' : 'Absent'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {sortedRecords.length === 0 && (
        <div className="text-center py-4 bg-white rounded-lg shadow">
          No arrival records found matching your search criteria.
        </div>
      )}
      
      {/* Pagination (simplified) */}
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing {sortedRecords.length} of {arrivalRecords.length} records
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

export default DriverArrivalTimes;