'use client';


import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { BsHandbag } from 'react-icons/bs';
import { FiMapPin, FiCalendar, FiChevronRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';



interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { state, updateQuantity, clearCart, removeItem } = useCart();
  const { items, totalItems, totalPrice } = state;
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Auto-dismiss inline remove pill after a short delay and on scroll/touch/scrolling content
  useEffect(() => {
    if (!confirmRemoveId) return;

    const dismiss = () => setConfirmRemoveId(null);
    const timer = window.setTimeout(dismiss, 3500);

    const onScroll = () => setConfirmRemoveId(null);
    const el = contentRef.current;
    el?.addEventListener('scroll', onScroll);
    window.addEventListener('wheel', onScroll);
    window.addEventListener('touchmove', onScroll);

    return () => {
      clearTimeout(timer);
      el?.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onScroll);
      window.removeEventListener('touchmove', onScroll);
    };
  }, [confirmRemoveId]);
  const [deliveryLocation, setDeliveryLocation] = useState('Select delivery location');
  const [deliveryDate, setDeliveryDate] = useState('Select delivery date');
  const [deliveryTime, setDeliveryTime] = useState('ASAP');

  // Delivery / free shipping config
  const FREE_SHIPPING_THRESHOLD = 500; // HKD
  const BASE_DELIVERY_FEE = 45; // HKD
  const formatHKD = (n: number) => `HK$${n.toFixed(2)}`;
  const hasFreeDelivery = totalPrice >= FREE_SHIPPING_THRESHOLD;
  const deliveryFee = hasFreeDelivery ? 0 : BASE_DELIVERY_FEE;
  const grandTotal = totalPrice + deliveryFee;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
  const progress = Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100);

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
    <>
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
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
            <div ref={contentRef} className="flex-1 overflow-y-auto bg-white">
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

                  {/* Free delivery progress */}
                  <div className="px-6 py-3 border-b bg-white">
                    <div className="text-xs text-gray-700 font-semibold">
                      {remaining > 0 ? `${formatHKD(remaining)} more to free delivery` : 'You\'ve unlocked free delivery'}
                    </div>
                    <div className="mt-1 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#FF6B00]" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-6 py-2 border-b bg-orange-50">
                    <span className="font-semibold text-[#FF6B00]">Item(s) Added</span>
                    <button onClick={() => setShowClearConfirm(true)} className="text-sm text-[#FF6B00] hover:underline">Clear Items</button>
                  </div>
                  <ul className="divide-y divide-gray-100">
                    {items.map(item => (
                      <li key={item.id} className="relative flex items-center px-6 py-3 gap-3">
                        <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0">
                          <Image src={item.image} alt={item.title} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm text-gray-900 truncate">{item.title}</div>
                          <div className="text-xs text-gray-700">{item.price}</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-lg font-bold text-[#FF6B00] bg-white hover:bg-orange-50"
                            onClick={() => {
                              if (item.quantity <= 1) {
                                setConfirmRemoveId(item.id);
                              } else {
                                updateQuantity(item.id, item.quantity - 1);
                              }
                            }}
                            aria-label={`Decrease ${item.title}`}
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

                        {confirmRemoveId === item.id && (
                          <div className="absolute right-6 -bottom-2 translate-y-full bg-white border border-gray-200 rounded-full px-3 py-1 shadow-md flex items-center gap-2 text-sm z-50">
                            <span className="text-gray-800">Remove?</span>
                            <button
                              onClick={() => setConfirmRemoveId(null)}
                              className="px-2 py-0.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => {
                                removeItem(item.id);
                                setConfirmRemoveId(null);
                              }}
                              className="px-2 py-0.5 rounded-full bg-[#FF6B00] text-white hover:bg-[#FF8533]"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                  {/* Subtotal + Delivery fee */}
                  <div className="px-6 py-3 border-t bg-white">
                    <div className="flex items-center justify-between font-semibold text-gray-800">
                      <span>Subtotal</span>
                      <span>{formatHKD(totalPrice)}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-700 mt-1">
                      <span>Delivery fee</span>
                      <span>{hasFreeDelivery ? 'HK$0.00' : formatHKD(deliveryFee)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* Footer/Total */}
            <div className="bg-white border-t p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-lg text-[#FF6B00]">{formatHKD(grandTotal)}</span>
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
            className="fixed inset-0 bg-black/40 z-50"
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
            className="fixed inset-0 bg-black/40 z-50"
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

  {/* Clear Cart Confirmation Modal */}
  <AnimatePresence>
      {showClearConfirm && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[60]"
            onClick={() => setShowClearConfirm(false)}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="fixed z-[61] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl w-[28rem] max-w-[calc(100vw-2rem)]"
          >
            <div className="px-6 pt-4 pb-3 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Clear Cart</h3>
              <button onClick={() => setShowClearConfirm(false)} className="text-gray-500 hover:text-gray-700">
                <IoClose size={20} />
              </button>
            </div>
            <div className="h-20 bg-[#FF6B00]" />
            <div className="px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  clearCart();
                  setShowClearConfirm(false);
                }}
                className="px-5 py-2 rounded-full bg-[#FF6B00] text-white font-semibold hover:bg-[#FF8533]"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </>
      )}
  </AnimatePresence>

    
    </>
  );
}