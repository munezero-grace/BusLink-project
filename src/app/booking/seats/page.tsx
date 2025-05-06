"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaInfo, FaRegClock, FaBus, FaMapMarkerAlt } from 'react-icons/fa';
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
  isPremium?: boolean;
  isAccessible?: boolean;
}

// Define bus interface
interface Bus {
  id: string;
  name: string;
  totalSeats: number;
  bookedSeats: number[];
  price: number;
  departureTime: string;
  arrivalTime: string;
  busType: 'standard' | 'premium' | 'executive';
  amenities: string[];
}

// Define route interface
interface Route {
  id: string;
  from: string;
  to: string;
  distance: string;
  duration: string;
}

// Generate mock bus data (in a real app, this would come from an API)
const mockBusData: Bus = {
  id: "bus-123",
  name: "Kigali Express",
  totalSeats: 36,
  bookedSeats: [2, 5, 12, 18, 24, 30],
  price: 2500,
  departureTime: "10:30 AM",
  arrivalTime: "12:45 PM",
  busType: "standard",
  amenities: ["Air Conditioning", "WiFi", "USB Charging"]
};

// Generate mock route data
const mockRouteData: Route = {
  id: "route-456",
  from: "Kigali",
  to: "Nyagatare",
  distance: "98 km",
  duration: "2h 15m"
};

