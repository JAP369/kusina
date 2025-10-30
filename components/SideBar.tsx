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
    { id: 'desserts', name: 'Filipino Desserts' },
  ];

  // ────── SMOOTH SCROLL ──────
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const yOffset = -80; // header height
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
    setActiveSection(id);
  };

  // ────── ACTIVE SECTION ON SCROLL ──────
  useEffect(() => {
    const onScroll = () => {
      const current = categories.find((cat) => {
        const el = document.getElementById(cat.id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });
      if (current && current.id !== activeSection) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener('scroll', onScroll);
    onScroll(); // init
    return () => window.removeEventListener('scroll', onScroll);
  }, [activeSection]);

  // ────── ANIMATIONS ──────
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.3 },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 120, damping: 14 },
    },
  };

  return (
    <motion.aside
      initial={{ x: -120, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-64 bg-white rounded-xl p-6 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto shadow-lg hidden md:block"
      style={{ scrollbarWidth: 'thin' }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        {categories.map((cat) => {
          const isActive = activeSection === cat.id;

          return (
            <motion.div
              key={cat.id}
              variants={item}
              onClick={() => scrollToSection(cat.id)}
              className="relative group"
              whileTap={{ scale: 0.98 }}
            >
              {/* Active bar */}
              <motion.div
                layoutId="activeSection"
                className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF6B00] rounded-r-full"
                initial={false}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />

              {/* Hover background */}
              <motion.div
                className="absolute inset-0 bg-orange-50 rounded-lg opacity-0 group-hover:opacity-100"
                initial={false}
                transition={{ duration: 0.2 }}
              />

              {/* Text */}
              <motion.p
                className={`relative pl-4 pr-2 py-2.5 text-sm font-medium cursor-pointer transition-all duration-300 ${
                  isActive
                    ? 'text-[#FF6B00] font-semibold'
                    : 'text-gray-700 hover:text-[#FF6B00]'
                }`}
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                {cat.name}
              </motion.p>

              {/* Pulse on active */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(255,107,0,0)',
                      '0 0 0 8px rgba(255,107,0,0.1)',
                      '0 0 0 0 rgba(255,107,0,0)',
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </motion.aside>
  );
}