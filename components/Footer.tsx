'use client';

import Link from 'next/link';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
  const iconVariants = {
    rest: {
      scale: 1,
      rotate: 0,
      boxShadow: '0 0 0 rgba(0,0,0,0)',
    },
    hover: {
      scale: 1.25,
      rotate: 12,
      boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 12,
      } satisfies import('framer-motion').Transition,
    },
  } satisfies import('framer-motion').Variants;

  return (
    <footer className="bg-[#eceadd] text-black py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-3">
            <h3 className="text-lg font-semibold">Follow us!</h3>
            <div className="flex gap-5">
              <motion.div
                variants={iconVariants}
                initial="rest"
                whileHover="hover"
                className="text-[#25D366] hover:text-[#1DA851]"
              >
                <Link href="https://wa.me/+85295342948" target="_blank" aria-label="WhatsApp">
                  <FaWhatsapp size={28} />
                </Link>
              </motion.div>
              <motion.div
                variants={iconVariants}
                initial="rest"
                whileHover="hover"
                className="text-[#E4405F] hover:text-[#C13584]"
              >
                <Link href="https://www.instagram.com/ikkin0610" target="_blank" aria-label="Instagram">
                  <FaInstagram size={28} />
                </Link>
              </motion.div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/terms" className="hover:underline">Terms & Conditions</Link>
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="https://nextjs.org" target="_blank" className="hover:underline">
              Powered by Next.JS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}