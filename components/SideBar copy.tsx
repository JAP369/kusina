'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function SideBar() {
  const [activeSection, setActiveSection] = useState('pika-pika');

  const categories = [
    { id: 'pika-pika', name: 'Pika-Pika (Snacks & Finger food)' },
    { id: 'karne', name: 'Karne (Filipino Meat Dishes)' },
    { id: 'stew-meals', name: 'Filipino Stew Meals (All served with plain rice)' },
    { id: 'breakfast', name: 'All-day Filipino Breakfast meals (Silogs)' },
    { id: 'pancit', name: 'Pancit (Filipino Noodles) & Pasta' },
    { id: 'fried-rice', name: 'Filipino Fried Rice' },
    { id: 'gulay', name: 'Gulay (Filipino Vegetable dishes)' },
    { id: 'side-dish', name: 'Side-dish / Add-ons' },
    { id: 'desserts', name: 'Filipino Desserts' }
    // { id: 'empanadas', name: 'Signature Empanadas' },
  ];

  // Handle smooth scrolling
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Account for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = categories.map(cat => ({
        id: cat.id,
        element: document.getElementById(cat.id)
      }));

      const current = sections.find(section => {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.aside
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="w-64 bg-white rounded-lg p-6 hidden md:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto"
    >
      <ul className="space-y-4">
        {categories.map((cat) => (
          <motion.li 
            key={cat.id}
            onClick={() => scrollToSection(cat.id)}
            whileHover={{ scale: 1.02 }}
            className={`text-gray-700 hover:text-[#FF6B00] cursor-pointer transition-colors ${
              activeSection === cat.id ? 'text-[#FF6B00] font-medium' : ''
            }`}
          >
            {cat.name}
          </motion.li>
        ))}
      </ul>
    </motion.aside>
  );
}