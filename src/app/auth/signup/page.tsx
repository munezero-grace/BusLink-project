import React from 'react';
import { FaUser, FaLock, FaEye, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="flex flex-col md:flex-row w-full">
      {/* Left section (blue background) - exactly 40% width */}
      <div className="w-full md:w-[40%] bg-primary-dark text-white flex flex-col justify-center p-8">
        <div className="max-w-xs mx-auto">
          <h2 className="text-2xl font-bold mb-4">welcome Back!</h2>
          <p className="text-sm mb-8">
            To keep connected with us please login with your personal info
          </p>
          <Link 
            href="/auth/login" 
            className="inline-block border-2 border-white text-white px-10 py-2 rounded-full text-center hover:bg-white hover:text-primary-dark transition-colors"
          >
            LOG IN
          </Link>
        </div>
      </div>
      
      {/* Right section (form) - exactly 60% width */}
      <div className="w-full md:w-[60%] flex flex-col justify-center p-8 bg-white">
        <div className="max-w-sm mx-auto">
          <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>
          
          {/* Signup Form */}
          <form>
            {/* Username Field */}
            <div className="mb-4">
              <div className="flex items-center bg-gray-200 rounded-md">
                <span className="pl-3 pr-2">
                  <FaUser className="text-gray-500" />
                </span>
                <input 
                  type="text" 
                  placeholder="user name"
                  className="w-full bg-gray-200 py-3 px-2 rounded-md focus:outline-none" 
                />
              </div>
            </div>
            
            {/* Email Field */}
            <div className="mb-4">
              <div className="flex items-center bg-gray-200 rounded-md">
                <span className="pl-3 pr-2">
                  <FaEnvelope className="text-gray-500" />
                </span>
                <input 
                  type="email" 
                  placeholder="Email or phone number"
                  className="w-full bg-gray-200 py-3 px-2 rounded-md focus:outline-none" 
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div className="mb-4">
              <div className="flex items-center bg-gray-200 rounded-md">
                <span className="pl-3 pr-2">
                  <FaLock className="text-gray-500" />
                </span>
                <input 
                  type="password" 
                  placeholder="Password"
                  className="w-full bg-gray-200 py-3 px-2 rounded-md focus:outline-none pr-10" 
                />
                <span className="pr-3 cursor-pointer">
                  <FaEye className="text-gray-500" />
                </span>
              </div>
            </div>
            
            {/* Confirm Password Field */}
            <div className="mb-6">
              <div className="flex items-center bg-gray-200 rounded-md">
                <span className="pl-3 pr-2">
                  <FaLock className="text-gray-500" />
                </span>
                <input 
                  type="password" 
                  placeholder="Confirm password"
                  className="w-full bg-gray-200 py-3 px-2 rounded-md focus:outline-none pr-10" 
                />
                <span className="pr-3 cursor-pointer">
                  <FaEye className="text-gray-500" />
                </span>
              </div>
            </div>
            
            {/* Sign Up Button */}
            <div className="mb-6">
              <button 
                type="submit" 
                className="w-full bg-blue-400 text-white py-2 rounded-full hover:bg-blue-500 transition-colors"
              >
                sign up
              </button>
            </div>
            
            {/* Social Signup */}
            <div className="flex justify-center space-x-4">
              <a href="#" className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a href="#" className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M7 11v2.4h3.97c-.16 1.03-1.2 3.02-3.97 3.02-2.39 0-4.34-1.98-4.34-4.42s1.95-4.42 4.34-4.42c1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.72-2.84 6.72-6.84 0-.46-.05-.81-.11-1.16h-6.61z" />
                  <path d="M21 11h-2v-2h-2v2h-2v2h2v2h2v-2h2z" />
                </svg>
              </a>
              <a href="#" className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
