import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Banner.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const PreviousBtn = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIosIcon />
    </div>
  )
}

export const NextBtn = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIosIcon />
    </div>
  )
}

const Banner = () => {

  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
  };

  const banners = [
    {
      title: "CUSTOMHUB GIFT SHOP",
      subtitle: "Custom gifts, hampers & surprise boxes",
      bg: "bg-gradient-to-r from-yellow-400 to-gray-200",
    },
    {
      title: "Personalized Gifts",
      subtitle: "Names, photos & messages on mugs, frames & more",
      bg: "bg-gradient-to-r from-gray-200 to-yellow-300",
    },
    {
      title: "Same-Day Flower & Hamper Delivery",
      subtitle: "Make birthdays and anniversaries unforgettable",
      bg: "bg-gradient-to-r from-yellow-200 to-gray-300",
    },
  ];

  return (
    <>
      <section className="h-44 sm:h-72 w-full rounded-sm shadow relative overflow-hidden">
        <Slider {...settings}>
          {banners.map((el, i) => (
            <div key={i}>
              <div className={`h-44 sm:h-72 w-full flex flex-col items-center justify-center ${el.bg}`}>
                <h2 className="text-2xl sm:text-4xl font-black text-gray-800 tracking-wide">{el.title}</h2>
                <p className="mt-2 text-sm sm:text-lg text-gray-700">{el.subtitle}</p>
              </div>
            </div>
          ))}
        </Slider>
      </section>
    </>
  );
};

export default Banner;
