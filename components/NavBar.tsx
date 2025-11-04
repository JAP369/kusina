'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingBag, FiMenu, FiX } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import CartModal from './CartModal';
import AddToCartNotification from './AddToCartNotification';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { state, lastAddedItem, clearLastAddedItem } = useCart();
  const cartAnchorRef = useRef<HTMLButtonElement>(null);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    if (lastAddedItem) {
      clearLastAddedItem();
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleViewCart = () => {
    clearLastAddedItem();
    setIsCartOpen(true);
  };

  // Auto-hide notification after a short delay when a new item is added
  useEffect(() => {
    if (!lastAddedItem) return;
    const t = setTimeout(() => {
      clearLastAddedItem();
    }, 3500);

    return () => clearTimeout(t);
  }, [lastAddedItem, clearLastAddedItem]);

  return (
    <>
      <motion.nav
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full bg-[#eceadd] shadow-md z-10 flex justify-between items-center px-4 py-2 md:px-8"
      >
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.jpg" alt="Kusina's Catering" width={60} height={60} />
          {/* <span className="text-[#FF6B00] font-bold text-xl">KUSINA</span> */}
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/menu" className="text-gray-700 hover:text-[#FF6B00]">Menu</Link>
          <Link href="/reservations" className="text-gray-700 hover:text-[#FF6B00]">Reservations</Link>
          <Link href="/about" className="text-gray-700 hover:text-[#FF6B00]">About</Link>
          <Link href="/contact" className="text-gray-700 hover:text-[#FF6B00]">Contact</Link>
          {/* <div className="flex items-center space-x-1">
            <Image src="/globe.svg" alt="Language" width={20} height={20} />
            <span className="text-gray-700">English</span>
          </div> */}
        </div>
        <div className="flex items-center space-x-4">
          <button className="hidden md:block bg-[#FF6B00] text-white px-6 py-2 rounded hover:bg-[#FF8533] transition-colors">
            Sign In
          </button>
          <button 
            onClick={toggleCart}
            className="relative hover:text-[#FF6B00] transition-colors"
            ref={cartAnchorRef}
          >
            <motion.div key={state.totalItems} initial={{ scale: 1 }} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.3 }} className="relative">
              <FiShoppingBag className="text-2xl text-gray-700 hover:text-[#FF6B00]" />
              {state.totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF6B00] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {state.totalItems}
                </span>
              )}
            </motion.div>
          </button>
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-700 hover:text-[#FF6B00] transition-colors"
          >
            {isMobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-16 left-0 right-0 bg-white shadow-lg z-50 overflow-hidden"
          >
            <div className="flex flex-col py-4">
              <Link 
                href="/menu" 
                className="px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-[#FF6B00] transition-colors"
                onClick={closeMobileMenu}
              >
                Menu
              </Link>
              <Link 
                href="/reservations" 
                className="px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-[#FF6B00] transition-colors"
                onClick={closeMobileMenu}
              >
                Reservations
              </Link>
              <Link 
                href="/about" 
                className="px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-[#FF6B00] transition-colors"
                onClick={closeMobileMenu}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-[#FF6B00] transition-colors"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
              <div className="px-6 py-3">
                <button className="w-full bg-[#FF6B00] text-white px-6 py-2 rounded hover:bg-[#FF8533] transition-colors">
                  Sign In
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add-to-cart popover under/near the cart icon */}
      <AddToCartNotification
        isVisible={!!lastAddedItem}
        items={state.items}
        subtotal={state.totalPrice}
        freeShippingThreshold={500}
        anchorRef={cartAnchorRef}
        onClose={() => {
          clearLastAddedItem();
        }}
        onViewCart={handleViewCart}
      />

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}