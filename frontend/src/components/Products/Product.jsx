import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Link } from 'react-router-dom';
import { getDiscount } from '../../utils/functions';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../actions/wishlistAction';
import { useSnackbar } from 'notistack';

const Product = ({ _id, name, images, ratings, numOfReviews, price, cuttedPrice, category }) => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { wishlistItems } = useSelector((state) => state.wishlist);

    const itemInWishlist = wishlistItems.some((i) => i.product === _id);

    const addToWishlistHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (itemInWishlist) {
            dispatch(removeFromWishlist(_id));
            enqueueSnackbar("Removed from Wishlist", { variant: "info" });
        } else {
            dispatch(addToWishlist(_id));
            enqueueSnackbar("Added to Wishlist ❤️", { variant: "success" });
        }
    };

    const whatsappMessage = encodeURIComponent(
        `👋 Hi Kaaviyaselvan, I want to order this product from Custom Hub:\n\n*${name}*\nPrice: ₹${price}\n\nPlease share details on customization and delivery!`
    );

    return (
        <div className="group bg-white rounded-2xl border border-slate-200/80 hover:border-amber-400 shadow-xs hover:shadow-xl transition-all duration-300 p-3.5 flex flex-col justify-between relative overflow-hidden">
            
            {/* Top Bar: Category Badge & Wishlist Button */}
            <div className="flex justify-between items-center w-full z-10">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs uppercase tracking-wider">
                    {category || "Custom Gift"}
                </span>
                
                {/* Wishlist Heart Button */}
                <button 
                    onClick={addToWishlistHandler} 
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-xs ${
                        itemInWishlist 
                            ? "bg-rose-100 text-rose-600 scale-110" 
                            : "bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 hover:scale-105"
                    }`}
                    title={itemInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                    <FavoriteIcon sx={{ fontSize: 17 }} />
                </button>
            </div>

            {/* Product Image & Link */}
            <Link to={`/product/${_id}`} className="flex flex-col items-center mt-2 group/link">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300">
                    <img 
                        draggable="false" 
                        className="w-full h-full object-contain mix-blend-multiply" 
                        src={images && images[0] ? images[0].url : "/logo.png"} 
                        alt={name} 
                    />
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-slate-800 group-hover/link:text-amber-600 transition-colors duration-150 mt-3 text-center line-clamp-2 h-10 px-1 leading-snug">
                    {name}
                </h3>
            </Link>

            {/* Ratings & Price */}
            <div className="mt-2 flex flex-col gap-2 w-full pt-1 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 font-bold text-slate-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                        <StarIcon sx={{ fontSize: 14, color: '#f59e0b' }} />
                        <span>{ratings ? Number(ratings).toFixed(1) : "5.0"}</span>
                        <span className="text-slate-400 font-normal">({numOfReviews || 12})</span>
                    </span>

                    {cuttedPrice && cuttedPrice > price && (
                        <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                            {getDiscount(price, cuttedPrice)}% OFF
                        </span>
                    )}
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-2">
                    <span className="text-lg sm:text-xl font-black text-slate-900">₹{price?.toLocaleString()}</span>
                    {cuttedPrice && cuttedPrice > price && (
                        <span className="text-xs text-slate-400 line-through">₹{cuttedPrice?.toLocaleString()}</span>
                    )}
                </div>

                {/* Multi-Colored Interactive Action Buttons */}
                <div className="grid grid-cols-2 gap-1.5 mt-1 pt-1">
                    {/* View Details / Buy Button (Electric Amber) */}
                    <Link
                        to={`/product/${_id}`}
                        className="py-2 px-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-200"
                    >
                        <ShoppingBagIcon sx={{ fontSize: 14 }} />
                        <span>Order</span>
                    </Link>

                    {/* WhatsApp Quick Order Button (Emerald Green) */}
                    <a
                        href={`https://api.whatsapp.com/send?phone=917550079573&text=${whatsappMessage}`}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2 px-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-200"
                        title="Chat & Order via WhatsApp"
                    >
                        <WhatsAppIcon sx={{ fontSize: 15 }} />
                        <span>WhatsApp</span>
                    </a>
                </div>
            </div>

        </div>
    );
};

export default Product;
