'use client';

import { useState, useEffect } from 'react';
import { FaUser, FaPhone, FaSearch, FaMapMarkerAlt, FaListAlt, FaLocationArrow, FaArrowRight } from 'react-icons/fa';

// Define types
interface Passenger {
  id: number;
  name: string;
  phone: string;
  seatNumber: string;
  bookingTime: string;
  pickupLocation: string;
  destination: string;
  status: 'boarded' | 'waiting' | 'cancelled';
}

// Mock passenger data - replace with actual API call
const mockPassengers: Passenger[] = [
  { id: 1, name: 'Alice Johnson', phone: '+250788123456', seatNumber: 'A1', bookingTime: '2023-10-15 08:30', pickupLocation: 'Nyabugogo', destination: 'Huye', status: 'boarded' },
  { id: 2, name: 'Bob Williams', phone: '+250788234567', seatNumber: 'A2', bookingTime: '2023-10-15 09:15', pickupLocation: 'Kigali Center', destination: 'Musanze', status: 'waiting' },
  { id: 3, name: 'Carol Martinez', phone: '+250788345678', seatNumber: 'B1', bookingTime: '2023-10-15 10:00', pickupLocation: 'Remera', destination: 'Nyamata', status: 'waiting' },
  { id: 4, name: 'David Anderson', phone: '+250788456789', seatNumber: 'B2', bookingTime: '2023-10-15 10:30', pickupLocation: 'Kimironko', destination: 'Rwamagana', status: 'waiting' },
  { id: 5, name: 'Eva Brown', phone: '+250788567890', seatNumber: 'C1', bookingTime: '2023-10-15 11:15', pickupLocation: 'Kicukiro', destination: 'Bugesera', status: 'cancelled' },
  { id: 6, name: 'Frank Wilson', phone: '+250788678901', seatNumber: 'C2', bookingTime: '2023-10-15 12:00', pickupLocation: 'Gikondo', destination: 'Karongi', status: 'waiting' },
  { id: 7, name: 'Grace Lee', phone: '+250788789012', seatNumber: 'D1', bookingTime: '2023-10-15 12:45', pickupLocation: 'Nyamirambo', destination: 'Huye', status: 'waiting' },
  { id: 8, name: 'Henry Clark', phone: '+250788890123', seatNumber: 'D2', bookingTime: '2023-10-15 13:30', pickupLocation: 'Kacyiru', destination: 'Rusizi', status: 'boarded' },
];

const PassengerList = () => {
  const [passengers, setPassengers] = useState<Passenger[]>(mockPassengers);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'card' | 'list'>('list');

  useEffect(() => {
    // Set current date in a nice format
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
    
    // In a real application, you would fetch passenger data here
  }, []);

  // Filter passengers based on search term and status
  const filteredPassengers = passengers.filter(passenger => {
    const matchesSearch = 
      passenger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      passenger.phone.includes(searchTerm) ||
      passenger.seatNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      passenger.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      passenger.destination.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      passenger.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Update passenger status
  const updatePassengerStatus = (passengerId: number, newStatus: 'boarded' | 'waiting' | 'cancelled') => {
    setPassengers(passengers.map(passenger => {
      if (passenger.id === passengerId) {
        return { ...passenger, status: newStatus };
      }
      return passenger;
    }));
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Passenger List</h1>
          <p className="text-gray-600">{currentDate}</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search passengers..."
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
            <option value="all">All Passengers</option>
            <option value="waiting">Waiting</option>
            <option value="boarded">Boarded</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <div className="flex border rounded-md overflow-hidden">
            <button
              className={`px-3 py-2 flex items-center gap-1 ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setViewMode('list')}
            >
              <FaListAlt /> List
            </button>
            <button
              className={`px-3 py-2 flex items-center gap-1 ${viewMode === 'card' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setViewMode('card')}
            >
              <FaUser /> Cards
            </button>
          </div>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Passengers</h3>
          <p className="text-3xl font-bold text-blue-600">{passengers.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Seats Booked</h3>
          <p className="text-3xl font-bold text-green-600">{passengers.length}/30</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Next Stop</h3>
          <p className="text-xl font-semibold text-purple-600">Kigali Center (5 mins)</p>
        </div>
      </div>
      
      {/* Passenger List View */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Passenger</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seat</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPassengers.map((passenger) => (
                  <tr key={passenger.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center">
                          <FaUser className="text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{passenger.name}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <FaPhone className="mr-1" size={12} />
                            {passenger.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {passenger.seatNumber}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">{passenger.pickupLocation}</td>
                    <td className="py-4 px-4 text-sm text-gray-700">{passenger.destination}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        passenger.status === 'boarded' ? 'bg-green-100 text-green-800' :
                        passenger.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {passenger.status === 'boarded' ? 'Boarded' :
                         passenger.status === 'waiting' ? 'Waiting' : 'Cancelled'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        {passenger.status === 'waiting' && (
                          <button
                            onClick={() => updatePassengerStatus(passenger.id, 'boarded')}
                            className="px-2 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200 text-xs"
                          >
                            Mark Boarded
                          </button>
                        )}
                        {passenger.status === 'waiting' && (
                          <button
                            onClick={() => updatePassengerStatus(passenger.id, 'cancelled')}
                            className="px-2 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 text-xs"
                          >
                            Cancel
                          </button>
                        )}
                        {passenger.status === 'boarded' && (
                          <span className="text-xs text-gray-500">Boarded</span>
                        )}
                        {passenger.status === 'cancelled' && (
                          <span className="text-xs text-gray-500">Cancelled</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredPassengers.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No passengers found matching your search criteria.
            </div>
          )}
        </div>
      )}
      
      {/* Passenger Card View */}
      {viewMode === 'card' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPassengers.map((passenger) => (
            <div 
              key={passenger.id} 
              className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${
                passenger.status === 'boarded' ? 'border-green-500' : 
                passenger.status === 'waiting' ? 'border-yellow-500' : 
                'border-red-500'
              }`}
            >
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                  <FaUser className="text-gray-500" size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{passenger.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center">
                    <FaPhone className="mr-1" size={12} />
                    {passenger.phone}
                  </p>
                </div>
                <div className="ml-auto">
                  <span className="px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-800 font-semibold">
                    {passenger.seatNumber}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Pickup Location</p>
                    <p className="text-sm font-medium">{passenger.pickupLocation}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <FaArrowRight className="text-gray-400" />
                </div>
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Destination</p>
                    <p className="text-sm font-medium">{passenger.destination}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-t pt-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  passenger.status === 'boarded' ? 'bg-green-100 text-green-800' :
                  passenger.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {passenger.status === 'boarded' ? 'Boarded' :
                   passenger.status === 'waiting' ? 'Waiting' : 'Cancelled'}
                </span>
                
                <div className="flex space-x-2">
                  {passenger.status === 'waiting' && (
                    <>
                      <button
                        onClick={() => updatePassengerStatus(passenger.id, 'boarded')}
                        className="px-2 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200 text-xs"
                      >
                        Mark Boarded
                      </button>
                      <button
                        onClick={() => updatePassengerStatus(passenger.id, 'cancelled')}
                        className="px-2 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 text-xs"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {filteredPassengers.length === 0 && (
            <div className="col-span-full text-center py-8 bg-white rounded-lg shadow">
              <p className="text-gray-500">No passengers found matching your search criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PassengerList;