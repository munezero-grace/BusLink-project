'use client';

import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaMapMarkerAlt, FaCog, FaSave, FaCamera, FaLock, FaGlobe, FaBell } from 'react-icons/fa';
import Link from 'next/link';

export default function UserProfile() {
  // State for user profile data
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'User',
    email: 'user@example.com',
    phone: '+250 78 123 4567',
    idNumber: 'ID12345678',
    address: 'Kigali, Rwanda',
    preferredLanguage: 'English',
    profilePicture: 'https://via.placeholder.com/150',
    notificationPreferences: {
      email: true,
      sms: true,
      app: true
    }
  });
  
  // State for edit mode
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(profile);
  
  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // Save profile changes
  const saveChanges = (e) => {
    e.preventDefault();
    setProfile(formData);
    setEditMode(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Profile</h1>
        
        {editMode ? (
          <div className="flex gap-2">
            <button 
              onClick={() => {
                setFormData(profile);
                setEditMode(false);
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={saveChanges}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center gap-2"
            >
              <FaSave /> Save Changes
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center gap-2"
          >
            <FaCog /> Edit Profile
          </button>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <img 
                src={profile.profilePicture} 
                alt={`${profile.firstName} ${profile.lastName}`} 
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow"
              />
              {editMode && (
                <div className="absolute bottom-0 right-0">
                  <label htmlFor="profilePicture" className="bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary-dark transition-colors">
                    <FaCamera />
                    <input type="file" id="profilePicture" className="hidden" accept="image/*" />
                  </label>
                </div>
              )}
            </div>
            
            <div>
              <h2 className="text-xl font-bold">{profile.firstName} {profile.lastName}</h2>
              <p className="text-gray-500">{profile.email}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Regular User
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Verified Account
                </div>
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  20+ Trips
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <form onSubmit={saveChanges}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaUser className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          disabled={!editMode}
                          className={`pl-10 pr-3 py-2 w-full border rounded-md ${
                            editMode ? 'border-gray-300' : 'bg-gray-50 border-gray-200'
                          }`}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaUser className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          disabled={!editMode}
                          className={`pl-10 pr-3 py-2 w-full border rounded-md ${
                            editMode ? 'border-gray-300' : 'bg-gray-50 border-gray-200'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!editMode}
                        className={`pl-10 pr-3 py-2 w-full border rounded-md ${
                          editMode ? 'border-gray-300' : 'bg-gray-50 border-gray-200'
                        }`}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaPhone className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!editMode}
                        className={`pl-10 pr-3 py-2 w-full border rounded-md ${
                          editMode ? 'border-gray-300' : 'bg-gray-50 border-gray-200'
                        }`}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      ID Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaIdCard className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="idNumber"
                        name="idNumber"
                        value={formData.idNumber}
                        onChange={handleChange}
                        disabled={!editMode}
                        className={`pl-10 pr-3 py-2 w-full border rounded-md ${
                          editMode ? 'border-gray-300' : 'bg-gray-50 border-gray-200'
                        }`}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaMapMarkerAlt className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        disabled={!editMode}
                        className={`pl-10 pr-3 py-2 w-full border rounded-md ${
                          editMode ? 'border-gray-300' : 'bg-gray-50 border-gray-200'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Preferences</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="preferredLanguage" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Language
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaGlobe className="text-gray-400" />
                      </div>
                      <select
                        id="preferredLanguage"
                        name="preferredLanguage"
                        value={formData.preferredLanguage}
                        onChange={handleChange}
                        disabled={!editMode}
                        className={`pl-10 pr-3 py-2 w-full border rounded-md ${
                          editMode ? 'border-gray-300' : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <option value="English">English</option>
                        <option value="French">French</option>
                        <option value="Kinyarwanda">Kinyarwanda</option>
                        <option value="Swahili">Swahili</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <FaBell /> Notification Preferences
                    </h4>
                    <div className="space-y-2 pl-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="notifEmail"
                          name="notificationPreferences.email"
                          checked={formData.notificationPreferences.email}
                          onChange={handleChange}
                          disabled={!editMode}
                          className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <label htmlFor="notifEmail" className="ml-2 block text-sm text-gray-700">
                          Email Notifications
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="notifSms"
                          name="notificationPreferences.sms"
                          checked={formData.notificationPreferences.sms}
                          onChange={handleChange}
                          disabled={!editMode}
                          className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <label htmlFor="notifSms" className="ml-2 block text-sm text-gray-700">
                          SMS Notifications
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="notifApp"
                          name="notificationPreferences.app"
                          checked={formData.notificationPreferences.app}
                          onChange={handleChange}
                          disabled={!editMode}
                          className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <label htmlFor="notifApp" className="ml-2 block text-sm text-gray-700">
                          App Notifications
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-4 border-t border-gray-200">
                    <Link
                      href="/dashboard/user/settings"
                      className="text-primary hover:text-primary-dark flex items-center gap-2"
                    >
                      <FaCog /> Advanced Settings
                    </Link>
                  </div>
                  
                  <div>
                    <Link
                      href="/auth/reset-password"
                      className="text-primary hover:text-primary-dark flex items-center gap-2"
                    >
                      <FaLock /> Change Password
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-4">Account Statistics</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500 text-sm">Total Trips</p>
            <p className="text-2xl font-bold">24</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500 text-sm">Favorite Route</p>
            <p className="text-lg font-medium">Downtown - Kimironko</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500 text-sm">Member Since</p>
            <p className="text-lg font-medium">January 2025</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500 text-sm">Loyalty Points</p>
            <p className="text-2xl font-bold">520</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Recent Activities</h3>
          <Link
            href="/dashboard/user/history"
            className="text-primary hover:text-primary-dark text-sm"
          >
            View All
          </Link>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaTicketAlt className="text-blue-600" />
            </div>
            <div>
              <p className="font-medium">Booked a trip: Downtown to Kimironko</p>
              <p className="text-sm text-gray-500">May 5, 2025 at 09:45 AM</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="bg-green-100 p-3 rounded-full">
              <FaUser className="text-green-600" />
            </div>
            <div>
              <p className="font-medium">Updated profile information</p>
              <p className="text-sm text-gray-500">April 28, 2025 at 03:20 PM</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="bg-purple-100 p-3 rounded-full">
              <FaTicketAlt className="text-purple-600" />
            </div>
            <div>
              <p className="font-medium">Completed a trip: Nyabugogo to Remera</p>
              <p className="text-sm text-gray-500">April 22, 2025 at 11:15 AM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
