import { getDiscount } from '../../../utils/functions';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../../actions/wishlistAction';
import { useSnackbar } from 'notistack';

const Product = (props) => {

    const { _id, name, images, ratings, numOfReviews, price, cuttedPrice } = props;

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { wishlistItems } = useSelector((state) => state.wishlist);
    
    const itemInWishlist = wishlistItems.some((i) => i.product === _id);

    const addToWishlistHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(itemInWishlist) {
            dispatch(removeFromWishlist(_id));
            enqueueSnackbar("Removed from Wishlist", { variant: "info" });
        } else {
            dispatch(addToWishlist(_id));
            enqueueSnackbar("Added to Wishlist", { variant: "success" });
        }
    };

    const whatsappMessage = encodeURIComponent(`👋 Hi Kaaviyaselvan, I want to order this product from Custom Hub:\n\n*${name}*\nPrice: ₹${price}\n\nPlease let me know how to send my customization photo/name!`);

    return (
        <div className="group bg-white rounded-2xl border border-slate-100 hover:border-amber-300 shadow-xs hover:shadow-lg transition-all duration-200 p-3 mx-1.5 flex flex-col justify-between relative overflow-hidden">
            
            {/* Top Badges */}
            <div className="flex justify-between items-center w-full z-10">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 uppercase">
                    Custom Print
                </span>
                
                {/* Wishlist Button */}
                <button 
                    onClick={addToWishlistHandler} 
                    className="w-7 h-7 rounded-full bg-slate-50 hover:bg-rose-50 flex items-center justify-center transition shadow-xs"
                    title={itemInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                    <FavoriteIcon sx={{ fontSize: 16 }} className={itemInWishlist ? "text-rose-500" : "text-slate-300 hover:text-rose-400"} />
                </button>
            </div>

            {/* Product Image & Link */}
            <Link to={`/product/${_id}`} className="flex flex-col items-center mt-2">
                <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-200">
                    <img draggable="false" className="w-full h-full object-contain" src={images && images[0] ? images[0].url : ""} alt={name} />
                </div>

                <h3 className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-amber-600 transition mt-3 text-center line-clamp-2 h-9 px-1">
                    {name}
                </h3>
            </Link>

            {/* Ratings & Price */}
            <div className="mt-2 flex flex-col gap-1.5 w-full">
                <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                        <StarIcon sx={{ fontSize: 14, color: '#f59e0b' }} />
                        <span>{ratings ? ratings.toFixed(1) : "5.0"}</span>
                        <span className="text-slate-400 font-normal">({numOfReviews || 0})</span>
                    </span>

                    {cuttedPrice && cuttedPrice > price && (
                        <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                            {getDiscount(price, cuttedPrice)}% OFF
                        </span>
                    )}
                </div>

                <div className="flex items-baseline justify-between pt-1">
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-base sm:text-lg font-extrabold text-slate-900">₹{price.toLocaleString()}</span>
                        {cuttedPrice && cuttedPrice > price && (
                            <span className="text-xs text-slate-400 line-through">₹{cuttedPrice.toLocaleString()}</span>
                        )}
                    </div>

                    {/* Quick WhatsApp Inquiry */}
                    <a
                        href={`https://api.whatsapp.com/send?phone=917550079573&text=${whatsappMessage}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-7 h-7 rounded-full bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white flex items-center justify-center transition shadow-xs"
                        title="Quick WhatsApp Order"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <WhatsAppIcon sx={{ fontSize: 16 }} />
                    </a>
                </div>
            </div>

        </div>
    );
};

export default Product;
