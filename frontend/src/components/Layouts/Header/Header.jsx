import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Searchbar from './Searchbar';
import PrimaryDropDownMenu from './PrimaryDropDownMenu';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';

const Header = () => {

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector(state => state.cart);
  const [togglePrimaryDropDown, setTogglePrimaryDropDown] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md fixed top-0 py-2 w-full z-50 border-b border-slate-200/80 shadow-sm transition-all duration-200">
      <div className="w-full max-w-7xl px-3 sm:px-6 m-auto flex justify-between items-center gap-2 sm:gap-4 relative">

        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3 sm:gap-6 flex-1 min-w-0">
          <Link className="flex items-center gap-2.5 min-w-max group" to="/">
            <div className="relative">
              <img 
                src={logo} 
                alt="Custom Hub" 
                className="h-10 w-10 sm:h-11 sm:w-11 object-contain rounded-full bg-white shadow-md p-0.5 ring-2 ring-amber-400 group-hover:scale-105 transition duration-200" 
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-slate-900 font-extrabold text-base sm:text-lg tracking-tight group-hover:text-amber-600 transition">CUSTOM HUB</span>
              <span className="text-slate-500 text-[9px] sm:text-[10px] font-bold tracking-wider uppercase mt-0.5">Sublimation & Gifts</span>
            </div>
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-xl hidden md:block">
            <Searchbar />
          </div>
        </div>

        {/* Search bar for small screens (always visible) */}
        <div className="flex-1 block md:hidden max-w-xs">
          <Searchbar />
        </div>

        {/* Right Action Items */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">

          {/* Direct WhatsApp Callout Button */}
          <a
            href="https://api.whatsapp.com/send?phone=917550079573&text=Hi%20Kaaviyaselvan,%20I%20want%20to%20order%20from%20Custom%20Hub!"
            target="_blank"
            rel="noreferrer"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold shadow-xs transition duration-150"
            title="Chat with Kaaviyaselvan"
          >
            <WhatsAppIcon sx={{ fontSize: 16 }} />
            <span>+91 7550079573</span>
          </a>

          {/* User Auth / Account */}
          {isAuthenticated === false ? (
            <Link 
              to="/login" 
              className="px-4 py-1.5 text-sm font-semibold text-white bg-amber-500 hover:bg-amber-600 rounded-lg shadow-sm hover:shadow transition duration-150"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <button 
                className="userDropDown flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition"
                onClick={() => setTogglePrimaryDropDown(!togglePrimaryDropDown)}
              >
                <span>{user.name && user.name.split(" ", 1)}</span>
                {togglePrimaryDropDown ? <ExpandLessIcon sx={{ fontSize: "16px" }} /> : <ExpandMoreIcon sx={{ fontSize: "16px" }} />}
              </button>
              {togglePrimaryDropDown && <PrimaryDropDownMenu setTogglePrimaryDropDown={setTogglePrimaryDropDown} user={user} />}
            </div>
          )}

          {/* Cart Icon & Count */}
          <Link 
            to="/cart" 
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:text-amber-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg relative transition"
          >
            <ShoppingCartIcon sx={{ fontSize: 20 }} />
            <span className="hidden sm:inline">Cart</span>
            {cartItems.length > 0 && (
              <span className="min-w-[18px] h-[18px] px-1 bg-amber-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center -ml-0.5">
                {cartItems.length}
              </span>
            )}
          </Link>

        </div>

      </div>
    </header>
  );
};

export default Header;
