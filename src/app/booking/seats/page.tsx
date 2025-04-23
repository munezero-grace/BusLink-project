"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
// Removing the react-hot-toast import and using a simple alert instead
import BusLayoutComponent from './components/BusLayoutComponent';
import BookingSummaryComponent from './components/BookingSummaryComponent';

// Define seat interface
interface Seat {
  id: number;
  seatNumber: string;
  isBooked: boolean;
  isSelected: boolean;
  position: 'window' | 'aisle' | 'driver' | 'single';
  row: number;
  col: number;
}

// Define bus interface
interface Bus {
  id: string;
  name: string;
  totalSeats: number;
  bookedSeats: number[];
  price: number;
  departureTime: string;
}

// Generate mock bus data (in a real app, this would come from an API)
const mockBusData: Bus = {
  id: "bus-123",
  name: "Kigali Express",
  totalSeats: 36,
  bookedSeats: [2, 5, 12, 18, 24, 30],
  price: 2500,
  departureTime: "10:30 AM"
};

export default function SeatSelectionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const routeId = searchParams.get('routeId') || "Unknown Route";
  const busId = searchParams.get('busId') || "bus-123";
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
  
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [busData, setBusData] = useState<Bus | null>(null);
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error' | 'info' | ''}>({
    text: '', 
    type: ''
  });

  // Generate a realistic bus seat layout
  const generateBusLayout = (busInfo: Bus): Seat[] => {
    const layout: Seat[] = [];
    const rowCount = 9; // 9 rows of seats
    
    // Generate seats with proper layout information
    for (let row = 0; row < rowCount; row++) {
      // Left side (window, then aisle)
      layout.push({
        id: row * 4 + 1,
        seatNumber: (row * 4 + 1).toString(),
        isBooked: busInfo.bookedSeats.includes(row * 4 + 1),
        isSelected: false,
        position: 'window',
        row: row,
        col: 0
      });
      
      layout.push({
        id: row * 4 + 2,
        seatNumber: (row * 4 + 2).toString(),
        isBooked: busInfo.bookedSeats.includes(row * 4 + 2),
        isSelected: false,
        position: 'aisle',
        row: row,
        col: 1
      });
      
      // Right side (aisle, then window)
      layout.push({
        id: row * 4 + 3,
        seatNumber: (row * 4 + 3).toString(),
        isBooked: busInfo.bookedSeats.includes(row * 4 + 3),
        isSelected: false,
        position: 'aisle',
        row: row,
        col: 2
      });
      
      layout.push({
        id: row * 4 + 4,
        seatNumber: (row * 4 + 4).toString(),
        isBooked: busInfo.bookedSeats.includes(row * 4 + 4),
        isSelected: false,
        position: 'window',
        row: row,
        col: 3
      });
    }
    
    return layout;
  };

  // Initialize seats
  useEffect(() => {
    // In a real app, you would fetch this data from your API
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const busInfo = mockBusData;
      setBusData(busInfo);
      
      // Generate seats with realistic layout
      const generatedSeats = generateBusLayout(busInfo);
      
      setSeats(generatedSeats);
      setIsLoading(false);
    }, 1000);
  }, [busId]);

  // Clear message after 3 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({text: '', type: ''});
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Handle seat selection
  const handleSeatSelect = (seatId: number) => {
    const updatedSeats = seats.map(seat => {
      if (seat.id === seatId && !seat.isBooked) {
        // Toggle selection
        return { ...seat, isSelected: !seat.isSelected };
      }
      return seat;
    });

    setSeats(updatedSeats);

    // Update selected seats array
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  // Confirm booking
  const handleConfirmBooking = async () => {
    if (selectedSeats.length === 0) {
      setMessage({
        text: "Please select at least one seat",
        type: "error"
      });
      return;
    }

    setIsLoading(true);

    try {
      // In a real app, you would make an API call here
      console.log("Booking seats:", selectedSeats);
      console.log("Route ID:", routeId);
      console.log("Bus ID:", busId);
      console.log("Date:", date);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessage({
        text: "Seats booked successfully!",
        type: "success"
      });
      
      // Redirect to booking confirmation page after a short delay
      setTimeout(() => {
        router.push(`/booking/confirmation?seats=${selectedSeats.join(',')}&busId=${busId}&routeId=${routeId}&date=${date}`);
      }, 1000);
      
    } catch (error) {
      console.error("Error booking seats:", error);
      setMessage({
        text: "Failed to book seats. Please try again.",
        type: "error"
      });
      setIsLoading(false);
    }
  };

  // Message component
  const MessageComponent = () => {
    if (!message.text) return null;
    
    const bgColor = message.type === 'success' ? 'bg-green-100 border-green-500' : 
                   message.type === 'error' ? 'bg-red-100 border-red-500' : 
                   'bg-blue-100 border-blue-500';
                   
    const textColor = message.type === 'success' ? 'text-green-700' : 
                     message.type === 'error' ? 'text-red-700' : 
                     'text-blue-700';
    
    return (
      <div className={`fixed top-5 right-5 p-3 rounded border ${bgColor} ${textColor} shadow-md z-50`}>
        {message.text}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Message Notification */}
      <MessageComponent />
      
      {/* Header */}
      <div className="bg-primary-dark text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">BusLink</h1>
        </div>
      </div>
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Link href="/booking" className="text-blue-600 hover:text-blue-800 flex items-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </Link>
          <h1 className="text-3xl font-bold">Select Your Seats</h1>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Bus Details */}
            <div>
              {busData && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-2xl font-semibold mb-4">{busData.name}</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-700">
                      <span>Route:</span>
                      <span className="font-medium">{routeId}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Date:</span>
                      <span className="font-medium">{new Date(date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Departure:</span>
                      <span className="font-medium">{busData.departureTime}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Price per seat:</span>
                      <span className="font-medium">{busData.price} RWF</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Seat Legend */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold mb-4">Seat Legend</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                      <span>1</span>
                    </div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-500 text-white rounded flex items-center justify-center">
                      <span>2</span>
                    </div>
                    <span>Booked</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 text-white rounded flex items-center justify-center">
                      <span>3</span>
                    </div>
                    <span>Selected</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle and Right Columns: Bus Layout and Booking Actions */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                {/* Bus Layout Component */}
                <BusLayoutComponent seats={seats} onSeatSelect={handleSeatSelect} />

                {/* Booking Summary Component */}
                <BookingSummaryComponent 
                  selectedSeats={selectedSeats} 
                  pricePerSeat={busData?.price || 0} 
                />

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <button 
                    onClick={() => router.back()}
                    className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleConfirmBooking}
                    disabled={selectedSeats.length === 0 || isLoading}
                    className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ${
                      (selectedSeats.length === 0 || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? 'Processing...' : 'Confirm Booking'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
