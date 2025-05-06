'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaTachometerAlt, 
  FaTicketAlt, 
  FaHistory, 
  FaMapMarkedAlt, 
  FaCreditCard, 
  FaCog, 
  FaQuestionCircle, 
  FaMoon, 
  FaSun, 
  FaBell, 
  FaSearch,
  FaUserCircle
} from 'react-icons/fa';
import LogoutButton from '@/app/components/shared/LogoutButton';

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === `/dashboard/user${path}`;
  };

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
      {/* Sidebar */}
      <div className="w-64 bg-primary-dark text-white flex flex-col">
        {/* Logo */}
        <div className="p-5 border-b border-gray-700">
          <Link href="/dashboard/user" className="flex items-center">
            <h1 className="text-white text-2xl font-bold">BUS <span className="text-blue-400">link</span></h1>
          </Link>
        </div>
        
        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul>
            <li>
              <Link 
                href="/dashboard/user" 
                className={`flex items-center px-5 py-3 hover:bg-primary transition-colors ${isActive('') ? 'bg-primary' : ''}`}
              >
                <FaTachometerAlt className="mr-3" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard/user/bookings" 
                className={`flex items-center px-5 py-3 hover:bg-primary transition-colors ${isActive('/bookings') ? 'bg-primary' : ''}`}
              >
                <FaTicketAlt className="mr-3" />
                <span>My Bookings</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard/user/history" 
                className={`flex items-center px-5 py-3 hover:bg-primary transition-colors ${isActive('/history') ? 'bg-primary' : ''}`}
              >
                <FaHistory className="mr-3" />
                <span>Travel History</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard/user/routes" 
                className={`flex items-center px-5 py-3 hover:bg-primary transition-colors ${isActive('/routes') ? 'bg-primary' : ''}`}
              >
                <FaMapMarkedAlt className="mr-3" />
                <span>Routes</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard/user/payment" 
                className={`flex items-center px-5 py-3 hover:bg-primary transition-colors ${isActive('/payment') ? 'bg-primary' : ''}`}
              >
                <FaCreditCard className="mr-3" />
                <span>Payment Methods</span>
              </Link>
            </li>
          </ul>
          
          <div className="border-t border-gray-700 my-4"></div>
          
          <ul>
            <li>
              <Link 
                href="/dashboard/user/profile" 
                className={`flex items-center px-5 py-3 hover:bg-primary transition-colors ${isActive('/profile') ? 'bg-primary' : ''}`}
              >
                <FaUserCircle className="mr-3" />
                <span>My Profile</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard/user/settings" 
                className={`flex items-center px-5 py-3 hover:bg-primary transition-colors ${isActive('/settings') ? 'bg-primary' : ''}`}
              >
                <FaCog className="mr-3" />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard/user/help" 
                className={`flex items-center px-5 py-3 hover:bg-primary transition-colors ${isActive('/help') ? 'bg-primary' : ''}`}
              >
                <FaQuestionCircle className="mr-3" />
                <span>Help center</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* Theme Toggle and Logout */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center justify-between bg-gray-700 rounded-full p-1 mb-3">
            <button 
              onClick={() => setDarkMode(false)}
              className={`flex items-center justify-center rounded-full p-2 ${!darkMode ? 'bg-blue-400 text-white' : 'text-gray-400'}`}
            >
              <FaSun className="text-sm" />
              <span className="ml-2 text-sm">Light</span>
            </button>
            <button 
              onClick={() => setDarkMode(true)}
              className={`flex items-center justify-center rounded-full p-2 ${darkMode ? 'bg-blue-400 text-white' : 'text-gray-400'}`}
            >
              <FaMoon className="text-sm" />
              <span className="ml-2 text-sm">Dark</span>
            </button>
          </div>
          
          {/* Logout Button in Sidebar */}
          <LogoutButton 
            variant="full" 
            className="w-full bg-gray-700 hover:bg-gray-600 text-white hover:text-white"
          />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className={`shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center p-4">
            {/* Search bar */}
            <div className="relative w-64">
              <input 
                type="text" 
                placeholder="Search for routes, bookings..." 
                className={`w-full pl-10 pr-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 border-gray-300'} border`}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            
            {/* User Profile, Notifications and Logout */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2">
                <FaBell className="text-gray-500" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center">
                <img 
                  src="https://via.placeholder.com/40" 
                  alt="User" 
                  className="w-8 h-8 rounded-full mr-2" 
                />
                <div>
                  <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>John User</p>
                  <p className="text-xs text-gray-500">user@example.com</p>
                </div>
              </div>
              {/* Logout Button in Header (Icon Only) */}
              <LogoutButton variant="icon" />
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
