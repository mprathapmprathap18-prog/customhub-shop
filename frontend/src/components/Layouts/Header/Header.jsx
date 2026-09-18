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
    <header className="bg-white/95 backdrop-blur-md fixed top-0 py-2 w-full z-50 border-b border-slate-200 shadow-xs transition-all duration-200">
      <div className="w-full max-w-7xl px-3 sm:px-6 m-auto flex justify-between items-center gap-2 sm:gap-4 relative">

        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3 sm:gap-6 flex-1 min-w-0">
          <Link className="flex items-center gap-2.5 min-w-max group" to="/">
            <div className="relative">
              <img 
                src={logo} 
                alt="Custom Hub" 
                className="h-10 w-10 sm:h-11 sm:w-11 object-contain rounded-full bg-white shadow-md p-0.5 ring-2 ring-yellow-400 group-hover:scale-105 transition duration-200" 
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-sky-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-slate-900 font-black text-base sm:text-lg tracking-tight group-hover:text-sky-600 transition">CUSTOM HUB</span>
              <span className="text-sky-600 text-[9px] sm:text-[10px] font-extrabold tracking-wider uppercase mt-0.5">Sublimation & Gifts</span>
            </div>
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-xl hidden md:block">
            <Searchbar />
          </div>
        </div>

        {/* Search bar for small screens */}
        <div className="flex-1 block md:hidden max-w-xs">
          <Searchbar />
        </div>

        {/* Right Action Items */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">

          {/* Direct WhatsApp Callout Button (Sky Blue / Emerald) */}
          <a
            href="https://api.whatsapp.com/send?phone=917550079573&text=Hi%20Kaaviyaselvan,%20I%20want%20to%20order%20from%20Custom%20Hub!"
            target="_blank"
            rel="noreferrer"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 rounded-full text-xs font-bold shadow-xs transition duration-150"
            title="Chat with Kaaviyaselvan"
          >
            <WhatsAppIcon sx={{ fontSize: 16 }} className="text-emerald-600" />
            <span>+91 7550079573</span>
          </a>

          {/* User Auth / Account (Vibrant Yellow) */}
          {!isAuthenticated ? (
            <Link 
              to="/login" 
              className="px-4 py-1.5 text-sm font-bold text-slate-900 bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-500 hover:to-amber-500 rounded-xl shadow-xs hover:shadow transition duration-150"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <button 
                className="userDropDown flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                onClick={() => setTogglePrimaryDropDown(!togglePrimaryDropDown)}
              >
                <span>{user && user.name ? user.name.split(" ", 1)[0] : 'Account'}</span>
                {togglePrimaryDropDown ? <ExpandLessIcon sx={{ fontSize: "16px" }} /> : <ExpandMoreIcon sx={{ fontSize: "16px" }} />}
              </button>
              {togglePrimaryDropDown && user && <PrimaryDropDownMenu setTogglePrimaryDropDown={setTogglePrimaryDropDown} user={user} />}
            </div>
          )}

          {/* Cart Icon & Count */}
          <Link 
            to="/cart" 
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-slate-700 hover:text-sky-600 bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-xl relative transition duration-150"
          >
            <ShoppingCartIcon sx={{ fontSize: 20 }} />
            <span className="hidden sm:inline">Cart</span>
            {cartItems.length > 0 && (
              <span className="min-w-[18px] h-[18px] px-1 bg-yellow-400 text-slate-950 text-[11px] font-black rounded-full flex items-center justify-center -ml-0.5 shadow-xs">
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
