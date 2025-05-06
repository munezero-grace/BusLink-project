'use client';

import React, { useState } from 'react';
import { FiSave, FiUser, FiBell, FiShield, FiMapPin, FiClock, FiLock } from 'react-icons/fi';
import { FaCar, FaGasPump } from 'react-icons/fa';

export default function DriverSettings() {
  // States for form controls
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [activeTab, setActiveTab] = useState('account');
  const [distanceUnit, setDistanceUnit] = useState('km');
  const [preferredRoutes, setPreferredRoutes] = useState(['Route A', 'Route C']);
  const [showBreakReminders, setShowBreakReminders] = useState(true);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save these settings to a backend
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Driver Settings</h1>
      
      {/* Settings Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab('account')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'account'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span className="flex items-center gap-2">
            <FiUser /> Account
          </span>
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'security'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span className="flex items-center gap-2">
            <FiShield /> Security
          </span>
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'notifications'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span className="flex items-center gap-2">
            <FiBell /> Notifications
          </span>
        </button>
        <button
          onClick={() => setActiveTab('driving')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'driving'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span className="flex items-center gap-2">
            <FaCar /> Driving Preferences
          </span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* Account Settings */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FiUser /> Account Settings
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded"
                      defaultValue="John Driver"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      className="w-full p-2 border border-gray-300 rounded"
                      defaultValue="driver@buslink.com"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full p-2 border border-gray-300 rounded"
                      defaultValue="+250 788 123 456"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Your phone number is used for emergency contacts and passenger communications.
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Profile Photo</label>
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        <FiUser size={24} />
                      </div>
                      <button type="button" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors">
                        Upload New Photo
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Language Preference</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                      <option value="rw">Kinyarwanda</option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="darkMode"
                      checked={darkMode}
                      onChange={() => setDarkMode(!darkMode)}
                      className="mr-2"
                    />
                    <label htmlFor="darkMode" className="text-gray-700">
                      Enable Dark Mode
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FiShield /> Security Settings
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Change Password</label>
                    <div className="space-y-2">
                      <input
                        type="password"
                        placeholder="Current Password"
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                      <input
                        type="password"
                        placeholder="New Password"
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                      <input
                        type="password"
                        placeholder="Confirm New Password"
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="2fa"
                      checked={twoFactorAuth}
                      onChange={() => setTwoFactorAuth(!twoFactorAuth)}
                      className="mr-2"
                    />
                    <label htmlFor="2fa" className="text-gray-700">
                      <span className="flex items-center gap-2">
                        <FiLock /> Enable Two-Factor Authentication
                      </span>
                    </label>
                  </div>

                  {twoFactorAuth && (
                    <div className="ml-6 p-4 bg-gray-50 rounded border border-gray-200">
                      <p className="text-sm text-gray-700 mb-2">
                        Two-factor authentication adds an extra layer of security to your account.
                        In addition to your password, you'll need to enter a code from your phone
                        when signing in.
                      </p>
                      <button
                        type="button"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                      >
                        Setup 2FA
                      </button>
                    </div>
                  )}

                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Recent Login Activity</h3>
                    <div className="border border-gray-200 rounded">
                      <div className="border-b border-gray-200 p-3">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">Kigali, Rwanda</p>
                            <p className="text-sm text-gray-500">Chrome on Windows</p>
                          </div>
                          <p className="text-sm text-gray-500">Today, 08:15 AM</p>
                        </div>
                      </div>
                      <div className="border-b border-gray-200 p-3">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">Kigali, Rwanda</p>
                            <p className="text-sm text-gray-500">BusLink Driver App</p>
                          </div>
                          <p className="text-sm text-gray-500">Yesterday, 05:30 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Privacy Settings</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="location-tracking" defaultChecked className="mr-2" />
                        <label htmlFor="location-tracking" className="text-gray-700">Allow location tracking while on duty</label>
                      </div>
                      <p className="text-sm text-gray-500 ml-6">
                        Required for route navigation and passenger pickup notifications.
                      </p>
                      
                      <div className="flex items-center mt-2">
                        <input type="checkbox" id="data-collection" defaultChecked className="mr-2" />
                        <label htmlFor="data-collection" className="text-gray-700">Allow driving data collection for performance insights</label>
                      </div>
                      <p className="text-sm text-gray-500 ml-6">
                        Used to provide you with feedback on driving patterns and efficiency.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FiBell /> Notification Settings
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive schedule changes and important updates via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={emailNotifications}
                        onChange={() => setEmailNotifications(!emailNotifications)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded">
                    <div>
                      <p className="font-medium">App Notifications</p>
                      <p className="text-sm text-gray-500">Receive in-app alerts and notifications</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notifications}
                        onChange={() => setNotifications(!notifications)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Notification Categories</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="notify-schedule" defaultChecked className="mr-2" />
                        <label htmlFor="notify-schedule" className="text-gray-700">Schedule Changes</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="notify-passengers" defaultChecked className="mr-2" />
                        <label htmlFor="notify-passengers" className="text-gray-700">Passenger Alerts</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="notify-maintenance" defaultChecked className="mr-2" />
                        <label htmlFor="notify-maintenance" className="text-gray-700">Maintenance Reminders</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="notify-performance" defaultChecked className="mr-2" />
                        <label htmlFor="notify-performance" className="text-gray-700">Performance Updates</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="notify-weather" defaultChecked className="mr-2" />
                        <label htmlFor="notify-weather" className="text-gray-700">Weather & Road Conditions</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Notification Sound</h3>
                    <select className="w-full p-2 border border-gray-300 rounded">
                      <option value="default">Default</option>
                      <option value="chime">Chime</option>
                      <option value="bell">Bell</option>
                      <option value="alert">Alert</option>
                      <option value="silent">Silent</option>
                    </select>
                    <button type="button" className="mt-2 text-primary hover:text-primary-dark text-sm">
                      Test Sound
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Driving Preferences */}
            {activeTab === 'driving' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FaCar /> Driving Preferences
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      <span className="flex items-center gap-2">
                        <FiMapPin /> Default Navigation App
                      </span>
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded">
                      <option value="builtin">BusLink Navigation (Default)</option>
                      <option value="maps">Google Maps</option>
                      <option value="waze">Waze</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">
                      <span className="flex items-center gap-2">
                        <FiClock /> Work Time Preferences
                      </span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-600 mb-1 block">Preferred Start Time</label>
                        <select className="w-full p-2 border border-gray-300 rounded">
                          <option value="5">5:00 AM</option>
                          <option value="6">6:00 AM</option>
                          <option value="7">7:00 AM</option>
                          <option value="8">8:00 AM</option>
                          <option value="9">9:00 AM</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 mb-1 block">Preferred End Time</label>
                        <select className="w-full p-2 border border-gray-300 rounded">
                          <option value="16">4:00 PM</option>
                          <option value="17">5:00 PM</option>
                          <option value="18">6:00 PM</option>
                          <option value="19">7:00 PM</option>
                          <option value="20">8:00 PM</option>
                        </select>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      These are preferences only and actual schedules may vary based on operational needs.
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">
                      <span className="flex items-center gap-2">
                        <FaGasPump /> Fuel Efficiency Monitoring
                      </span>
                    </label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="efficiency-monitoring"
                        defaultChecked
                        className="mr-2"
                      />
                      <label htmlFor="efficiency-monitoring" className="text-gray-700">
                        Enable real-time fuel efficiency feedback
                      </label>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 ml-6">
                      Receive audio notifications when driving patterns affect fuel efficiency.
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Distance Unit</label>
                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="km"
                          name="distanceUnit"
                          value="km"
                          checked={distanceUnit === 'km'}
                          onChange={() => setDistanceUnit('km')}
                          className="mr-2"
                        />
                        <label htmlFor="km">Kilometers (km)</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="miles"
                          name="distanceUnit"
                          value="miles"
                          checked={distanceUnit === 'miles'}
                          onChange={() => setDistanceUnit('miles')}
                          className="mr-2"
                        />
                        <label htmlFor="miles">Miles (mi)</label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Route Preferences</label>
                    <div className="border border-gray-200 p-3 rounded">
                      <p className="text-sm text-gray-600 mb-2">Select your preferred routes (when available):</p>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="route-a" 
                            checked={preferredRoutes.includes('Route A')}
                            onChange={() => {
                              if (preferredRoutes.includes('Route A')) {
                                setPreferredRoutes(preferredRoutes.filter(r => r !== 'Route A'));
                              } else {
                                setPreferredRoutes([...preferredRoutes, 'Route A']);
                              }
                            }}
                            className="mr-2" 
                          />
                          <label htmlFor="route-a">Route A: Downtown - Kimironko</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="route-b" 
                            checked={preferredRoutes.includes('Route B')}
                            onChange={() => {
                              if (preferredRoutes.includes('Route B')) {
                                setPreferredRoutes(preferredRoutes.filter(r => r !== 'Route B'));
                              } else {
                                setPreferredRoutes([...preferredRoutes, 'Route B']);
                              }
                            }}
                            className="mr-2" 
                          />
                          <label htmlFor="route-b">Route B: Nyabugogo - Remera</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="route-c" 
                            checked={preferredRoutes.includes('Route C')}
                            onChange={() => {
                              if (preferredRoutes.includes('Route C')) {
                                setPreferredRoutes(preferredRoutes.filter(r => r !== 'Route C'));
                              } else {
                                setPreferredRoutes([...preferredRoutes, 'Route C']);
                              }
                            }}
                            className="mr-2" 
                          />
                          <label htmlFor="route-c">Route C: Kacyiru - Downtown</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="route-d" 
                            checked={preferredRoutes.includes('Route D')}
                            onChange={() => {
                              if (preferredRoutes.includes('Route D')) {
                                setPreferredRoutes(preferredRoutes.filter(r => r !== 'Route D'));
                              } else {
                                setPreferredRoutes([...preferredRoutes, 'Route D']);
                              }
                            }}
                            className="mr-2" 
                          />
                          <label htmlFor="route-d">Route D: Kigali Heights - Gikondo</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Break Reminders</label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="break-reminders"
                        checked={showBreakReminders}
                        onChange={() => setShowBreakReminders(!showBreakReminders)}
                        className="mr-2"
                      />
                      <label htmlFor="break-reminders" className="text-gray-700">
                        Show reminders to take breaks during long shifts
                      </label>
                    </div>
                    {showBreakReminders && (
                      <div className="mt-2 ml-6">
                        <label className="text-sm text-gray-600 mb-1 block">Reminder Frequency (hours)</label>
                        <select className="w-full p-2 border border-gray-300 rounded">
                          <option value="2">Every 2 hours</option>
                          <option value="3">Every 3 hours</option>
                          <option value="4">Every 4 hours</option>
                          <option value="5">Every 5 hours</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md flex items-center gap-2"
              >
                <FiSave /> Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
