'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ReservationForm() {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [date, setDate] = useState('Today, 30 Oct 2025');
  const [timeSlot, setTimeSlot] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 9)); // October 2025
  const dropdownRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Add empty spaces for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const changeMonth = (increment: number) => {
    setCurrentMonth(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + increment);
      return newDate;
    });
  };

  const incrementCount = (type: 'adults' | 'children', e: React.MouseEvent) => {
    e.stopPropagation();
    if (type === 'adults') {
      setAdults(prev => Math.min(prev + 1, 8));
    } else {
      setChildren(prev => Math.min(prev + 1, 8));
    }
  };

  const decrementCount = (type: 'adults' | 'children', e: React.MouseEvent) => {
    e.stopPropagation();
    if (type === 'adults') {
      setAdults(prev => Math.max(prev - 1, 1));
    } else {
      setChildren(prev => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className="flex-1 bg-[#D04A02] min-h-[calc(100vh-4rem)] py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-12 text-center">
          Make a Reservation
        </h1>

        <div className="bg-white rounded-lg p-6 shadow-lg">
          <div className="space-y-4">
            {/* Guest Selection Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded text-left flex justify-between items-center text-gray-900"
              >
                <span>{adults} Adult{adults > 1 ? 's' : ''}{children > 0 ? `, ${children} Child${children > 1 ? 'ren' : ''}` : ''}</span>
                <svg className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  <div className="p-3 space-y-3">
                    {/* Adults Counter */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900">Adults</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => decrementCount('adults', e)}
                          className="w-6 h-6 flex items-center justify-center rounded-full border border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white transition-colors"
                          disabled={adults <= 1}
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-gray-900">{adults}</span>
                        <button
                          onClick={(e) => incrementCount('adults', e)}
                          className="w-6 h-6 flex items-center justify-center rounded-full border border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white transition-colors"
                          disabled={adults >= 8}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Children Counter */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900">Children</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => decrementCount('children', e)}
                          className="w-6 h-6 flex items-center justify-center rounded-full border border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white transition-colors"
                          disabled={children <= 0}
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-gray-900">{children}</span>
                        <button
                          onClick={(e) => incrementCount('children', e)}
                          className="w-6 h-6 flex items-center justify-center rounded-full border border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white transition-colors"
                          disabled={children >= 8}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Date and Time Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="relative" ref={calendarRef}>
                <button
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="w-full p-2.5 border border-gray-300 rounded text-left flex justify-between items-center bg-gray-50 text-gray-900"
                >
                  <span>{date}</span>
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showCalendar && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    <div className="p-3">
                      <div className="flex justify-between items-center mb-4">
                        <button
                          onClick={() => changeMonth(-1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <span className="font-medium text-gray-500">
                          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </span>
                        <button
                          onClick={() => changeMonth(1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                          <div key={day} className="text-xs font-medium text-gray-500">
                            {day}
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {getDaysInMonth(currentMonth).map((day, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              if (day) {
                                setDate(`Today, ${formatDate(day)}`);
                                setShowCalendar(false);
                              }
                            }}
                            disabled={!day}
                            className={`
                              p-2 text-sm rounded font-medium
                              ${!day ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-100'}
                              ${day && day.getDate() === 30 ? 'bg-black text-white hover:bg-gray-800' : ''}
                            `}
                          >
                            {day?.getDate()}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded appearance-none cursor-pointer focus:outline-none focus:border-[#FF6B00] bg-gray-50 text-gray-900"
                >
                  <option value="" disabled>Invalid date</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-[#FFD7CC] text-[#FF6B00] font-medium py-3 rounded text-center text-sm"
              >
                No Available Dates
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-[#FF6B00] text-white font-medium py-3 rounded mt-3 text-sm"
            >
              Confirm
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}