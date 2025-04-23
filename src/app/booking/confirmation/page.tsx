"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface BookingDetails {
  seats: string[];
  busId: string;
  routeId: string;
  date: string;
  confirmationCode: string;
  totalPrice: number;
}

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const seats = searchParams.get('seats')?.split(',') || [];
    const busId = searchParams.get('busId');
    const routeId = searchParams.get('routeId');
    const date = searchParams.get('date');

    if (!seats.length || !busId || !routeId || !date) {
      // If any required parameters are missing, redirect to booking page
      router.push('/booking');
      return;
    }

    // In a real app, you would fetch confirmation details from an API
    // Here we're simulating that with a timeout
    setTimeout(() => {
      setBookingDetails({
        seats,
        busId,
        routeId,
        date,
        confirmationCode: `BL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        totalPrice: seats.length * 2500, // 2500 RWF per seat
      });
      setIsLoading(false);
    }, 1000);
  }, [searchParams, router]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Booking Confirmation</h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : bookingDetails ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-100 rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-center mb-6">Booking Successful!</h2>
          
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-center text-lg font-semibold mb-2">Confirmation Code</p>
            <p className="text-center text-2xl font-bold text-blue-700 mb-2">{bookingDetails.confirmationCode}</p>
            <p className="text-center text-sm text-gray-500">Please save this code for reference</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Bus ID:</span>
              <span>{bookingDetails.busId}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Route:</span>
              <span>{bookingDetails.routeId}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Date:</span>
              <span>{bookingDetails.date}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Seats:</span>
              <span>{bookingDetails.seats.join(', ')}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total Amount:</span>
              <span>{bookingDetails.totalPrice} RWF</span>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-gray-600 mb-4">
              Your booking has been confirmed. You can track your bus in real-time before your departure.
            </p>
            
            <div className="flex gap-4 flex-wrap">
              <Link 
                href={`/tracking?bookingCode=${bookingDetails.confirmationCode}`}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded text-center hover:bg-blue-700 transition"
              >
                Track Your Bus
              </Link>
              <Link 
                href="/dashboard/user"
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded text-center hover:bg-gray-300 transition"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-red-500 mb-4">Something went wrong with your booking</p>
          <Link 
            href="/booking"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Return to Booking
          </Link>
        </div>
      )}
    </div>
  );
}
