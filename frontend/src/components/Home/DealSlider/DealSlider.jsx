import { useMemo } from 'react';
import Product from './Product';
import Slider from 'react-slick';
import { NextBtn, PreviousBtn } from '../Banner/Banner';
import { Link } from 'react-router-dom';
import { offerProducts } from '../../../utils/constants';
import { getRandomProducts } from '../../../utils/functions';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    swipe: false,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
    responsive: [
        {
            breakpoint: 1280,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }
    ]
};

const DealSlider = ({ title }) => {
    const productsList = useMemo(() => getRandomProducts(offerProducts, 12), []);

    return (
        <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 my-1 overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center pb-3 mb-2 border-b border-slate-100">
                <h2 className="text-base sm:text-xl font-black text-slate-900 tracking-tight">{title}</h2>
                <Link 
                    to="/products" 
                    className="flex items-center gap-1 text-xs font-bold text-sky-700 hover:text-sky-800 bg-sky-50 hover:bg-sky-100 px-3.5 py-1.5 rounded-full border border-sky-200 transition duration-150"
                >
                    <span>View All</span>
                    <ArrowForwardIcon sx={{ fontSize: 14 }} />
                </Link>
            </div>

            {/* Slider */}
            {productsList.length > 0 && (
                <div className="pt-2 -mx-1.5">
                    <Slider {...settings}>
                        {productsList.map((item, i) => (
                            <Product {...item} key={i} />
                        ))}
                    </Slider>
                </div>
            )}
        </section>
    );
};

export default DealSlider;
