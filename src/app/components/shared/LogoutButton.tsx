'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaSignOutAlt } from 'react-icons/fa';

interface LogoutButtonProps {
  variant?: 'icon' | 'text' | 'full';
  className?: string;
}

const LogoutButton = ({ variant = 'full', className = '' }: LogoutButtonProps) => {
  const router = useRouter();

  const handleLogout = () => {
    // In a real application, you would call an API to invalidate the session
    // or use a library like next-auth to sign out
    
    // For now, we'll just simulate a logout by redirecting to the login page
    localStorage.removeItem('buslink-auth-token'); // Remove any stored auth tokens
    router.push('/auth/login');
  };

  // Render different variants of the button
  if (variant === 'icon') {
    return (
      <button 
        onClick={handleLogout}
        className={`text-gray-500 hover:text-red-500 transition-colors p-2 ${className}`}
        aria-label="Logout"
        title="Logout"
      >
        <FaSignOutAlt />
      </button>
    );
  }

  if (variant === 'text') {
    return (
      <button 
        onClick={handleLogout}
        className={`text-gray-500 hover:text-red-500 transition-colors ${className}`}
      >
        Logout
      </button>
    );
  }

  // Default full variant
  return (
    <button 
      onClick={handleLogout}
      className={`flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-red-500 transition-colors ${className}`}
    >
      <FaSignOutAlt /> Logout
    </button>
  );
};

export default LogoutButton;
