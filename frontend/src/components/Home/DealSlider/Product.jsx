import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Product = ({ image, name, offer, tag }) => {
    return (
        <Link 
            to="/products" 
            className="group bg-white rounded-2xl border border-slate-200/80 hover:border-amber-400 shadow-xs hover:shadow-xl transition-all duration-300 p-3.5 mx-1.5 flex flex-col items-center justify-between relative overflow-hidden"
        >
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300">
                <img draggable="false" className="w-full h-full object-contain mix-blend-multiply" src={image} alt={name} />
            </div>
            
            <h3 className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-amber-600 transition-colors mt-2 text-center line-clamp-1">
                {name}
            </h3>

            <div className="flex flex-col items-center gap-1 mt-1.5 w-full">
                <span className="text-xs font-black text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                    {offer}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold tracking-wide">
                    {tag}
                </span>
            </div>

            <div className="mt-3 w-full py-1.5 bg-slate-100 group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-white text-slate-700 text-[11px] font-bold rounded-lg flex items-center justify-center gap-1 transition-all duration-200">
                <span>View Offer</span>
                <ArrowForwardIcon sx={{ fontSize: 12 }} />
            </div>
        </Link>
    );
};

export default Product;
