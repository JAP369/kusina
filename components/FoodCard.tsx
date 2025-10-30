'use client';


import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '../context/CartContext';


interface FoodCardProps {
  title: string;
  desc: string;
  price: string;
  image: string;
  outOfStock?: boolean;
}

export default function FoodCard({ title, desc, price, image, outOfStock = false }: FoodCardProps) {
  const { addItem } = useCart();
  // Generate a unique id for each item (title + price)
  const id = `${title}-${price}`.replace(/\s+/g, '-').toLowerCase();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-lg p-6 flex flex-col"
    >
      <div className="relative w-full aspect-square mb-4">
        <div className="absolute inset-0 rounded-lg overflow-hidden">
          <Image 
            src={image} 
            alt={title} 
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      <h3 className="font-bold text-lg text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 flex-grow mb-4">{desc}</p>
      <div className="flex justify-between items-center">
        <p className="font-bold text-[#FF6B00] text-lg">{price}</p>
        {outOfStock ? (
          <motion.button 
            disabled 
            className="bg-gray-200 text-gray-500 px-6 py-2 rounded cursor-not-allowed"
          >
            Out of stock
          </motion.button>
        ) : (
          <motion.button 
            whileHover={{ 
              scale: 1.05,
              backgroundColor: '#FF8533'
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 17
            }}
            className="bg-[#FF6B00] text-white px-6 py-2 rounded relative overflow-hidden group"
            onClick={() => addItem({ id, title, price, image })}
          >
            <motion.span
              initial={{ y: 0 }}
              className="inline-block relative z-10"
            >
              Add
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-white/10 transform -skew-x-12"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}