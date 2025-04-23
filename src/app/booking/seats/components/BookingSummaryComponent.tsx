"use client";

interface BookingSummaryProps {
  selectedSeats: number[];
  pricePerSeat: number;
}

export default function BookingSummaryComponent({ 
  selectedSeats, 
  pricePerSeat 
}: BookingSummaryProps) {
  return (
    <div className="bg-blue-50 p-4 rounded-lg mb-6">
      <h3 className="font-semibold text-lg mb-2">Booking Summary</h3>
      <div className="flex justify-between mb-2">
        <span>Selected Seats:</span>
        <span className="font-medium">
          {selectedSeats.length > 0 ? selectedSeats.sort((a, b) => a - b).join(', ') : 'None'}
        </span>
      </div>
      <div className="flex justify-between font-medium">
        <span>Total Price:</span>
        <span className="text-green-700">
          {pricePerSeat * selectedSeats.length} RWF
        </span>
      </div>
      
      {selectedSeats.length > 0 && (
        <div className="mt-4 pt-4 border-t border-blue-200">
          <p className="text-sm text-blue-800">
            You have selected {selectedSeats.length} seat{selectedSeats.length !== 1 ? 's' : ''}. 
            Click "Confirm Booking" to proceed with your reservation.
          </p>
        </div>
      )}
    </div>
  );
}
