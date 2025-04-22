'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [destination, setDestination] = useState('');
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showRouteSelection, setShowRouteSelection] = useState(true);
  
  useEffect(() => {
    // Get route from URL params if available
    const routeParam = searchParams.get('route');
    if (routeParam) {
      setDestination(routeParam);
      setShowRouteSelection(false);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the booking submission here
    console.log({
      destination,
      fullName,
      contact,
      paymentMethod
    });
    // You can add API call to submit the booking data
    
    // Show success message or redirect to confirmation page
    alert('Booking submitted successfully!');
  };

  const goToRouteSelection = () => {
    router.push('/booking/routes');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-primary-dark text-white">
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-6">BusLink</h2>
          <nav className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 p-2 rounded hover:bg-primary/20">
              <span>🏠</span>
              <span>Home</span>
            </Link>
            <Link href="/booking" className="flex items-center space-x-2 p-2 rounded bg-primary/30">
              <span>🕒</span>
              <span>Set your time</span>
            </Link>
            <div className="border-t border-primary/30 my-4"></div>
            <Link href="/help" className="flex items-center space-x-2 p-2 rounded hover:bg-primary/20">
              <span>❓</span>
              <span>Get help</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      {showRouteSelection ? (
        <div className="flex-1 p-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6 italic">Select Your Route</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="mb-4">Please select a route to continue with your booking.</p>
              <button 
                onClick={goToRouteSelection}
                className="bg-primary hover:bg-primary-light text-white px-6 py-2 rounded-full transition-colors duration-300"
              >
                View Available Routes
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 p-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6 italic">Your Next journey awaits</h1>
            
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                <div className="relative">
                  <input 
                    id="destination"
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded"
                    required
                    readOnly
                  />
                  <div 
                    className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer" 
                    onClick={goToRouteSelection}
                  >
                    <span className="text-primary-dark">Change</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full names</label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="block w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                <input
                  id="contact"
                  type="tel"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="block w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">Payment method</label>
                <div className="relative">
                  <select 
                    id="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded pr-10"
                    required
                  >
                    <option value="">Select payment method</option>
                    <option value="momo">MTN Mobile Money</option>
                    <option value="airtel">Airtel Money</option>
                    <option value="card">Credit/Debit Card</option>
                    <option value="cash">Cash on Boarding</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <span className="text-gray-500">•</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-light text-white px-6 py-2 rounded-full transition-colors duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
