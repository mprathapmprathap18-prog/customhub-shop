import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import logo from '../../../assets/images/logo.png';
import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Footer = () => {

  const location = useLocation();
  const [adminRoute, setAdminRoute] = useState(false);

  useEffect(() => {
    setAdminRoute(location.pathname.split("/", 2).includes("admin") || location.pathname.split("/", 2).includes("owner"));
  }, [location]);

  if (adminRoute) return null;

  return (
    <footer className="mt-16 bg-slate-900 text-slate-300 text-xs border-t border-slate-800">
      
      {/* Top Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Column */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="Custom Hub" className="h-10 w-10 object-contain rounded-full bg-white p-0.5 ring-2 ring-amber-400" />
            <div className="flex flex-col leading-none">
              <span className="text-white font-extrabold text-lg">CUSTOM HUB</span>
              <span className="text-amber-400 text-[10px] font-bold uppercase tracking-wider">Sublimation Shop</span>
            </div>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed mt-1">
            Your destination for personalized sublimation mugs, customized t-shirts, photo frames, greeting cards & memorable gifts for all loved ones.
          </p>
          <div className="flex items-center gap-2 mt-2">
            <a 
              href="https://api.whatsapp.com/send?phone=917550079573&text=Hi%20Kaaviyaselvan,%20I%20have%20an%20inquiry%20for%20Custom%20Hub!"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow transition"
            >
              <WhatsAppIcon sx={{ fontSize: 16 }} />
              <span>Chat with Owner (Kaaviyaselvan)</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2.5">
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-1">Quick Links</h3>
          <Link to="/products" className="text-slate-400 hover:text-amber-400 transition">All Products</Link>
          <Link to="/products?category=Custom%20Mugs" className="text-slate-400 hover:text-amber-400 transition">Custom Mugs</Link>
          <Link to="/products?category=Personalized%20Gifts" className="text-slate-400 hover:text-amber-400 transition">Personalized Gifts</Link>
          <Link to="/products?category=Photo%20Frames" className="text-slate-400 hover:text-amber-400 transition">Photo Frames</Link>
          <Link to="/products?category=Gift%20Hampers" className="text-slate-400 hover:text-amber-400 transition">Gift Hampers</Link>
          <Link to="/cart" className="text-slate-400 hover:text-amber-400 transition">My Cart</Link>
        </div>

        {/* Orders & Service */}
        <div className="flex flex-col gap-2.5">
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-1">Orders & Service</h3>
          <span className="text-slate-400">💵 Cash on Delivery Available</span>
          <span className="text-slate-400">💬 Direct WhatsApp Ordering</span>
          <span className="text-slate-400">🖨️ High-Definition Heat Press</span>
          <span className="text-slate-400">🚚 Krishnagiri & All India Shipping</span>
          <div className="flex items-center gap-1.5 text-slate-400 mt-2">
            <AccessTimeIcon sx={{ fontSize: 16, color: '#f59e0b' }} />
            <span>Mon - Sun: 9:00 AM - 10:00 PM</span>
          </div>
        </div>

        {/* Store Location & Contact */}
        <div className="flex flex-col gap-2.5">
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-1">Store Location</h3>
          
          <div className="flex items-start gap-2 text-slate-400">
            <LocationOnIcon sx={{ fontSize: 18, color: '#f59e0b' }} className="shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Custom Hub Gift Shop,<br />
              Sri Balaji Complex, New Pet,<br />
              Krishnagiri - 635001, Tamil Nadu
            </p>
          </div>

          <div className="flex items-center gap-2 text-slate-400 mt-1">
            <PhoneIcon sx={{ fontSize: 16, color: '#f59e0b' }} />
            <a href="tel:+917550079573" className="hover:text-amber-400 transition">+91 7550079573</a>
          </div>

          <a 
            href="https://maps.app.goo.gl/gjxPqjsHes6Zy7No9?g_st=ic" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold underline mt-1"
          >
            <span>📍 Open in Google Maps</span>
          </a>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-slate-800/80 bg-slate-950 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center text-slate-500 text-[11px]">
          <p>&copy; {new Date().getFullYear()} Custom Hub Sublimation Shop. All Rights Reserved.</p>
          <p className="text-slate-400">Crafted for personalized gifts & memories • Kaaviyaselvan</p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
