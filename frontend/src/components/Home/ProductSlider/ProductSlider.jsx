import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { getRandomProducts } from '../../../utils/functions';
import { settings } from '../DealSlider/DealSlider';
import Product from './Product';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ProductSlider = ({ title, tagline }) => {

    const { loading, products } = useSelector((state) => state.products);

    return (
        <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5 my-1 overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center pb-3 mb-2 border-b border-slate-100">
                <div className="flex flex-col">
                    <h2 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight">{title}</h2>
                    {tagline && <p className="text-xs sm:text-sm text-slate-500 font-medium">{tagline}</p>}
                </div>
                <Link 
                    to="/products" 
                    className="flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-full transition duration-150"
                >
                    <span>View All</span>
                    <ArrowForwardIcon sx={{ fontSize: 14 }} />
                </Link>
            </div>

            {/* Product Slider */}
            {loading ? null : (
                <div className="pt-2 -mx-1.5">
                    <Slider {...settings} className="custom-product-slider">
                        {products && getRandomProducts(products, 12).map((product) => (
                            <Product {...product} key={product._id} />
                        ))}
                    </Slider>
                </div>
            )}
        </section>
    );
};

export default ProductSlider;
