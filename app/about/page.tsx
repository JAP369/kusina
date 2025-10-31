'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface LocationInfo {
  name: string;
  address: string;
  phone: string;
  openingHours: {
    [key: string]: string;
  };
}

export default function AboutPage() {
  const [expandedLocations, setExpandedLocations] = useState<number[]>([]);

  const toggleLocation = (index: number) => {
    setExpandedLocations(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const locations: LocationInfo[] = [
    {
      name: "Nikki's Lutong Bahay (Authentic Filipino Cuisine)",
      address: "1 Morrison Hill Road, Wan Chai, Hong Kong",
      phone: "+852 9534 2948",
      openingHours: {
        "Mon - Fri": "12:00 PM - 02:30 PM",
        "Sat": "01:00 PM - 05:30 PM",
        "Sun": "Closed"
      }
    },
    // {
    //   name: "Nikki's Pop Up @ Enoteca Quarry Bay",
    //   address: "Central, Hong Kong",
    //   phone: "+852 9534 2948",
    //   openingHours: {}
    // }
  ];

  return (
    <div className="min-h-screen bg-[#FF6B00] pt-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Store Information
        </h1>
        
        <div className="space-y-8">
          {locations.map((location, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-[#FF6B00] text-2xl font-bold mb-6">
                  {location.name}
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <svg 
                      className="w-6 h-6 text-[#FF6B00] mt-1 flex-shrink-0" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <address className="not-italic text-gray-700">
                      {location.address}
                    </address>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg 
                      className="w-6 h-6 text-[#FF6B00] flex-shrink-0" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <div className="text-gray-700">
                      Phone: <a href={`tel:${location.phone}`} className="text-[#FF6B00] hover:underline">{location.phone}</a>
                    </div>
                  </div>

                  {Object.keys(location.openingHours).length > 0 && (
                    <div className="space-y-2">
                      <button 
                        onClick={() => toggleLocation(index)}
                        className="flex items-center gap-2 w-full"
                      >
                        <svg 
                          className="w-6 h-6 text-[#FF6B00] flex-shrink-0" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div className="flex justify-between items-center w-full">
                          <h3 className="font-semibold text-gray-900">Opening Hours</h3>
                          <svg
                            className={`w-5 h-5 text-gray-600 transform transition-transform duration-200 ${
                              expandedLocations.includes(index) ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </button>
                      <AnimatePresence>
                        {expandedLocations.includes(index) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-2 space-y-1 pl-8">
                              {Object.entries(location.openingHours).map(([day, hours]) => (
                                <div key={day} className="text-gray-700">
                                  <span className="font-medium">{day}:</span> {hours}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}