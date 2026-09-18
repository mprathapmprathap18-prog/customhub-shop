import { Link } from 'react-router-dom';

const categoriesList = [
    { name: "Toy Cars & Diecast", emoji: "🚗", badge: "Trending", gradient: "from-sky-500 to-blue-700" },
    { name: "Night Lamps & Decor", emoji: "💡", badge: "New", gradient: "from-yellow-400 to-amber-500" },
    { name: "Custom Mugs", emoji: "☕", badge: "Sublimation", gradient: "from-slate-700 to-slate-900" },
    { name: "Photo Frames", emoji: "🖼️", badge: "Popular", gradient: "from-sky-600 to-slate-800" },
    { name: "Personalized Gifts", emoji: "🎁", badge: "Hot", gradient: "from-yellow-400 to-amber-600" },
    { name: "Gift Hampers", emoji: "🧺", badge: "Combos", gradient: "from-slate-800 to-sky-700" },
    { name: "Greeting Cards", emoji: "💌", badge: "Custom", gradient: "from-sky-400 to-sky-600" },
    { name: "Flowers", emoji: "💐", badge: "Fresh", gradient: "from-emerald-500 to-teal-700" },
    { name: "Chocolates", emoji: "🍫", badge: "Sweet", gradient: "from-amber-600 to-slate-900" },
];

const Categories = () => {
    return (
        <section className="bg-white border-b border-slate-200 shadow-xs mt-14 sm:mt-16 w-full py-2 sm:py-3 px-3 sm:px-6">
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
                        <span className="text-[11px] sm:text-xs font-bold text-slate-700 group-hover:text-sky-600 transition mt-1.5 text-center whitespace-nowrap">
                            {item.name}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Categories;
