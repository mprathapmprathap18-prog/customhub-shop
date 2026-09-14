import { Link } from 'react-router-dom';

const categoriesList = [
    { name: "Custom Mugs", emoji: "☕", badge: "Sublimation", gradient: "from-amber-400 to-orange-500" },
    { name: "Personalized Gifts", emoji: "🎁", badge: "Hot", gradient: "from-pink-500 to-rose-500" },
    { name: "Photo Frames", emoji: "🖼️", badge: "Popular", gradient: "from-blue-400 to-indigo-500" },
    { name: "Gift Hampers", emoji: "🧺", badge: "Combos", gradient: "from-purple-400 to-violet-600" },
    { name: "Flowers", emoji: "💐", badge: "Fresh", gradient: "from-emerald-400 to-teal-500" },
    { name: "Chocolates", emoji: "🍫", badge: "Sweet", gradient: "from-amber-700 to-yellow-800" },
    { name: "Greeting Cards", emoji: "💌", badge: "Custom", gradient: "from-red-400 to-pink-500" },
    { name: "Jewelry", emoji: "✨", badge: "Premium", gradient: "from-cyan-400 to-blue-600" },
    { name: "Soft Toys", emoji: "🧸", badge: "Cute", gradient: "from-orange-400 to-red-400" },
];

const Categories = () => {
    return (
        <section className="bg-white border-b border-slate-200/80 shadow-xs mt-14 sm:mt-16 w-full py-2 sm:py-3 px-3 sm:px-6">
            <div className="max-w-7xl mx-auto flex items-center justify-start md:justify-between gap-3 sm:gap-4 overflow-x-auto no-scrollbar py-1">
                {categoriesList.map((item, i) => (
                    <Link 
                        to={`/products?category=${encodeURIComponent(item.name)}`} 
                        className="flex flex-col items-center shrink-0 group p-1.5 rounded-xl hover:bg-slate-50 transition duration-150" 
                        key={i}
                    >
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-2xl sm:text-2xl shadow-sm group-hover:scale-105 group-hover:shadow-md transition duration-200`}>
                            <span>{item.emoji}</span>
                        </div>
                        <span className="text-[11px] sm:text-xs font-semibold text-slate-700 group-hover:text-amber-600 transition mt-1.5 text-center whitespace-nowrap">
                            {item.name}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Categories;
