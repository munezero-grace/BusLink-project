"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaCheckCircle, FaTicketAlt, FaMapMarkerAlt, FaBus, FaCalendarAlt, FaClock, FaQrcode, FaDownload, FaPrint, FaShare, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

// Mock bus data
const mockBusData = {
  "bus-123": {
    id: "bus-123",
    name: "Kigali Express",
    departureTime: "10:30 AM",
    arrivalTime: "12:45 PM",
    price: 2500,
    type: "standard"
  }
};

// Mock route data
const mockRouteData = {
  "route-456": {
    id: "route-456",
    from: "Kigali",
    to: "Nyagatare",
    distance: "98 km",
    duration: "2h 15m"
  }
};

export default function ConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const seats = searchParams.get('seats')?.split(',') || [];
  const busId = searchParams.get('busId') || '';
  const routeId = searchParams.get('routeId') || '';
  const date = searchParams.get('date') || '';
  
  const [confirmationNumber, setConfirmationNumber] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState<'confirmed' | 'pending' | 'failed'>('pending');
  const [busInfo, setBusInfo] = useState<any>(null);
  const [routeInfo, setRouteInfo] = useState<any>(null);
  
  // Generate a random confirmation number
  useEffect(() => {
    const generateConfirmationNumber = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };
    
    // Simulate API call to confirm booking
    setIsLoading(true);
    setTimeout(() => {
      setConfirmationNumber(generateConfirmationNumber());
      setBusInfo(mockBusData[busId as keyof typeof mockBusData]);
      setRouteInfo(mockRouteData[routeId as keyof typeof mockRouteData]);
      setBookingStatus('confirmed');
      setIsLoading(false);
    }, 2000);
  }, [busId, routeId]);
  
  // Calculate total cost
  const totalCost = seats.length * (busInfo?.price || 0);
  const serviceFee = Math.ceil(totalCost * 0.05);
  const grandTotal = totalCost + serviceFee;
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Processing Your Booking</h2>
        <p className="text-gray-500">Please wait while we confirm your reservation...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary-dark text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">BusLink</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm hidden md:inline-block">Support: +250 788 123 456</span>
            <Link href="/contact" className="text-sm bg-primary px-3 py-1 rounded hover:bg-primary-light transition-colors">
              Help
            </Link>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto py-8 px-4">
        {/* Status Banner */}
        <div className={`w-full p-4 mb-8 rounded-lg flex items-center 
          ${bookingStatus === 'confirmed' ? 'bg-green-100 text-green-800' : 
            bookingStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
            'bg-red-100 text-red-800'}`}>
          {bookingStatus === 'confirmed' && (
            <>
              <FaCheckCircle className="text-green-600 text-2xl mr-3" />
              <div>
                <h2 className="font-bold text-lg">Booking Confirmed!</h2>
                <p>Your seats are reserved. Please arrive at least 30 minutes before departure.</p>
              </div>
            </>
          )}
        </div>
        
        {/* E-Ticket Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 max-w-3xl mx-auto border-t-4 border-primary">
          {/* Ticket Header */}
          <div className="bg-gray-50 p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FaTicketAlt className="text-primary text-2xl mr-3" />
                <h2 className="text-2xl font-bold">E-Ticket</h2>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Confirmation #</div>
                <div className="font-mono font-bold text-lg">{confirmationNumber}</div>
              </div>
            </div>
          </div>
          
          {/* Ticket Body */}
          <div className="p-6">
            {/* Journey Details */}
            <div className="flex flex-col md:flex-row md:items-center mb-6 pb-6 border-b border-gray-200">
              <div className="flex-1">
                <div className="flex items-start mb-4">
                  <FaMapMarkerAlt className="text-gray-500 mt-1 mr-2" />
                  <div>
                    <div className="text-sm text-gray-500">From</div>
                    <div className="font-semibold text-lg">{routeInfo?.from}</div>
                  </div>
                </div>
                
                {/* Direction arrow */}
                <div className="flex justify-start my-2 pl-6">
                  <div className="w-20 h-0.5 bg-gray-300 relative">
                    <div className="absolute -right-2 -top-1.5 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-gray-300"></div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-gray-500 mt-1 mr-2" />
                  <div>
                    <div className="text-sm text-gray-500">To</div>
                    <div className="font-semibold text-lg">{routeInfo?.to}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 mt-4 md:mt-0 md:ml-10">
                <div className="flex items-start mb-4">
                  <FaCalendarAlt className="text-gray-500 mt-1 mr-2" />
                  <div>
                    <div className="text-sm text-gray-500">Date</div>
                    <div className="font-semibold">{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaClock className="text-gray-500 mt-1 mr-2" />
                  <div>
                    <div className="text-sm text-gray-500">Departure Time</div>
                    <div className="font-semibold">{busInfo?.departureTime}</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bus & Seat Details */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 mb-4 md:mb-0">
                  <div className="flex items-start">
                    <FaBus className="text-gray-500 mt-1 mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Bus</div>
                      <div className="font-semibold">{busInfo?.name}</div>
                      <div className="text-sm text-gray-500 mt-1 capitalize">Type: {busInfo?.type}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start">
                    <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-1">
                      <span className="text-xs">S</span>
                    </span>
                    <div>
                      <div className="text-sm text-gray-500">Seats</div>
                      <div className="font-semibold">{seats.join(', ')}</div>
                      <div className="text-sm text-gray-500 mt-1">Total: {seats.length} seat(s)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Details */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="font-semibold mb-4">Payment Details</h3>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Ticket Price:</span>
                <span>{(busInfo?.price || 0).toLocaleString()} RWF × {seats.length}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span>{totalCost.toLocaleString()} RWF</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Service Fee:</span>
                <span>{serviceFee.toLocaleString()} RWF</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200">
                <span>Total:</span>
                <span>{grandTotal.toLocaleString()} RWF</span>
              </div>
            </div>
            
            {/* QR Code */}
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="bg-gray-100 p-4 rounded-lg mb-2">
                <FaQrcode className="text-6xl" />
              </div>
              <div className="text-center text-sm text-gray-500">
                <p>Scan this QR code at the terminal</p>
                <p>or show your booking confirmation number</p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              <button className="flex items-center px-4 py-2 bg-primary text-white rounded hover:bg-primary-light transition">
                <FaDownload className="mr-2" /> Download Ticket
              </button>
              <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition">
                <FaPrint className="mr-2" /> Print
              </button>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                <FaShare className="mr-2" /> Share
              </button>
            </div>
          </div>
        </div>
        
        {/* Additional Information */}
        <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto mb-8">
          <h3 className="font-semibold mb-4 text-lg">Important Information</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              Please arrive at the terminal at least 30 minutes before departure.
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              Carry a valid ID for verification.
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              Each passenger is allowed one piece of luggage (max 20kg) and one carry-on item.
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              Cancellations made 24 hours before departure are eligible for a refund.
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              You can track your bus 30 minutes before departure time.
            </li>
          </ul>
        </div>
        
        {/* Need Help? */}
        <div className="bg-gray-100 rounded-lg p-6 max-w-3xl mx-auto text-center">
          <h3 className="font-semibold mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">If you have any questions or need assistance, please contact us.</p>
          <div className="flex justify-center gap-4">
            <a href="tel:+250788123456" className="flex items-center text-primary">
              <FaPhoneAlt className="mr-1" /> +250 788 123 456
            </a>
            <a href="mailto:support@buslink.rw" className="flex items-center text-primary">
              <FaEnvelope className="mr-1" /> support@buslink.rw
            </a>
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/tracking" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-center">
            Track Your Bus
          </Link>
          <Link href="/booking" className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition text-center">
            Book Another Trip
          </Link>
          <Link href="/" className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition text-center">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}