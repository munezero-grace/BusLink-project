import React, { useState } from 'react';
import { FaTicketAlt, FaMoney, FaWallet, FaMobileAlt, FaIdCard, FaCreditCard } from 'react-icons/fa';

interface BookingSummaryProps {
  selectedSeats: number[];
  pricePerSeat: number;
  discountCode?: string;
  isPremium?: boolean;
  insuranceAvailable?: boolean;
}

const BookingSummaryComponent: React.FC<BookingSummaryProps> = ({ 
  selectedSeats, 
  pricePerSeat,
  discountCode = '',
  isPremium = false,
  insuranceAvailable = true
}) => {
  const [promoCode, setPromoCode] = useState<string>(discountCode);
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [discount, setDiscount] = useState<number>(0);
  const [addInsurance, setAddInsurance] = useState<boolean>(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('mobile');

  // Calculate prices
  const subtotal = selectedSeats.length * pricePerSeat;
  const insuranceCost = addInsurance ? selectedSeats.length * 500 : 0;
  const promoDiscount = promoApplied ? subtotal * (discount / 100) : 0;
  const totalCost = subtotal + insuranceCost - promoDiscount;
  
  // Service fee
  const serviceFee = Math.ceil(subtotal * 0.05);

  // Apply promo code
  const handlePromoCode = () => {
    if (promoCode.toUpperCase() === 'FIRST10') {
      setDiscount(10);
      setPromoApplied(true);
    } else if (promoCode.toUpperCase() === 'WEEKEND25') {
      setDiscount(25);
      setPromoApplied(true);
    } else {
      setDiscount(0);
      setPromoApplied(false);
      alert('Invalid promo code');
    }
  };

  // Payment methods
  const paymentMethods = [
    { id: 'mobile', name: 'Mobile Money', icon: <FaMobileAlt /> },
    { id: 'card', name: 'Credit/Debit Card', icon: <FaCreditCard /> },
    { id: 'cash', name: 'Cash at Terminal', icon: <FaMoney /> },
    { id: 'wallet', name: 'BusLink Wallet', icon: <FaWallet /> }
  ];

  return (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>
      
      {selectedSeats.length > 0 ? (
        <div>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Selected Seats:</span>
              <span className="font-medium">
                {selectedSeats.map(seat => seat).join(', ')}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Price per seat:</span>
              <span className="font-medium">{pricePerSeat.toLocaleString()} RWF</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Number of seats:</span>
              <span className="font-medium">{selectedSeats.length}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">{subtotal.toLocaleString()} RWF</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Service fee:</span>
              <span className="font-medium">{serviceFee.toLocaleString()} RWF</span>
            </div>
            
            {/* Promo discount display */}
            {promoApplied && (
              <div className="flex justify-between mb-2 text-green-600">
                <span>Discount ({discount}%):</span>
                <span>-{promoDiscount.toLocaleString()} RWF</span>
              </div>
            )}
            
            {/* Insurance option */}
            {insuranceAvailable && (
              <div className="flex justify-between mb-2">
                <span className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="insurance" 
                    checked={addInsurance}
                    onChange={() => setAddInsurance(!addInsurance)}
                    className="mr-2"
                  />
                  <label htmlFor="insurance" className="text-gray-600">Travel Insurance:</label>
                </span>
                <span className="font-medium">{insuranceCost.toLocaleString()} RWF</span>
              </div>
            )}
            
            {/* Total with styling */}
            <div className="flex justify-between pt-2 mt-2 border-t border-gray-300 text-lg font-bold">
              <span>Total:</span>
              <span className="text-primary-dark">{(totalCost + serviceFee).toLocaleString()} RWF</span>
            </div>
          </div>
          
          {/* Promo code section */}
          <div className="mb-6">
            <label htmlFor="promoCode" className="block text-sm font-medium text-gray-700 mb-1">
              Have a promo code?
            </label>
            <div className="flex">
              <input
                type="text"
                id="promoCode"
                placeholder="Enter code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 rounded-l-md border border-gray-300 px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={handlePromoCode}
                className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition text-sm flex items-center"
              >
                <FaTicketAlt className="mr-1" /> Apply
              </button>
            </div>
            {promoApplied && (
              <p className="text-green-600 text-xs mt-1">Promo code applied successfully!</p>
            )}
          </div>
          
          {/* Payment method selection */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Select Payment Method</h4>
            <div className="grid grid-cols-2 gap-2">
              {paymentMethods.map(method => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                  className={`flex items-center justify-center gap-2 p-3 rounded-md border transition-colors ${
                    selectedPaymentMethod === method.id
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {method.icon}
                  <span className="text-sm">{method.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          <p>Please select your seats to see the booking summary</p>
        </div>
      )}
    </div>
  );
};

export default BookingSummaryComponent;