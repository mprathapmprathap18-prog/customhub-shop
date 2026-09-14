import { Link } from 'react-router-dom';

const Product = ({ image, name, offer, tag }) => {
    return (
        <Link to="/products" className="group bg-white rounded-2xl border border-slate-100 hover:border-amber-300 shadow-xs hover:shadow-lg transition-all duration-200 p-3 mx-1.5 flex flex-col items-center justify-between relative overflow-hidden">
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-200">
                <img draggable="false" className="w-full h-full object-contain" src={image} alt={name} />
            </div>
            <h3 className="font-semibold text-xs sm:text-sm text-slate-800 group-hover:text-amber-600 transition mt-2 text-center line-clamp-1">
                {name}
            </h3>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full mt-1">
                {offer}
            </span>
            <span className="text-[11px] text-slate-400 font-medium mt-0.5">
                {tag}
            </span>
        </Link>
    );
};

export default Product;
