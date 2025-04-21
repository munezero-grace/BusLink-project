'use client';

import React from 'react';
import Link from 'next/link';

export default function DriverDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-primary-dark mb-6">Driver Dashboard</h1>
      <p className="text-gray-600 mb-8">This page is under construction. The driver dashboard will be implemented in a future update.</p>
      <Link 
        href="/auth/login" 
        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-light transition-colors"
      >
        Back to Login
      </Link>
    </div>
  );
}
