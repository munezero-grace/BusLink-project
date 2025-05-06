'use client';

import React, { useState } from 'react';
import { FiSave, FiGlobe, FiUser, FiBell, FiShield, FiDatabase, FiLock } from 'react-icons/fi';

export default function Settings() {
  // States for form controls
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [dataRetention, setDataRetention] = useState('90');
  const [darkMode, setDarkMode] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [activeTab, setActiveTab] = useState('account');

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save these settings to a backend
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      {/* Settings Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab('account')}
          className={`px-4 py-2 font-medium ${
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
          className={`px-4 py-2 font-medium ${
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
          className={`px-4 py-2 font-medium ${
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
          onClick={() => setActiveTab('system')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'system'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span className="flex items-center gap-2">
            <FiDatabase /> System
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
                      defaultValue="Admin User"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      className="w-full p-2 border border-gray-300 rounded"
                      defaultValue="admin@buslink.rw"
                    />
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
                    <label className="block text-gray-700 mb-2">
                      <span className="flex items-center gap-2">
                        <FiGlobe /> Language Preference
                      </span>
                    </label>
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
                          <p className="text-sm text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                      <div className="border-b border-gray-200 p-3">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">Kigali, Rwanda</p>
                            <p className="text-sm text-gray-500">Safari on iOS</p>
                          </div>
                          <p className="text-sm text-gray-500">Yesterday</p>
                        </div>
                      </div>
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
                      <p className="text-sm text-gray-500">Receive email alerts for important updates</p>
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
                      <p className="font-medium">System Notifications</p>
                      <p className="text-sm text-gray-500">Receive in-app notifications</p>
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
                        <input type="checkbox" id="notify-bookings" defaultChecked className="mr-2" />
                        <label htmlFor="notify-bookings" className="text-gray-700">Bookings</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="notify-drivers" defaultChecked className="mr-2" />
                        <label htmlFor="notify-drivers" className="text-gray-700">Driver Updates</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="notify-routes" defaultChecked className="mr-2" />
                        <label htmlFor="notify-routes" className="text-gray-700">Route Changes</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="notify-system" defaultChecked className="mr-2" />
                        <label htmlFor="notify-system" className="text-gray-700">System Alerts</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* System Settings */}
            {activeTab === 'system' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FiDatabase /> System Settings
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Data Retention Period (Days)</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded"
                      value={dataRetention}
                      onChange={(e) => setDataRetention(e.target.value)}
                    >
                      <option value="30">30 days</option>
                      <option value="60">60 days</option>
                      <option value="90">90 days</option>
                      <option value="180">180 days</option>
                      <option value="365">365 days</option>
                    </select>
                    <p className="text-sm text-gray-500 mt-1">
                      Historical data will be retained for this period before being archived.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">System Backups</h3>
                    <div className="p-3 border border-gray-200 rounded">
                      <p className="text-sm text-gray-600 mb-2">Last backup: May 5, 2025 at 12:34 AM</p>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                        >
                          Backup Now
                        </button>
                        <button
                          type="button"
                          className="px-3 py-1 bg-gray-200 text-gray-800 rounded text-sm hover:bg-gray-300"
                        >
                          Configure Schedule
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">API Integration</h3>
                    <div className="p-3 border border-gray-200 rounded">
                      <p className="text-sm text-gray-600 mb-2">API Key:</p>
                      <div className="flex space-x-2 mb-3">
                        <input
                          type="text"
                          value="••••••••••••••••••••••••••••••"
                          readOnly
                          className="flex-1 p-2 bg-gray-100 border border-gray-300 rounded"
                        />
                        <button
                          type="button"
                          className="px-3 py-1 bg-gray-200 text-gray-800 rounded text-sm hover:bg-gray-300"
                        >
                          Reveal
                        </button>
                        <button
                          type="button"
                          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                        >
                          Regenerate
                        </button>
                      </div>
                      <p className="text-sm text-gray-500">
                        This API key provides access to the BusLink API. Keep it secure.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">System Maintenance</h3>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        className="px-3 py-1 bg-gray-200 text-gray-800 rounded text-sm hover:bg-gray-300"
                      >
                        Clear Cache
                      </button>
                      <button
                        type="button"
                        className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
                      >
                        Rebuild Index
                      </button>
                      <button
                        type="button"
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                      >
                        Maintenance Mode
                      </button>
                    </div>
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
