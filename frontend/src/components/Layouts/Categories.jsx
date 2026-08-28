import fashion from '../../assets/images/Categories/fashion.png';
import electronics from '../../assets/images/Categories/electronics.png';
import home from '../../assets/images/Categories/home.png';
import travel from '../../assets/images/Categories/travel.png';
import appliances from '../../assets/images/Categories/appliances.png';
import furniture from '../../assets/images/Categories/furniture.png';
import beauty from '../../assets/images/Categories/beauty.png';
import grocery from '../../assets/images/Categories/grocery.png';
import mobiles from '../../assets/images/Categories/phone.png';
import { Link } from 'react-router-dom';

const catNav = [
    { name: "Personalized Gifts", icon: fashion },
    { name: "Gift Hampers", icon: grocery },
    { name: "Greeting Cards", icon: home },
    { name: "Flowers", icon: beauty },
    { name: "Chocolates", icon: appliances },
    { name: "Photo Frames", icon: furniture },
    { name: "Custom Mugs", icon: electronics },
    { name: "Jewelry", icon: travel },
    { name: "Soft Toys", icon: mobiles },
]

const Categories = () => {
    return (
        <section className="hidden sm:block bg-white mt-10 mb-4 min-w-full px-12 py-1 shadow overflow-hidden">

            <div className="flex items-center justify-between mt-4">

                {catNav.map((item, i) => (
                    <Link to={`/products?category=${item.name}`} className="flex flex-col gap-1 items-center p-2 group" key={i}>
                        <div className="h-16 w-16">
                            <img draggable="false" className="h-full w-full object-contain" src={item.icon} alt={item.name} />
                        </div>
                        <span className="text-sm text-gray-800 font-medium group-hover:text-gray-600">{item.name}</span>
                    </Link>
                ))}

            </div>
        </section>
    );
};

export default Categories;
