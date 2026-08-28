import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

const categories = [
    "Personalized Gifts",
    "Gift Hampers",
    "Greeting Cards",
    "Flowers",
    "Chocolates",
    "Photo Frames",
    "Custom Mugs",
    "Jewelry",
    "Soft Toys",
]

const MinCategory = () => {
    return (
        <section className="hidden sm:block bg-white w-full px-2 sm:px-12 overflow-hidden border-b mt-14">
            <div className="flex items-center justify-between p-0.5">
                {categories.map((el, i) => (
                    <Link to={`/products?category=${el}`} key={i} className="text-sm p-2 text-gray-800 font-medium hover:text-gray-600 flex items-center gap-0.5 group">{el} <span className="text-gray-400 group-hover:text-gray-600"><ExpandMoreIcon sx={{ fontSize: "16px" }} /></span></Link>
                ))}
            </div>
        </section>
    );
};

export default MinCategory;
