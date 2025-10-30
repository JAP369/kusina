'use client';

import FoodCard from '../../components/FoodCard';
import SideBar from '../../components/SideBar';

// Reusable section renderer
const MenuSection = ({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: Array<{ title: string; desc: string; price: string; image: string }>;
}) => (
  <section id={id} className="mb-16 scroll-mt-24">
    <h2 className="text-3xl font-bold text-[#FF6B00] mb-6 border-b-2 border-[#FF6B00] pb-2 inline-block">
      {title}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((food, index) => (
        <FoodCard key={`${id}-${index}`} {...food} />
      ))}
    </div>
  </section>
);

export default function MenuPage() {
  // === FOOD DATA ===
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Flex layout: Sidebar + Content */}
      <div className="flex gap-6 max-w-7xl mx-auto px-4 lg:px-8 pt-6">
        {/* Sidebar - sticky, animated */}
        <SideBar />

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 space-y-16 pb-12">
          <MenuSection id="pika-pika" title="Pika-Pika (Snacks & Finger food)" items={pikapikaFoods} />
          <MenuSection id="karne" title="Karne (Filipino Meat Dishes)" items={karneFoods} />
          <MenuSection id="stew-meals" title="Filipino Stew Meals (All served with plain rice)" items={stewMeals} />
          <MenuSection id="breakfast" title="All-day Filipino Breakfast meals (Silogs)" items={breakfastFoods} />
          <MenuSection id="pancit" title="Pancit (Filipino Noodles) & Pasta" items={pancitFoods} />
          <MenuSection id="fried-rice" title="Filipino Fried Rice" items={friedRiceFoods} />
          <MenuSection id="gulay" title="Gulay (Filipino Vegetable dishes)" items={gulayDishes} />
          <MenuSection id="side-dish" title="Side-dish / Add-ons" items={sideAddons} />
          <MenuSection id="desserts" title="Filipino Desserts" items={desserts} />
        </div>
      </div>
    </div>
  );
}