export default function SeatSelectionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const routeId = searchParams.get('routeId') || "route-456";
  const busId = searchParams.get('busId') || "bus-123";
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
  
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [busData, setBusData] = useState<Bus | null>(null);
  const [routeData, setRouteData] = useState<Route | null>(null);
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error' | 'info' | ''}>({
    text: '', 
    type: ''
  });
  const [step, setStep] = useState<'select' | 'payment'>('select');

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
        col: 0,
        isPremium: row < 2, // First two rows are premium
        isAccessible: row === 8 && (row * 4 + 1) % 4 === 1 // Some accessible seats
      });
      
      layout.push({
        id: row * 4 + 2,
        seatNumber: (row * 4 + 2).toString(),
        isBooked: busInfo.bookedSeats.includes(row * 4 + 2),
        isSelected: false,
        position: 'aisle',
        row: row,
        col: 1,
        isPremium: row < 2
      });
      
      // Right side (aisle, then window)
      layout.push({
        id: row * 4 + 3,
        seatNumber: (row * 4 + 3).toString(),
        isBooked: busInfo.bookedSeats.includes(row * 4 + 3),
        isSelected: false,
        position: 'aisle',
        row: row,
        col: 2,
        isPremium: row < 2
      });
      
      layout.push({
        id: row * 4 + 4,
        seatNumber: (row * 4 + 4).toString(),
        isBooked: busInfo.bookedSeats.includes(row * 4 + 4),
        isSelected: false,
        position: 'window',
        row: row,
        col: 3,
        isPremium: row < 2,
        isAccessible: row === 8 && (row * 4 + 4) % 4 === 0
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
      setRouteData(mockRouteData);
      
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
    // Maximum of 5 seats per booking
    if (selectedSeats.length >= 5 && !selectedSeats.includes(seatId)) {
      setMessage({
        text: "Maximum of 5 seats per booking",
        type: "error"
      });
      return;
    }

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

  // Handle next step
  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) {
      setMessage({
        text: "Please select at least one seat",
        type: "error"
      });
      return;
    }
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <div className={`fixed top-5 right-5 p-3 rounded border ${bgColor} ${textColor} shadow-md z-50 animate-fadeIn`}>
        {message.text}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Message Notification */}
      <MessageComponent />
      
      {/* Header */}
      <div className="bg-primary-dark text-white p-4 sticky top-0 z-30 shadow-md">
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
        {/* Booking Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">1</div>
                <span className="text-xs mt-1">Search</span>
              </div>
              <div className="h-1 w-12 bg-primary mx-1"></div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">2</div>
                <span className="text-xs mt-1">Select</span>
              </div>
              <div className="h-1 w-12 bg-primary mx-1"></div>
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'payment' ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'}`}>3</div>
                <span className="text-xs mt-1">Payment</span>
              </div>
              <div className="h-1 w-12 bg-gray-300 mx-1"></div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center">4</div>
                <span className="text-xs mt-1">Confirm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center mb-6">
          <Link href="/booking" className="text-blue-600 hover:text-blue-800 flex items-center mr-3">
            <FaArrowLeft className="mr-1" />
            Back
          </Link>
          <h1 className="text-3xl font-bold">
            {step === 'select' ? 'Select Your Seats' : 'Payment Details'}
          </h1>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Route & Bus Details */}
            <div>
              {/* Route Information */}
              {routeData && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <FaMapMarkerAlt className="text-primary mr-2" />
                    Route Information
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="min-w-[80px] text-gray-600">From:</div>
                      <div className="font-medium">{routeData.from}</div>
                    </div>
                    <div className="flex items-start">
                      <div className="min-w-[80px] text-gray-600">To:</div>
                      <div className="font-medium">{routeData.to}</div>
                    </div>
                    <div className="flex items-start">
                      <div className="min-w-[80px] text-gray-600">Date:</div>
                      <div className="font-medium">{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    </div>
                    <div className="flex items-start">
                      <div className="min-w-[80px] text-gray-600">Distance:</div>
                      <div className="font-medium">{routeData.distance}</div>
                    </div>
                    <div className="flex items-start">
                      <div className="min-w-[80px] text-gray-600">Duration:</div>
                      <div className="font-medium">{routeData.duration}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bus Details */}
              {busData && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <FaBus className="text-primary mr-2" />
                    Bus Information
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="min-w-[80px] text-gray-600">Bus:</div>
                      <div className="font-medium">{busData.name}</div>
                    </div>
                    <div className="flex items-start">
                      <div className="min-w-[80px] text-gray-600">Type:</div>
                      <div className="font-medium capitalize">{busData.busType}</div>
                    </div>
                    <div className="flex items-start">
                      <div className="min-w-[80px] text-gray-600">Departure:</div>
                      <div className="font-medium">{busData.departureTime}</div>
                    </div>
                    <div className="flex items-start">
                      <div className="min-w-[80px] text-gray-600">Arrival:</div>
                      <div className="font-medium">{busData.arrivalTime}</div>
                    </div>
                    <div className="flex items-start">
                      <div className="min-w-[80px] text-gray-600">Price:</div>
                      <div className="font-medium">{busData.price.toLocaleString()} RWF per seat</div>
                    </div>
                  </div>
                  
                  {/* Amenities */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h3 className="font-medium text-gray-700 mb-2">Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {busData.amenities.map((amenity, index) => (
                        <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
                          {amenity}
                        </span>
                      ))}
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
                      <span className="text-sm">A1</span>
                    </div>
                    <span className="text-sm">Available</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-500 text-white rounded flex items-center justify-center">
                      <span className="text-sm">A2</span>
                    </div>
                    <span className="text-sm">Booked</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 text-white rounded flex items-center justify-center">
                      <span className="text-sm">A3</span>
                    </div>
                    <span className="text-sm">Selected</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-200 rounded flex items-center justify-center">
                      <span className="text-sm">A4</span>
                    </div>
                    <span className="text-sm">Premium</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-200 rounded flex items-center justify-center">
                      <span className="text-sm">A5</span>
                    </div>
                    <span className="text-sm">Accessible</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle and Right Columns: Bus Layout and Booking Actions */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                {/* Bus Layout Component */}
                {step === 'select' && (
                  <BusLayoutComponent 
                    seats={seats} 
                    onSeatSelect={handleSeatSelect} 
                    busType={busData?.busType || 'standard'}
                  />
                )}

                {/* Booking Summary Component */}
                <BookingSummaryComponent 
                  selectedSeats={selectedSeats} 
                  pricePerSeat={busData?.price || 0} 
                  isPremium={busData?.busType === 'premium' || busData?.busType === 'executive'}
                  insuranceAvailable={true}
                />

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-end mt-6">
                  {step === 'select' ? (
                    <>
                      <button 
                        onClick={() => router.back()}
                        className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                      >
                        Back
                      </button>
                      <button 
                        onClick={handleProceedToPayment}
                        disabled={selectedSeats.length === 0 || isLoading}
                        className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ${
                          (selectedSeats.length === 0 || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {isLoading ? 'Processing...' : 'Proceed to Payment'}
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => setStep('select')}
                        className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                      >
                        Back to Seat Selection
                      </button>
                      <button 
                        onClick={handleConfirmBooking}
                        disabled={isLoading}
                        className={`px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition ${
                          isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {isLoading ? 'Processing...' : 'Confirm & Pay'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}