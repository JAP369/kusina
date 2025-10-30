'use client';


import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { BsHandbag } from 'react-icons/bs';
import { FiMapPin, FiCalendar, FiChevronRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import Image from 'next/image';



interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { state, updateQuantity, clearCart } = useCart();
  const { items, totalItems, totalPrice } = state;
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState('Select delivery location');
  const [deliveryDate, setDeliveryDate] = useState('Select delivery date');
  const [deliveryTime, setDeliveryTime] = useState('ASAP');

  const locations = [
    'Central',
    'Causeway Bay',
    'Tsim Sha Tsui',
    'Mong Kok',
    'Wan Chai',
    'Admiralty',
    'Jordan',
    'Sheung Wan'
  ];

  const timeSlots = [
    'ASAP',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 1:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
    '6:00 PM - 7:00 PM',
    '7:00 PM - 8:00 PM',
    '8:00 PM - 9:00 PM'
  ];

  const handleLocationSelect = (location: string) => {
    setDeliveryLocation(location);
    setShowLocationModal(false);
  };

  const handleTimeSelect = (time: string) => {
    setDeliveryTime(time);
    setDeliveryDate('Today');
    setShowDateModal(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />
          {/* Modal */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#FF6B00] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <div className="font-bold text-xl">Your Cart</div>
                <div className="text-sm opacity-80">You&apos;ve added {totalItems} item{totalItems !== 1 ? 's' : ''}</div>
              </div>
              <button onClick={onClose} className="hover:text-white/80">
                <IoClose size={28} />
              </button>
            </div>
            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto bg-white">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8">
                  <div className="text-gray-400 mb-4">
                    <BsHandbag size={48} />
                  </div>
                  <h3 className="text-xl font-bold text-[#FF6B00] mb-2">Your Cart is Empty</h3>
                  <p className="text-gray-500 text-center">
                    Looks like you have no items in your cart
                  </p>
                </div>
              ) : (
                <>
                  {/* Delivery Options Section */}
                  <div className="border-b bg-gray-50">
                    {/* Delivering To */}
                    <button
                      onClick={() => setShowLocationModal(true)}
                      className="w-full px-6 py-3 flex items-center justify-between hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FiMapPin className="text-[#FF6B00] text-xl" />
                        <div className="text-left">
                          <div className="text-xs text-gray-500">Delivering to</div>
                          <div className="font-semibold text-gray-800">{deliveryLocation}</div>
                        </div>
                      </div>
                      <FiChevronRight className="text-gray-400" />
                    </button>
                    
                    {/* Delivering On */}
                    <button
                      onClick={() => setShowDateModal(true)}
                      className="w-full px-6 py-3 flex items-center justify-between hover:bg-gray-100 transition-colors border-t"
                    >
                      <div className="flex items-center gap-3">
                        <FiCalendar className="text-[#FF6B00] text-xl" />
                        <div className="text-left">
                          <div className="text-xs text-gray-500">Delivering on</div>
                          <div className="font-semibold text-gray-800">
                            {deliveryDate === 'Select delivery date' ? deliveryDate : `${deliveryDate}, ${deliveryTime}`}
                          </div>
                        </div>
                      </div>
                      <FiChevronRight className="text-gray-400" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between px-6 py-2 border-b bg-orange-50">
                    <span className="font-semibold text-[#FF6B00]">Item(s) Added</span>
                    <button onClick={clearCart} className="text-sm text-[#FF6B00] hover:underline">Clear Items</button>
                  </div>
                  <ul className="divide-y divide-gray-100">
                    {items.map(item => (
                      <li key={item.id} className="flex items-center px-6 py-3 gap-3">
                        <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0">
                          <Image src={item.image} alt={item.title} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm truncate">{item.title}</div>
                          <div className="text-xs text-gray-500">{item.price}</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-lg font-bold text-[#FF6B00] bg-white hover:bg-orange-50"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            −
                          </button>
                          <span className="w-7 text-center font-semibold">{item.quantity}</span>
                          <button
                            className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-lg font-bold text-[#FF6B00] bg-white hover:bg-orange-50"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {/* Subtotal */}
                  <div className="flex items-center justify-between px-6 py-3 border-t bg-orange-50 font-semibold">
                    <span>Subtotal</span>
                    <span>HK${totalPrice.toFixed(2)}</span>
                  </div>
                </>
              )}
            </div>
            {/* Footer/Total */}
            <div className="bg-white border-t p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-lg text-[#FF6B00]">HK${totalPrice.toFixed(2)}</span>
              </div>
              <button className="w-full bg-[#FF6B00] hover:bg-[#FF8533] text-white font-bold py-2 rounded-full text-base mt-2">
                Select your dining preference
              </button>
            </div>
          </motion.div>
        </>
      )}

      {/* Location Selection Modal */}
      {showLocationModal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLocationModal(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 max-h-[80vh] overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Select Delivery Location</h3>
                <button onClick={() => setShowLocationModal(false)} className="text-gray-500 hover:text-gray-700">
                  <IoClose size={24} />
                </button>
              </div>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {locations.map((location) => (
                  <button
                    key={location}
                    onClick={() => handleLocationSelect(location)}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                      deliveryLocation === location
                        ? 'border-[#FF6B00] bg-orange-50 text-[#FF6B00] font-semibold'
                        : 'border-gray-200 hover:border-[#FF6B00] hover:bg-orange-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{location}</span>
                      {deliveryLocation === location && (
                        <span className="text-[#FF6B00]">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* Date/Time Selection Modal */}
      {showDateModal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDateModal(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 max-h-[80vh] overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Select Delivery Time</h3>
                <button onClick={() => setShowDateModal(false)} className="text-gray-500 hover:text-gray-700">
                  <IoClose size={24} />
                </button>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600">Today&apos;s delivery times</p>
              </div>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                      deliveryTime === time
                        ? 'border-[#FF6B00] bg-orange-50 text-[#FF6B00] font-semibold'
                        : 'border-gray-200 hover:border-[#FF6B00] hover:bg-orange-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{time}</span>
                      {deliveryTime === time && (
                        <span className="text-[#FF6B00]">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}