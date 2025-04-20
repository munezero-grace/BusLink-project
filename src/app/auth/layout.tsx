import React from 'react';
import './auth.css';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto shadow-xl rounded-none overflow-hidden">
        {children}
      </div>
    </div>
  );
}
