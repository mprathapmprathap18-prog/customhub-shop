import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import PriceSidebar from './PriceSidebar';
import SaveForLaterItem from './SaveForLaterItem';

const Cart = () => {

    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { saveForLaterItems } = useSelector((state) => state.saveForLater);

    const placeOrderHandler = () => {
        navigate('/login?redirect=shipping');
    }

    return (
        <>
            <MetaData title="Shopping Cart | CustomHub Gift Shop" />
            <main className="w-full mt-20">

                {/* <!-- row --> */}
                <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">

                    {/* <!-- cart column --> */}
                    <div className="flex-1">

                        {/* <!-- cart items container --> */}
                        <div className="flex flex-col shadow bg-white">
                            <span className="font-medium text-lg px-2 sm:px-8 py-4 border-b">My Cart ({cartItems.length})</span>

                            {cartItems && cartItems.length === 0 && (
                                <EmptyCart />
                            )}

                            {cartItems && cartItems.map((item) => (
                                <CartItem {...item} inCart={true} />
                            )
                            )}

                            {/* <!-- place order btn --> */}
                            <div className="flex justify-end p-3">
                                <button 
                                    onClick={placeOrderHandler} 
                                    disabled={cartItems.length < 1} 
                                    className={`${
                                        cartItems.length < 1 
                                            ? "bg-slate-300 cursor-not-allowed text-slate-500" 
                                            : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md hover:shadow-xl active:scale-95"
                                    } w-full sm:w-1/3 mx-2 sm:mx-6 my-2 py-3 font-bold uppercase tracking-wider text-sm rounded-xl transition-all duration-200`}
                                >
                                    PLACE ORDER
                                </button>
                            </div>
                            {/* <!-- place order btn --> */}

                        </div>
                        {/* <!-- cart items container --> */}

                        {/* <!-- saved for later items container --> */}
                        <div className="flex flex-col mt-5 shadow bg-white">
                            <span className="font-medium text-lg px-2 sm:px-8 py-4 border-b">Saved For Later ({saveForLaterItems.length})</span>
                            {saveForLaterItems && saveForLaterItems.map((item) => (
                                <SaveForLaterItem {...item} />
                            )
                            )}
                        </div>
                        {/* <!-- saved for later container --> */}

                    </div>
                    {/* <!-- cart column --> */}

                    <PriceSidebar cartItems={cartItems} />

                </div>
                {/* <!-- row --> */}

            </main>
        </>
    );
};

export default Cart;
