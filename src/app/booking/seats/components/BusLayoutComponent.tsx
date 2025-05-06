import React from 'react';
import SeatComponent from './SeatComponent';
import { FaSteeringWheel, FaDoorOpen } from 'react-icons/fa';

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

interface BusLayoutProps {
  seats: Seat[];
  onSeatSelect: (seatId: number) => void;
  busType?: 'standard' | 'premium' | 'executive';
}

const BusLayoutComponent: React.FC<BusLayoutProps> = ({ 
  seats, 
  onSeatSelect,
  busType = 'standard'
}) => {
  // Group seats by row for easier layout rendering
  const rows = seats.reduce((acc, seat) => {
    const rowNum = seat.row;
    if (!acc[rowNum]) {
      acc[rowNum] = [];
    }
    acc[rowNum].push(seat);
    return acc;
  }, {} as Record<number, Seat[]>);

  // Sort each row by column
  Object.keys(rows).forEach(rowKey => {
    rows[parseInt(rowKey)].sort((a, b) => a.col - b.col);
  });

  // Create array of row numbers in order
  const rowNumbers = Object.keys(rows).map(Number).sort((a, b) => a - b);

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">
        Bus Layout
        {busType === 'premium' && <span className="ml-2 text-amber-500">(Premium)</span>}
        {busType === 'executive' && <span className="ml-2 text-blue-500">(Executive)</span>}
      </h3>
      
      {/* Bus outline */}
      <div className="relative bg-gray-100 rounded-2xl p-8 border-2 border-gray-300 max-w-xl mx-auto">
        {/* Driver area */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <FaSteeringWheel className="text-gray-600 text-3xl mb-1" />
          <p className="text-xs text-gray-600">Driver</p>
        </div>
        
        {/* Bus doors */}
        <div className="absolute top-1/2 -left-5 transform -translate-y-1/2">
          <FaDoorOpen className="text-gray-600 text-2xl" />
        </div>
        <div className="absolute bottom-10 -right-5">
          <FaDoorOpen className="text-gray-600 text-2xl" />
        </div>
        
        {/* Seat layout */}
        <div className="mt-10 flex flex-col items-center">
          {/* Seat legend for special seats */}
          <div className="grid grid-cols-4 gap-6 items-center mb-6">
            <div className="flex items-center text-xs">
              <div className="w-4 h-4 bg-gray-200 rounded-sm mr-1"></div>
              <span>Standard</span>
            </div>
            <div className="flex items-center text-xs">
              <div className="w-4 h-4 bg-amber-200 rounded-sm mr-1"></div>
              <span>Premium</span>
            </div>
            <div className="flex items-center text-xs">
              <div className="w-4 h-4 bg-blue-200 rounded-sm mr-1"></div>
              <span>Accessible</span>
            </div>
            <div className="flex items-center text-xs">
              <div className="w-4 h-4 border-2 border-blue-300 bg-gray-200 rounded-sm mr-1"></div>
              <span>Window</span>
            </div>
          </div>
          
          {/* Rows */}
          <div className="grid gap-y-4">
            {rowNumbers.map(rowNum => (
              <div key={`row-${rowNum}`} className="flex justify-center gap-10">
                {/* Left side seats */}
                <div className="flex gap-1">
                  {rows[rowNum]
                    .filter(seat => seat.col <= 1)
                    .map(seat => (
                      <SeatComponent
                        key={seat.id}
                        id={seat.id}
                        seatNumber={seat.seatNumber}
                        isBooked={seat.isBooked}
                        isSelected={seat.isSelected}
                        position={seat.position}
                        onSelect={onSeatSelect}
                        isPremium={seat.isPremium}
                        isAccessible={seat.isAccessible}
                      />
                    ))}
                </div>
                
                {/* Aisle */}
                <div className="w-6 bg-gray-300 rounded-md opacity-30"></div>
                
                {/* Right side seats */}
                <div className="flex gap-1">
                  {rows[rowNum]
                    .filter(seat => seat.col >= 2)
                    .map(seat => (
                      <SeatComponent
                        key={seat.id}
                        id={seat.id}
                        seatNumber={seat.seatNumber}
                        isBooked={seat.isBooked}
                        isSelected={seat.isSelected}
                        position={seat.position}
                        onSelect={onSeatSelect}
                        isPremium={seat.isPremium}
                        isAccessible={seat.isAccessible}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-gray-600 text-center text-sm">
        <p>Select your preferred seats by clicking on them (maximum 5 seats per booking)</p>
      </div>
    </div>
  );
};

export default BusLayoutComponent;