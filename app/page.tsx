'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const newRecipes = [
    {
      title: 'CHICKEN LUMPIA',
      image: '/chicken-lumpia.jpg',
      description: 'Fried spring rolls filled with the perfect blend of minced chicken and vegetables.',
      link: '/menu#pika-pika'
    },
    {
      title: 'LECHON KAWALI',
      image: '/lechon-kawali.jpg',
      description: 'Crispy pork belly, a Filipino favorite.',
      link: '/menu#karne'
    },
    {
      title: 'BISTEK TAGALOG',
      image: '/bistek.jpg',
      description: 'Thinly sliced ribeye steak with caramelized onions in soy-calamansi sauce.',
      link: '/menu#karne'
    },
    {
      title: 'PANCIT MALABON',
      image: '/pancit-malabon.jpg',
      description: 'Thick rice noodles with homemade seafood sauce.',
      link: '/menu#pancit'
    }
  ];

  const lunchBoxFavorites = [
    {
      title: 'TOCILOG',
      image: '/tocilog.jpg',
      description: '...',
      link: '/menu#tocilog'
    },
    {
      title: 'LONGSILOG',
      image: '/longsilog.jpg',
      description: '...',
      link: '/menu#longsilog'
    },
    {
      title: 'TAPSILOG',
      image: '/tapsilog.jpg',
      description:'',
      link: '/menu#breakfast'
    },
    {
      title: 'HOTSILOG',
      image: '/hotsilo.jpg',
      description: '...',
      link: '/menu#hotsilog'
    }
  ];

  const classicComfortFoods = [
    {
      title: 'PORK ADOBO',
      image: '/pork-adobo.jpg',
      description: 'A Visayan-inspired, slow-cooked pork adobo.',
      link: '/menu#stew-meals'
    },
    {
      title: 'VEGAN KARE-KARE',
      image: '/vegan-kare.jpg',
      description: 'Freshly cooked in homemade peanut sauce.',
      link: '/menu#stew-meals'
    },
    {
      title: 'PORK BICOL EXPRESS',
      image: '/pork-bicol.jpg',
      description: 'A mildly spicy meat dish with coconut cream.',
      link: '/menu#stew-meals'
    },
    {
      title: 'PORK MENUDO',
      image: '/pork-menudo.jpg',
      description: 'Pork stew made with fresh vegetables.',
      link: '/menu#stew-meals'
    }
  ];

  const sweetTreats = [
    {
      title: 'MANGO FLOAT',
      image: '/mango-float.jpg',
      description: 'Filipino cake dessert with graham crackers, whipped cream and mangoes.',
      link: '/menu#desserts'
    },
    {
      title: 'BUKO PANDAN',
      image: '/buko-pandan.jpg',
      description: 'Pandan flavoured gelatine and young coconut in cream.',
      link: '/menu#desserts'
    },
    {
      title: 'BUTTERED PUTO',
      image: '/buttered-puto.jpg',
      description: 'Buttery sweet Filipino steamed rice cake.',
      link: '/menu#desserts'
    },
    {
      title: 'FRESHLY BAKED BIKO',
      image: '/baked-biko.jpg',
      description: 'Filipino sweet rice cake.',
      link: '/menu#desserts'
    }
  ];

  const categories = [
    { name: 'Pika-Pika', image: '/lumpia.jpg', link: '/menu#pika-pika' },
    { name: 'Karne', image: '/bistek.jpg', link: '/menu#karne' },
    { name: 'Empanadas', image: '/empanada.jpg', link: '/menu#empanadas' },
    { name: 'Stew Meals', image: '/pork-adobo.jpg', link: '/menu#stew-meals' },
    { name: 'Breakfast', image: '/tapsilog.jpg', link: '/menu#breakfast' },
    { name: 'Pancit & Pasta', image: '/pancit-malabon.jpg', link: '/menu#pancit' },
    { name: 'Fried Rice', image: '/sinangag.jpg', link: '/menu#fried-rice' },
    { name: 'Vegetables', image: '/tortang-talong.jpg', link: '/menu#gulay' },
    { name: 'Desserts', image: '/mango-float.jpg', link: '/menu#desserts' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            Delicious Filipino Cuisine
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 opacity-90"
          >
            Authentic flavors made with love by Nikki
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link 
              href="/menu"
              className="bg-white text-[#FF6B00] px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Browse All Recipes
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2">
          {/* New Recipes Section */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="inline-block bg-[#FF6B00] text-white px-3 py-1 rounded-full text-sm font-semibold mb-2">NEW!</span>
                <h2 className="text-3xl font-bold text-gray-800">Latest Dishes</h2>
              </div>
              <Link href="/menu" className="text-[#FF6B00] hover:underline font-semibold">
                Browse All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {newRecipes.map((recipe, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <Link href={recipe.link}>
                    <div className="relative h-48 w-full">
                      <Image 
                        src={recipe.image} 
                        alt={recipe.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-800 mb-2">{recipe.title}</h3>
                      <p className="text-gray-600 text-sm">{recipe.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Lunch Box Favorites */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Lunch Box Favorites</h2>
                <p className="text-gray-600">Easy and tasty meals for lunch or dinner!</p>
              </div>
              <Link href="/menu" className="text-[#FF6B00] hover:underline font-semibold">
                Browse All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lunchBoxFavorites.map((recipe, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <Link href={recipe.link}>
                    <div className="relative h-48 w-full">
                      <Image 
                        src={recipe.image} 
                        alt={recipe.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-800 mb-2">{recipe.title}</h3>
                      <p className="text-gray-600 text-sm">{recipe.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Classic Comfort Foods */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Classic Comfort Foods</h2>
                <p className="text-gray-600">Delicious and filling meals to keep you nourished!</p>
              </div>
              <Link href="/menu" className="text-[#FF6B00] hover:underline font-semibold">
                Browse All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {classicComfortFoods.map((recipe, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <Link href={recipe.link}>
                    <div className="relative h-48 w-full">
                      <Image 
                        src={recipe.image} 
                        alt={recipe.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-800 mb-2">{recipe.title}</h3>
                      <p className="text-gray-600 text-sm">{recipe.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Sweet Treats */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Sweet Treats</h2>
                <p className="text-gray-600">Delightful Filipino desserts!</p>
              </div>
              <Link href="/menu#desserts" className="text-[#FF6B00] hover:underline font-semibold">
                Browse All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sweetTreats.map((recipe, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <Link href={recipe.link}>
                    <div className="relative h-48 w-full">
                      <Image 
                        src={recipe.image} 
                        alt={recipe.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-800 mb-2">{recipe.title}</h3>
                      <p className="text-gray-600 text-sm">{recipe.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Welcome Section */}
          <div className="bg-orange-50 rounded-lg p-6 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Welcome!</h3>
            <p className="text-gray-700 mb-4">
              My name is Nikki and welcome to Kusina. Here you&apos;ll find delicious Filipino dishes made with authentic recipes and love. Make sure to browse around and pick a favorite dish or two. Happy eating!
            </p>
            <Link 
              href="/about"
              className="text-[#FF6B00] hover:underline font-semibold"
            >
              READ MORE →
            </Link>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Explore by Category</h3>
            <div className="grid grid-cols-2 gap-4">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href={category.link}
                  className="group"
                >
                  <div className="relative h-24 w-full rounded-lg overflow-hidden mb-2">
                    <Image 
                      src={category.image} 
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-opacity"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-sm text-center px-2">{category.name}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Link 
              href="/menu"
              className="block text-center mt-4 text-[#FF6B00] hover:underline font-semibold"
            >
              Browse All →
            </Link>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-[#FF6B00] text-white rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4">Get Updates!</h3>
            <p className="mb-4">Join our newsletter to get new menu updates and exclusive offers.</p>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full px-4 py-2 rounded mb-3 text-gray-800"
            />
            <button className="w-full bg-white text-[#FF6B00] px-4 py-2 rounded font-bold hover:bg-gray-100 transition-colors">
              Join now!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
