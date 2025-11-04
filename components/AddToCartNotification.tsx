'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import { useEffect, useState } from 'react';

interface AddToCartNotificationProps {
  isVisible: boolean;
  // Show up to a few recent items
  items: Array<{
    id: string;
    title: string;
    price: string;
    image: string;
    quantity: number;
  }>;
  subtotal: number; // numeric subtotal
  freeShippingThreshold?: number; // default 500
  anchorRef?: React.RefObject<HTMLElement | null>;
  onClose: () => void;
  onViewCart: () => void;
}

export default function AddToCartNotification({ isVisible, items, subtotal, freeShippingThreshold = 500, anchorRef, onClose, onViewCart }: AddToCartNotificationProps) {
  const recent = items.slice(-3).reverse();
  const remaining = Math.max(0, freeShippingThreshold - subtotal);
  const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const formatHKD = (n: number) => `HK$${n.toFixed(2)}`;

  // Compute popover position relative to the provided anchor (cart icon button)
  const [pos, setPos] = useState<{ top: number; right: number } | null>(null);

  useEffect(() => {
    if (!anchorRef?.current) return;
    const handler = () => {
      const rect = anchorRef.current!.getBoundingClientRect();
      const top = rect.bottom + 8; // 8px gap below the icon
      const right = Math.max(8, window.innerWidth - rect.right);
      setPos({ top, right });
    };
    handler();
    window.addEventListener('resize', handler);
    window.addEventListener('scroll', handler);
    return () => {
      window.removeEventListener('resize', handler);
      window.removeEventListener('scroll', handler);
    };
  }, [anchorRef]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -20, x: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed z-50 bg-white rounded-lg shadow-2xl border border-gray-200 w-[22rem] max-w-[calc(100vw-2rem)]"
          style={pos ? { top: pos.top, right: pos.right } : { top: 80, right: 16 }}
        >
          <div className="p-4">
            {/* Free delivery progress */}
            <div className="mb-3">
              <div className="text-xs text-gray-800 font-semibold">
                {remaining > 0 ? `${formatHKD(remaining)} more to free delivery` : 'You unlocked free delivery'}
              </div>
              <div className="mt-1 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#FF6B00]" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-[#FF6B00] font-bold text-base">Item(s) Added</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <IoClose size={20} />
              </button>
            </div>
            {/* Recent items */}
            <ul className="divide-y divide-gray-100 mb-3">
              {recent.map((it) => (
                <li key={it.id} className="flex items-center gap-3 py-2">
                  <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0">
                    <Image src={it.image} alt={it.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm truncate">{it.title}</div>
                    <div className="text-gray-700 text-xs">{it.price}</div>
                  </div>
                  <div className="text-[#FF6B00] font-bold text-sm">× {it.quantity}</div>
                </li>
              ))}
            </ul>

            {/* Subtotal */}
            <div className="flex items-center justify-between text-sm text-gray-800 mb-3">
              <span className="font-medium">Subtotal</span>
              <span className="font-semibold">{formatHKD(subtotal)}</span>
            </div>

            <button
              onClick={onViewCart}
              className="w-full bg-[#FF6B00] hover:bg-[#FF8533] text-white font-bold py-2.5 rounded-full text-sm transition-colors"
            >
              View Cart
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
