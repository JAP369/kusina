import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";  // Import global styles
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { CartProvider } from '../context/CartContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kusina",
  description: "Filipino Cuisine Delivered to Your Doorstep",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}