"use client";

interface SeatProps {
  id: number;
  seatNumber: string;
  isBooked: boolean;
  isSelected: boolean;
  position: 'window' | 'aisle' | 'driver' | 'single';
  onSelect: (id: number) => void;
}

export default function SeatComponent({
  id,
  seatNumber,
  isBooked,
  isSelected,
  position,
  onSelect,
}: SeatProps) {
  // Get the color class for a seat based on its state
  const getSeatColorClass = () => {
    if (isBooked) return 'bg-red-500 text-white cursor-not-allowed';
    if (isSelected) return 'bg-green-500 text-white';
    return 'bg-gray-200 hover:bg-gray-300';
  };

  // Get additional classes based on position
  const getPositionClass = () => {
    switch (position) {
      case 'window':
        return 'border-l-4 border-blue-200';
      case 'aisle':
        return position === 'aisle' && id % 2 === 0 
          ? 'border-r-4 border-blue-200' 
          : 'border-l-4 border-blue-200';
      default:
        return '';
    }
  };

  return (
    <div
      onClick={() => !isBooked && onSelect(id)}
      className={`
        aspect-square flex items-center justify-center rounded-md cursor-pointer transition
        ${getSeatColorClass()} ${getPositionClass()}
      `}
      aria-label={`Seat ${seatNumber} ${isBooked ? 'booked' : isSelected ? 'selected' : 'available'}`}
    >
      {seatNumber}
    </div>
  );
}
