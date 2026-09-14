import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Banner.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PrintIcon from '@mui/icons-material/Print';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentsIcon from '@mui/icons-material/Payments';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Link } from 'react-router-dom';

export const PreviousBtn = ({ className, onClick }) => {
  return (
    <button 
      className={`${className} !w-9 !h-9 !bg-white/80 hover:!bg-white !rounded-full !shadow-lg !flex !items-center !justify-center !text-slate-700 !z-10 !left-3 backdrop-blur-xs transition`} 
      onClick={onClick}
      aria-label="Previous Slide"
    >
      <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
    </button>
  );
};

export const NextBtn = ({ className, onClick }) => {
  return (
    <button 
      className={`${className} !w-9 !h-9 !bg-white/80 hover:!bg-white !rounded-full !shadow-lg !flex !items-center !justify-center !text-slate-700 !z-10 !right-3 backdrop-blur-xs transition`} 
      onClick={onClick}
      aria-label="Next Slide"
    >
      <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
    </button>
  );
};

const Banner = () => {

  const settings = {
    autoplay: true,
    autoplaySpeed: 4000,
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
  };

  const banners = [
    {
      badge: "⭐ CUSTOM SUBLIMATION PRINTING",
      title: "Print Your Photos & Names on Mugs & T-Shirts",
      subtitle: "High-definition sublimation heat-press for lasting memories.",
      ctaText: "Shop Custom Mugs",
      ctaLink: "/products?category=Custom%20Mugs",
      bgGradient: "from-amber-500 via-orange-500 to-rose-500",
      accentEmoji: "☕✨",
    },
    {
      badge: "🎁 PERSONALIZED GIFT HAMPERS",
      title: "Surprise Your Loved Ones on Special Days",
      subtitle: "Custom photo frames, chocolates, hampers & surprise boxes.",
      ctaText: "Explore Gift Hampers",
      ctaLink: "/products?category=Gift%20Hampers",
      bgGradient: "from-indigo-600 via-purple-600 to-pink-500",
      accentEmoji: "🎁🎉",
    },
    {
      badge: "🚚 KRISHNAGIRI & ALL-INDIA SHIPPING",
      title: "Instant WhatsApp Ordering & Cash on Delivery",
      subtitle: "Order directly in seconds with Kaaviyaselvan (+91 7550079573).",
      ctaText: "Order on WhatsApp",
      ctaLink: "https://api.whatsapp.com/send?phone=917550079573&text=Hi%20Kaaviyaselvan,%20I%20want%20to%20place%20a%20custom%20gift%20order!",
      isExternal: true,
      bgGradient: "from-emerald-600 via-teal-600 to-cyan-600",
      accentEmoji: "💬💵",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Main Hero Slider */}
      <section className="w-full rounded-2xl shadow-sm relative overflow-hidden">
        <Slider {...settings}>
          {banners.map((el, i) => (
            <div key={i}>
              <div className={`h-52 sm:h-80 w-full bg-gradient-to-r ${el.bgGradient} p-6 sm:p-12 flex flex-col justify-center items-start text-white relative overflow-hidden`}>
                
                {/* Background decorative swirl */}
                <div className="absolute right-4 sm:right-16 text-6xl sm:text-9xl opacity-20 select-none pointer-events-none">
                  {el.accentEmoji}
                </div>

                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3">
                  {el.badge}
                </span>

                <h2 className="text-xl sm:text-4xl font-extrabold tracking-tight max-w-2xl leading-tight">
                  {el.title}
                </h2>

                <p className="mt-1 sm:mt-2 text-xs sm:text-base text-white/90 max-w-xl">
                  {el.subtitle}
                </p>

                <div className="mt-4 sm:mt-6 flex items-center gap-3">
                  {el.isExternal ? (
                    <a
                      href={el.ctaLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2 sm:px-6 sm:py-2.5 bg-white text-emerald-700 font-bold text-xs sm:text-sm rounded-xl shadow-md hover:bg-emerald-50 hover:shadow-lg transition flex items-center gap-2"
                    >
                      <WhatsAppIcon sx={{ fontSize: 18 }} />
                      <span>{el.ctaText}</span>
                    </a>
                  ) : (
                    <Link
                      to={el.ctaLink}
                      className="px-5 py-2 sm:px-6 sm:py-2.5 bg-white text-slate-900 font-bold text-xs sm:text-sm rounded-xl shadow-md hover:bg-slate-50 hover:shadow-lg transition flex items-center gap-2"
                    >
                      <span>{el.ctaText}</span>
                      <span>→</span>
                    </Link>
                  )}
                </div>

              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Trust & Value Proposition Bar */}
      <section className="bg-white rounded-xl border border-slate-200/80 p-3 sm:p-4 shadow-xs grid grid-cols-2 md:grid-cols-4 gap-3 text-slate-700">
        <div className="flex items-center gap-2.5 p-2">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <PrintIcon sx={{ fontSize: 22 }} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold text-slate-900">HD Sublimation</span>
            <span className="text-[11px] text-slate-500">Long-lasting vibrant prints</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <WhatsAppIcon sx={{ fontSize: 22 }} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold text-slate-900">WhatsApp Order</span>
            <span className="text-[11px] text-slate-500">Send custom photos directly</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <PaymentsIcon sx={{ fontSize: 22 }} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold text-slate-900">Cash on Delivery</span>
            <span className="text-[11px] text-slate-500">Pay at your doorstep</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
            <LocalShippingIcon sx={{ fontSize: 22 }} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold text-slate-900">Fast Shipping</span>
            <span className="text-[11px] text-slate-500">Direct from Krishnagiri</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
