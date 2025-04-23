"use client";

import SeatComponent from './SeatComponent';

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

interface BusLayoutProps {
  seats: Seat[];
  onSeatSelect: (seatId: number) => void;
}

export default function BusLayoutComponent({ seats, onSeatSelect }: BusLayoutProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8">
      {/* Bus front */}
      <div className="relative mb-8">
        <div className="h-24 bg-gray-200 rounded-t-3xl border-2 border-gray-300 flex items-center justify-center">
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-gray-800 text-white p-2 rounded-lg text-center w-24">
              Driver
            </div>
          </div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-300 w-16 h-6 rounded-t-lg"></div>
        </div>
      </div>
      
      {/* Bus body with seats */}
      <div className="bg-gray-100 rounded-b-lg p-6 border-2 border-gray-300">
        <div className="grid grid-cols-4 gap-2 mb-6">
          {seats.map((seat) => (
            <SeatComponent
              key={seat.id}
              id={seat.id}
              seatNumber={seat.seatNumber}
              isBooked={seat.isBooked}
              isSelected={seat.isSelected}
              position={seat.position}
              onSelect={onSeatSelect}
            />
          ))}
        </div>
        
        {/* Aisle indicator */}
        <div className="flex justify-center">
          <div className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
            Aisle
          </div>
        </div>
      </div>
    </div>
  );
}
