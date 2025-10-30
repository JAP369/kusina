'use client';

import FoodCard from '../../components/FoodCard';
import SideBar from '../../components/SideBar';

export default function MenuPage() {
  const pikapikaFoods = [
    { title: 'Chicken Lumpia', desc: 'Fried spring rolls filled with the perfect blend of minced chicken and vegetables.', price: 'HK$48', image: '/chicken-lumpia.jpg' },
    { title: 'Cheese Sticks', desc: 'Mozzarella cheese-filled sticks', price: 'HK$48', image: '/cheese-sticks.jpg' },
    { title: 'Spicy Wingettes', desc: 'Crispy, crunchy wingettes', price: 'HK$48', image: '/wingettes.jpg' },
  ];

  const karneFoods = [
    { title: 'Lechon Kawali', desc: 'Crispy pork belly', price: 'HK$68', image: '/lechon-kawali.jpg' },
    { title: 'Bistek Tagalog', desc: 'Filipino beef steak', price: 'HK$68', image: '/bistek-tagalog.jpg' },
    
  ];

  const stewMeals = [
    { title: 'Chicken Adobo', desc: 'Braised chicken, marinated and stewed with vinegar, soy sauce, garlic, bay leaves, black peppercorns', price: 'HK$68', image: '/chicken-adobo.jpg' },
    { title: 'Kare-Kare', desc: 'Oxtail stew in peanut sauce', price: 'HK$68', image: '/kare-kare.jpg' },
    { title: 'Manok na Bicol Express', desc: 'Spicy chicken coconut stew', price: 'HK$68', image: '/chicken-bicol-express.jpg' },
    { title: 'Pork Menudo', desc: 'Tomato-based pork stew', price: 'HK$110', image: '/pork-menudo.jpg' },
    { title: 'Pork in Bicol Express', desc: 'Spicy coconut pork', price: 'HK$110', image: '/pork-bicol-express.jpg' },
    { title: 'Pork Adobo', desc: 'Classic Filipino braised pork', price: 'HK$68', image: '/pork-adobo.jpg' },
    { title: 'Dinuguan', desc: 'Pork blood stew', price: 'HK$110', image: '/dinuguan.jpg' },
  ];

  const breakfastFoods = [
    { title: 'Tapsilog', desc: 'Beef tapa, egg & rice', price: 'HK$68', image: '/tapsilog.jpg' },
    { title: 'Tocilog', desc: 'Sweet pork, egg & rice', price: 'HK$68', image: '/tocilog.jpg' },
    { title: 'Bangsilog', desc: 'Milkfish, egg & rice', price: 'HK$68', image: '/bangsilog.jpg' },
    { title: 'Cornsilog', desc: 'Corned beef, egg & rice', price: 'HK$68', image: '/cornsilog.jpg' },
    { title: 'Hotsilog', desc: 'Hotdog, egg & rice', price: 'HK$68', image: '/hotsilog.jpg' },
    { title: 'Longsilog', desc: 'Longganisa, egg & rice', price: 'HK$68', image: '/longsilog.jpg' },

  ];

  const pancitFoods = [
    { title: 'Pancit Malabon', desc: 'Thick noodles with seafood', price: 'HK$120', image: '/pancit-malabon.jpg' },
    { title: 'Filipino Spaghetti', desc: 'Sweet-style spaghetti', price: 'HK$120', image: '/filipino-spaghetti.jpg' },
  ];

  const friedRiceFoods = [
    { title: 'Sinangag', desc: 'Garlic fried rice', price: 'HK$40', image: '/sinangag.jpg' },
    { title: 'Bagoong Rice', desc: 'Shrimp paste fried rice', price: 'HK$50', image: '/bagoong-rice.jpg' },
    { title: 'Omnipork Rice', desc: 'Plant-based pork rice', price: 'HK$60', image: '/omnipork-rice.jpg' },
  ];

  const gulayDishes = [
    { title: 'Mushroom', desc: 'Sautéed mushroom dish', price: 'HK$90', image: '/mushroom.jpg' },
    { title: 'Omni Escabeche', desc: 'Sweet & sour plant-based', price: 'HK$90', image: '/omni-escabeche.jpg' },
    { title: 'Laing', desc: 'Taro leaves in coconut milk', price: 'HK$90', image: '/laing.jpg' },
    { title: 'Tortang Talong', desc: 'Eggplant omelette', price: 'HK$90', image: '/tortang-talong.jpg' },
    { title: 'Garlic Okra', desc: 'Garlicky okra stir-fry', price: 'HK$90', image: '/garlic-okra.jpg' },
    { title: 'Ginisang Sitaw', desc: 'Sautéed green beans', price: 'HK$90', image: '/ginisang-sitaw.jpg' },
  ];

  const sideAddons = [
    { title: 'Atsara', desc: 'Pickled papaya relish', price: 'HK$30', image: '/atsara.jpg' },
    { title: 'Steamed Rice', desc: 'Plain steamed white rice', price: 'HK$15', image: '/steamed-rice.jpg' },
    { title: 'Fried Egg', desc: 'Sunny-side up egg', price: 'HK$10', image: '/fried-egg.jpg' },
  ];

  const desserts = [
    { title: 'Pandan Maja', desc: 'Coconut pandan pudding', price: 'HK$60', image: '/pandan-maja.jpg' },
    { title: 'Buttered Puto', desc: 'Steamed rice cake', price: 'HK$50', image: '/buttered-puto.jpg' },
    { title: 'Mango Float', desc: 'Layered mango dessert', price: 'HK$70', image: '/mango-float.jpg' },
    { title: 'Buko Pandan', desc: 'Young coconut jelly salad', price: 'HK$60', image: '/buko-pandan.jpg' },
    { title: 'Baked Biko', desc: 'Sweet rice cake', price: 'HK$60', image: '/baked-biko.jpg' },
  ];

  //   const empanadasFoods = [
//     { title: 'Empanada', desc: 'Savory meat-filled pastry', price: 'HK$25 each', image: '/empanada.jpg' },
//   ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="flex">
        {/* Sidebar */}
        <SideBar />

        {/* Main Content */}
        <div className="flex-1 lg:ml-64 p-6">
          {/* Pika-Pika Section */}
          <section id="pika-pika" className="mb-16">
            <h2 className="text-3xl font-bold text-[#FF6B00] mb-6 border-b-2 border-[#FF6B00] pb-2">
              Pika-Pika (Snacks & Finger food)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {pikapikaFoods.map((food, index) => (
                <FoodCard key={`pika-${index}`} {...food} />
              ))}
            </div>
          </section>

          {/* Karne Section */}
          <section id="karne" className="mb-16">
            <h2 className="text-3xl font-bold text-[#FF6B00] mb-6 border-b-2 border-[#FF6B00] pb-2">
              Karne (Filipino Meat Dishes)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {karneFoods.map((food, index) => (
                <FoodCard key={`karne-${index}`} {...food} />
              ))}
            </div>
          </section>

          {/* Empanadas Section */}
          {/* <section id="empanadas" className="mb-16">
            <h2 className="text-3xl font-bold text-[#FF6B00] mb-6 border-b-2 border-[#FF6B00] pb-2">
              Empanadas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {empanadasFoods.map((food, index) => (
                <FoodCard key={`empanada-${index}`} {...food} />
              ))}
            </div>
          </section> */}

          {/* Stew Meals Section */}
          <section id="stew-meals" className="mb-16">
            <h2 className="text-3xl font-bold text-[#FF6B00] mb-6 border-b-2 border-[#FF6B00] pb-2">
              Stew Meals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {stewMeals.map((food, index) => (
                <FoodCard key={`stew-${index}`} {...food} />
              ))}
            </div>
          </section>

          {/* Filipino Breakfast Section */}
          <section id="breakfast" className="mb-16">
            <h2 className="text-3xl font-bold text-[#FF6B00] mb-6 border-b-2 border-[#FF6B00] pb-2">
              Filipino Breakfast
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {breakfastFoods.map((food, index) => (
                <FoodCard key={`breakfast-${index}`} {...food} />
              ))}
            </div>
          </section>

          {/* Pancit Section */}
          <section id="pancit" className="mb-16">
            <h2 className="text-3xl font-bold text-[#FF6B00] mb-6 border-b-2 border-[#FF6B00] pb-2">
              Pancit
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {pancitFoods.map((food, index) => (
                <FoodCard key={`pancit-${index}`} {...food} />
              ))}
            </div>
          </section>

          {/* Filipino Fried Rice Section */}
          <section id="fried-rice" className="mb-16">
            <h2 className="text-3xl font-bold text-[#FF6B00] mb-6 border-b-2 border-[#FF6B00] pb-2">
              Filipino Fried Rice
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {friedRiceFoods.map((food, index) => (
                <FoodCard key={`rice-${index}`} {...food} />
              ))}
            </div>
          </section>

          {/* Gulay Section */}
          <section id="gulay" className="mb-16">
            <h2 className="text-3xl font-bold text-[#FF6B00] mb-6 border-b-2 border-[#FF6B00] pb-2">
              Gulay
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {gulayDishes.map((food, index) => (
                <FoodCard key={`gulay-${index}`} {...food} />
              ))}
            </div>
          </section>

          {/* Side-dish Section */}
          <section id="side-dish" className="mb-16">
            <h2 className="text-3xl font-bold text-[#FF6B00] mb-6 border-b-2 border-[#FF6B00] pb-2">
              Side-dish
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {sideAddons.map((food, index) => (
                <FoodCard key={`side-${index}`} {...food} />
              ))}
            </div>
          </section>

          {/* Desserts Section */}
          <section id="desserts" className="mb-16">
            <h2 className="text-3xl font-bold text-[#FF6B00] mb-6 border-b-2 border-[#FF6B00] pb-2">
              Desserts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {desserts.map((food, index) => (
                <FoodCard key={`dessert-${index}`} {...food} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
