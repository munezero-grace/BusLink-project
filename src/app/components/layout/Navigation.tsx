import Link from 'next/link';
import React from 'react';

const Navigation = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary">
                BusLink
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className="border-transparent text-gray-500 hover:border-primary hover:text-primary px-1 pt-1 border-b-2 text-sm font-medium">
                Home
              </Link>
              <Link href="/routes" className="border-transparent text-gray-500 hover:border-primary hover:text-primary px-1 pt-1 border-b-2 text-sm font-medium">
                Routes
              </Link>
              <Link href="/tracking" className="border-transparent text-gray-500 hover:border-primary hover:text-primary px-1 pt-1 border-b-2 text-sm font-medium">
                Track Bus
              </Link>
              <Link href="/contact" className="border-transparent text-gray-500 hover:border-primary hover:text-primary px-1 pt-1 border-b-2 text-sm font-medium">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link href="/auth/login" className="text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Login
            </Link>
            <Link href="/auth/signup" className="bg-primary text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600">
              Sign Up
            </Link>
          </div>
          <div className="flex items-center sm:hidden">
            <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
              <span className="sr-only">Open main menu</span>
              {/* Icon for menu */}
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
