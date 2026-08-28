import { useEffect } from 'react';
import Categories from '../Layouts/Categories';
import Banner from './Banner/Banner';
import DealSlider from './DealSlider/DealSlider';
import ProductSlider from './ProductSlider/ProductSlider';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getSliderProducts } from '../../actions/productAction';
import { useSnackbar } from 'notistack';
import MetaData from '../Layouts/MetaData';

const Home = () => {

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { error, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    dispatch(getSliderProducts());
  }, [dispatch, error, enqueueSnackbar]);

  return (
    <>
      <MetaData title="CustomHub Gift Shop | Personalized Gifts, Hampers & More" />
      <Categories />
      <main className="flex flex-col gap-3 px-2 mt-16 sm:mt-2">
        <Banner />
        <DealSlider title={"Gift Ideas For Every Occasion"} />
        {!loading && <ProductSlider title={"Popular Gifts For You"} tagline={"Handpicked for birthdays & more"} />}
        <DealSlider title={"Best Selling Hampers"} />
        {!loading && <ProductSlider title={"Personalized Gifts"} tagline={"Add a name, photo or message"} />}
        <DealSlider title={"Birthday & Anniversary Picks"} />
        {!loading && <ProductSlider title={"Trending Now"} tagline={"What shoppers are gifting"} />}
      </main>
    </>
  );
};

export default Home;
