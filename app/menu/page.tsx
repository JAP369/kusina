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

  const manokFoods = [
    { title: 'Chicken Adobo', desc: 'Braised chicken, marinated and stewed with vinegar, soy sauce, garlic, bay leaves, black peppercorns', price: 'HK$68', image: '/chicken-adobo.jpg' },
        { title: 'Manok na Bicol Express', desc: 'Spicy chicken coconut stew', price: 'HK$68', image: '/chicken-bicol-express.jpg' },
    
  ];

  const baboyFoods = [
    { title: 'Lechon Kawali', desc: 'Crispy pork belly', price: 'HK$68', image: '/lechon-kawali.jpg' },
    { title: 'Pork Menudo', desc: 'Tomato-based pork stew', price: 'HK$68', image: '/pork-menudo.jpg' },
    { title: 'Pork in Bicol Express', desc: 'Spicy coconut pork', price: 'HK$68', image: '/pork-bicol-express.jpg' },
    { title: 'Pork Adobo', desc: 'Classic Filipino braised pork', price: 'HK$68', image: '/pork-adobo.jpg' },
    { title: 'Dinuguan', desc: 'Pork blood stew', price: 'HK$68', image: '/dinuguan.jpg' },
        { title: 'Pork Sisig', desc: 'Sizzling pork face and ears', price: 'HK$78', image: '/pork-sisig.jpg' },
  ];

    const bakaFoods = [
       { title: 'Kare-Kare', desc: 'Oxtail stew in peanut sauce', price: 'HK$68', image: '/kare-kare.jpg' },
{ title: 'Bistek Tagalog', desc: 'Filipino beef steak', price: 'HK$68', image: '/bistek-tagalog.jpg' },
  ];


  const stewMeals = [




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
    { title: 'Pancit Palabok', desc: 'Filipino noodle dish with a rich, savory, and orange-hued garlic-shrimp sauce poured over thin rice noodles', price: 'HK$65', image: '/palabok.jpg' },
    { title: 'Filipino Spaghetti', desc: 'Sweet-style spaghetti', price: 'HK$65', image: '/spaghetti.jpg' },
  ];

  const friedRiceFoods = [
    { title: 'Sinangag', desc: 'Garlic fried rice', price: 'HK$40', image: '/sinangag.jpg' },
    { title: 'Bagoong Rice', desc: 'Shrimp paste fried rice', price: 'HK$50', image: '/bagoong-rice.jpg' },
  ];

  const gulayDishes = [
    { title: 'Laing', desc: 'spicy taro leaves cooked in coconut milk', price: 'HK$60', image: '/laing.jpg' },
    { title: 'Tortang Talong', desc: 'eggplant omelet (or fritter) made by pan-frying whole grilled eggplant', price: 'HK$60', image: '/tortang-talong.jpg' },
    { title: 'Adobong Sitaw', desc: 'a flavorful Filipino vegetable dish featuring string beans (sitaw, or long green beans) that are sautéed and simmered in a savory and tangy adobo sauce', price: 'HK$60', image: '/adobong-sitaw.jpg' },
  ];

  const sideAddons = [
    { title: 'Atsara', desc: 'Pickled papaya relish', price: 'HK$30', image: '/atsara.jpg' },
    { title: 'Steamed Rice', desc: 'Plain steamed white rice', price: 'HK$15', image: '/steamed-rice.jpg' },
    { title: 'Fried Egg', desc: 'Sunny-side up egg', price: 'HK$10', image: '/fried-egg.jpg' },
  ];

  const desserts = [
    { title: 'Ube Maja Blanca', desc: 'a vibrant, creamy, and velvety delicacy known for its distinct purple color and sweet, nutty, vanilla-like flavor profile', price: 'HK$60', image: '/ube-maja.jpg' },
    { title: 'Puto Cheese', desc: 'soft, fluffy, steamed cakes topped with a slice of melted cheese', price: 'HK$60', image: '/puto-cheese.jpg' },
    { title: 'Puto Bumbong', desc: 'a Filipino purple rice cake steamed in bamboo tubes', price: 'HK$60', image: '/puto-bumbong.jpg' },
    { title: 'Leche Flan', desc: 'a creamy, custard dessert with a layer of caramelized sugar', price: 'HK$60', image: '/leche-flan.jpg' },
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
          <MenuSection id="manok" title="Manok (Filipino Chicken Dishes)" items={manokFoods} />
          <MenuSection id="baboy" title="Baboy (Filipino Pork Dishes)" items={baboyFoods} />
          <MenuSection id="baka" title="Baka (Filipino Beef Dishes)" items={bakaFoods} />
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