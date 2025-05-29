'use client';

import React, { useState } from 'react';
import { FaCreditCard, FaMoneyBill, FaMobile, FaPlus, FaTrash, FaPencilAlt, FaExclamationCircle, FaCcVisa, FaCcMastercard, FaUniversity } from 'react-icons/fa';

export default function PaymentMethods() {
  // State for payment methods
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'card',
      name: 'Visa ending in 4321',
      details: {
        cardNumber: '•••• •••• •••• 4321',
        expiryDate: '09/27',
        cardType: 'visa'
      },
      isDefault: true
    },
    {
      id: 2,
      type: 'mobile',
      name: 'Mobile Money',
      details: {
        provider: 'MTN Mobile Money',
        phoneNumber: '+250 78 123 4567'
      },
      isDefault: false
    }
  ]);
  
  // State for modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPaymentType, setNewPaymentType] = useState('card');
  
  // State for new payment method form
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
    phoneNumber: '',
    provider: 'MTN',
    bankName: '',
    accountNumber: ''
  });
  
  // Methods for managing payment methods
  const addPaymentMethod = () => {
    let newMethod = {
      id: paymentMethods.length + 1,
      type: newPaymentType,
      isDefault: paymentMethods.length === 0
    };
    
    if (newPaymentType === 'card') {
      newMethod.name = `${formData.cardholderName}'s Card ending in ${formData.cardNumber.slice(-4)}`;
      newMethod.details = {
        cardNumber: `•••• •••• •••• ${formData.cardNumber.slice(-4)}`,
        expiryDate: formData.expiryDate,
        cardType: formData.cardNumber.startsWith('4') ? 'visa' : 'mastercard'
      };
    } else if (newPaymentType === 'mobile') {
      newMethod.name = `${formData.provider} Mobile Money`;
      newMethod.details = {
        provider: formData.provider,
        phoneNumber: formData.phoneNumber
      };
    } else if (newPaymentType === 'bank') {
      newMethod.name = `${formData.bankName} Account`;
      newMethod.details = {
        bankName: formData.bankName,
        accountNumber: `•••• ${formData.accountNumber.slice(-4)}`
      };
    }
    
    setPaymentMethods([...paymentMethods, newMethod]);
    setShowAddModal(false);
    resetForm();
  };
  
  const deletePaymentMethod = (id) => {
    const updatedMethods = paymentMethods.filter(method => method.id !== id);
    
    // If we deleted the default method, make the first one the new default if any remain
    if (paymentMethods.find(m => m.id === id)?.isDefault && updatedMethods.length > 0) {
      updatedMethods[0].isDefault = true;
    }
    
    setPaymentMethods(updatedMethods);
  };
  
  const setDefaultPaymentMethod = (id) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
  };
  
  // Helper functions
  const resetForm = () => {
    setFormData({
      cardNumber: '',
      cardholderName: '',
      expiryDate: '',
      cvv: '',
      phoneNumber: '',
      provider: 'MTN',
      bankName: '',
      accountNumber: ''
    });
  };
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Render payment method icon based on type
  const renderPaymentIcon = (method) => {
    if (method.type === 'card') {
      return method.details.cardType === 'visa' ? 
        <FaCcVisa className="text-blue-600 text-3xl" /> : 
        <FaCcMastercard className="text-orange-600 text-3xl" />;
    } else if (method.type === 'mobile') {
      return <FaMobile className="text-green-600 text-3xl" />;
    } else if (method.type === 'bank') {
      return <FaUniversity className="text-gray-600 text-3xl" />;
    }
    return <FaCreditCard className="text-gray-600 text-3xl" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Payment Methods</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center gap-2"
        >
          <FaPlus /> Add New Method
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="text-lg font-medium mb-4">Saved Payment Methods</h2>
        
        {paymentMethods.length > 0 ? (
          <div className="space-y-4">
            {paymentMethods.map(method => (
              <div key={method.id} className="border rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  {renderPaymentIcon(method)}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{method.name}</h3>
                      {method.isDefault && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                          Default
                        </span>
                      )}
                    </div>
                    
                    {method.type === 'card' && (
                      <div className="text-sm text-gray-500">
                        <p>{method.details.cardNumber}</p>
                        <p>Expires: {method.details.expiryDate}</p>
                      </div>
                    )}
                    
                    {method.type === 'mobile' && (
                      <div className="text-sm text-gray-500">
                        <p>{method.details.phoneNumber}</p>
                      </div>
                    )}
                    
                    {method.type === 'bank' && (
                      <div className="text-sm text-gray-500">
                        <p>Account: {method.details.accountNumber}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 sm:ml-auto">
                  {!method.isDefault && (
                    <button 
                      onClick={() => setDefaultPaymentMethod(method.id)}
                      className="px-3 py-1.5 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition-colors text-sm"
                    >
                      Set as Default
                    </button>
                  )}
                  <button 
                    onClick={() => deletePaymentMethod(method.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 mb-4">You don't have any saved payment methods</p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center gap-2 mx-auto"
            >
              <FaPlus /> Add Payment Method
            </button>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="text-lg font-medium mb-4">Transaction History</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm">May 5, 2025</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">Ticket Purchase (Downtown - Kimironko)</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">Visa ending in 4321</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">1,500 RWF</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm">April 28, 2025</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">Ticket Purchase (Nyabugogo - Remera)</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">MTN Mobile Money</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">1,200 RWF</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm">April 15, 2025</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">Ticket Purchase (Gikondo - Kigali Heights)</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">Visa ending in 4321</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">1,500 RWF</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm">April 10, 2025</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">Ticket Purchase (Kicukiro - Nyamirambo)</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">Visa ending in 4321</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">1,300 RWF</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Refunded</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Add Payment Method Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Add Payment Method</h3>
                
                <div className="mb-4">
                  <div className="flex space-x-2 border-b border-gray-200">
                    <button
                      onClick={() => setNewPaymentType('card')}
                      className={`px-4 py-2 font-medium ${
                        newPaymentType === 'card'
                          ? 'text-primary border-b-2 border-primary'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <FaCreditCard /> Credit/Debit Card
                      </span>
                    </button>
                    <button
                      onClick={() => setNewPaymentType('mobile')}
                      className={`px-4 py-2 font-medium ${
                        newPaymentType === 'mobile'
                          ? 'text-primary border-b-2 border-primary'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <FaMobile /> Mobile Money
                      </span>
                    </button>
                    <button
                      onClick={() => setNewPaymentType('bank')}
                      className={`px-4 py-2 font-medium ${
                        newPaymentType === 'bank'
                          ? 'text-primary border-b-2 border-primary'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <FaUniversity /> Bank Account
                      </span>
                    </button>
                  </div>
                </div>
                
                <form className="space-y-4">
                  {newPaymentType === 'card' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                        <input
                          type="text"
                          name="cardholderName"
                          value={formData.cardholderName}
                          onChange={handleFormChange}
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder="Name as it appears on card"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleFormChange}
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder="XXXX XXXX XXXX XXXX"
                          maxLength={19}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleFormChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="MM/YY"
                            maxLength={5}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleFormChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="XXX"
                            maxLength={4}
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}
                  
                  {newPaymentType === 'mobile' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Provider</label>
                        <select
                          name="provider"
                          value={formData.provider}
                          onChange={handleFormChange}
                          className="w-full p-2 border border-gray-300 rounded"
                          required
                        >
                          <option value="MTN">MTN Mobile Money</option>
                          <option value="Airtel">Airtel Money</option>
                          <option value="Tigo">Tigo Cash</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="text"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleFormChange}
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder="+250 XX XXX XXXX"
                          required
                        />
                      </div>
                    </>
                  )}
                  
                  {newPaymentType === 'bank' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                        <input
                          type="text"
                          name="bankName"
                          value={formData.bankName}
                          onChange={handleFormChange}
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder="Enter bank name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                        <input
                          type="text"
                          name="accountNumber"
                          value={formData.accountNumber}
                          onChange={handleFormChange}
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder="Enter account number"
                          required
                        />
                      </div>
                    </>
                  )}
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="setDefault"
                        type="checkbox"
                        className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                      />
                    </div>
                    <label htmlFor="setDefault" className="ml-2 block text-sm text-gray-900">
                      Set as default payment method
                    </label>
                  </div>
                  
                  <div className="bg-yellow-50 p-3 rounded-md flex items-start">
                    <FaExclamationCircle className="text-yellow-400 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm text-yellow-700">
                      Your payment information is secure and encrypted. We do not store your complete card details on our servers.
                    </p>
                  </div>
                </form>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={addPaymentMethod}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add Payment Method
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
