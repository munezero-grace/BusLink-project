'use client';

import React, { useState } from 'react';
import { FaUser, FaEdit, FaEnvelope, FaPhone, FaIdCard, FaCalendarAlt, FaMapMarkerAlt, FaFileAlt, FaStar, FaCarAlt, FaClock } from 'react-icons/fa';

// Sample driver data
const driverData = {
  id: 'DRV-001',
  name: 'John Driver',
  email: 'john.driver@buslink.com',
  phone: '+250 780 123 456',
  licenseNumber: 'RW-DL-12345678',
  licenseExpiry: '2025-06-15',
  address: 'Kigali, Kicukiro, Rwanda',
  joinDate: '2021-03-10',
  busAssigned: 'Bus-01 (NP 345 C)',
  experience: '4 years',
  rating: 4.7,
  totalTrips: 1240,
  totalDistance: '35,600 km',
  description: 'Experienced driver with excellent track record in customer service and safe driving. Strong knowledge of Kigali routes and traffic patterns.'
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: driverData.name,
    email: driverData.email,
    phone: driverData.phone,
    address: driverData.address,
    description: driverData.description
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically update the driver data through an API
    console.log('Updated profile:', formData);
    setIsEditing(false);
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-primary-dark mb-6">Driver Profile</h1>
      
      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="bg-primary-dark text-white p-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center mb-4 md:mb-0 md:mr-6">
              <FaUser className="text-primary-dark text-5xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{driverData.name}</h2>
              <p className="text-blue-300">Driver ID: {driverData.id}</p>
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(driverData.rating) ? "text-yellow-400" : "text-gray-400"} />
                  ))}
                </div>
                <span className="ml-2">{driverData.rating}/5.0</span>
              </div>
            </div>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
              >
                <FaEdit className="mr-2" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
        
        <div className="p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FaEnvelope className="text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{driverData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FaPhone className="text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">{driverData.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FaIdCard className="text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">License Number</p>
                      <p className="font-medium">{driverData.licenseNumber}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">License Expiry</p>
                      <p className="font-medium">{driverData.licenseExpiry}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium">{driverData.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FaFileAlt className="text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Join Date</p>
                      <p className="font-medium">{driverData.joinDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FaCarAlt className="text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Bus Assigned</p>
                      <p className="font-medium">{driverData.busAssigned}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FaClock className="text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Experience</p>
                      <p className="font-medium">{driverData.experience}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">About</h3>
                <p className="text-gray-600">{driverData.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-full p-3 mr-4">
              <FaCarAlt className="text-white text-xl" />
            </div>
            <div>
              <p className="text-gray-600">Total Trips</p>
              <h3 className="text-2xl font-bold text-primary-dark">{driverData.totalTrips}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-green-500 rounded-full p-3 mr-4">
              <FaMapMarkerAlt className="text-white text-xl" />
            </div>
            <div>
              <p className="text-gray-600">Total Distance</p>
              <h3 className="text-2xl font-bold text-primary-dark">{driverData.totalDistance}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-yellow-500 rounded-full p-3 mr-4">
              <FaStar className="text-white text-xl" />
            </div>
            <div>
              <p className="text-gray-600">Rating</p>
              <h3 className="text-2xl font-bold text-primary-dark">{driverData.rating}/5.0</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
