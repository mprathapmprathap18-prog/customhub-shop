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

  const { error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getSliderProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
  }, [dispatch, error, enqueueSnackbar]);

  return (
    <>
      <MetaData title="Custom Hub | Sublimation Mugs, T-Shirts, Photo Frames & Personalized Gifts" />
      <Categories />
      <main className="max-w-7xl mx-auto flex flex-col gap-4 px-3 sm:px-6 my-4">
        <Banner />
        <ProductSlider title={"Featured Custom Gifts"} tagline={"Personalize with your photos, names & memories"} />
        <DealSlider title={"Popular Sublimation & Gift Ideas"} />
        <ProductSlider title={"Custom Printed Mugs & Frames"} tagline={"Heat-press sublimation printing made to order"} />
        <DealSlider title={"Best Selling Hampers & Combos"} />
      </main>
    </>
  );
};

export default Home;
