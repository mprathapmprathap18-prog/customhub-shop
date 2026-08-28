import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
import { newOrder, clearErrors } from '../../actions/orderAction';
import { emptyCart } from '../../actions/cartAction';
import { useSnackbar } from 'notistack';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import MetaData from '../Layouts/MetaData';

const WHATSAPP_NUMBER = "917550079573";

const Payment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [paymentMethod, setPaymentMethod] = useState("whatsapp");
    const [submitting, setSubmitting] = useState(false);

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const buildWhatsAppMessage = () => {
        let text = `👋 *NEW ORDER - Custom Hub Sublimation Shop*\n\n`;
        text += `👤 *Customer Name:* ${user.name}\n`;
        text += `📧 *Email:* ${user.email}\n`;
        text += `📞 *Phone:* ${shippingInfo.phoneNo}\n\n`;
        text += `📍 *Delivery Address:*\n${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} - ${shippingInfo.pincode}\n\n`;
        text += `🛍️ *Order Items:*\n`;
        cartItems.forEach((item, idx) => {
            text += `${idx + 1}. *${item.name}* (Qty: ${item.quantity}) - ₹${(item.price * item.quantity).toLocaleString()}\n`;
        });
        text += `\n💰 *Total Amount:* ₹${totalPrice.toLocaleString()}\n`;
        text += `💳 *Selected Method:* ${paymentMethod === 'whatsapp' ? 'WhatsApp Order / Direct Verification' : 'Cash on Delivery (COD)'}\n\n`;
        text += `_Please confirm my order and sublimation printing details. Thank you!_`;
        return encodeURIComponent(text);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            enqueueSnackbar("Your cart is empty!", { variant: "warning" });
            navigate("/cart");
            return;
        }

        setSubmitting(true);

        const orderData = {
            shippingInfo,
            orderItems: cartItems.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
                product: item.product,
            })),
            paymentInfo: {
                id: `${paymentMethod === 'whatsapp' ? 'WA' : 'COD'}_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
                status: paymentMethod === 'whatsapp' ? 'WhatsApp Order' : 'Cash on Delivery',
            },
            totalPrice,
        };

        try {
            await dispatch(newOrder(orderData));
            dispatch(emptyCart());

            if (paymentMethod === "whatsapp") {
                const waUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${buildWhatsAppMessage()}`;
                window.open(waUrl, "_blank");
                enqueueSnackbar("Order placed! Opening WhatsApp to connect with Kaaviyaselvan...", { variant: "success" });
            } else {
                enqueueSnackbar("Cash on Delivery Order Placed Successfully!", { variant: "success" });
            }

            navigate("/order/success");
        } catch (err) {
            setSubmitting(false);
            enqueueSnackbar(err.message || "Failed to place order", { variant: "error" });
        }
    };

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
            enqueueSnackbar(error, { variant: "error" });
            setSubmitting(false);
        }
    }, [dispatch, error, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Custom Hub: Order Method & Cash on Delivery" />

            <main className="w-full mt-20">
                <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">
                    <div className="flex-1">
                        <Stepper activeStep={3}>
                            <div className="w-full bg-white p-4 sm:p-8 rounded-b-sm">
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Select Your Order & Payment Option</h3>
                                <p className="text-xs text-gray-500 mb-6">No online payment gateway needed. Place your order directly via WhatsApp or choose Cash on Delivery.</p>

                                <form onSubmit={submitHandler} className="flex flex-col gap-4">
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="order-method-group"
                                            value={paymentMethod}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            name="order-method-radio"
                                            className="space-y-4"
                                        >
                                            {/* Option 1: WhatsApp Order */}
                                            <div className={`border-2 rounded-lg p-4 cursor-pointer transition ${paymentMethod === 'whatsapp' ? 'border-green-500 bg-green-50/50' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => setPaymentMethod('whatsapp')}>
                                                <FormControlLabel
                                                    value="whatsapp"
                                                    control={<Radio color="success" />}
                                                    label={
                                                        <div className="flex items-center gap-3">
                                                            <div className="bg-green-500 text-white p-2 rounded-full flex items-center justify-center">
                                                                <WhatsAppIcon sx={{ fontSize: 24 }} />
                                                            </div>
                                                            <div>
                                                                <span className="font-bold text-gray-800 block text-base sm:text-lg">Order via WhatsApp (Recommended)</span>
                                                                <span className="text-xs text-gray-600">Send order details & custom photos/names directly to Kaaviyaselvan (+91 7550079573)</span>
                                                            </div>
                                                        </div>
                                                    }
                                                />
                                            </div>

                                            {/* Option 2: Cash on Delivery */}
                                            <div className={`border-2 rounded-lg p-4 cursor-pointer transition ${paymentMethod === 'cod' ? 'border-yellow-500 bg-yellow-50/50' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => setPaymentMethod('cod')}>
                                                <FormControlLabel
                                                    value="cod"
                                                    control={<Radio color="warning" />}
                                                    label={
                                                        <div className="flex items-center gap-3">
                                                            <div className="bg-yellow-500 text-white p-2 rounded-full flex items-center justify-center">
                                                                <LocalAtmIcon sx={{ fontSize: 24 }} />
                                                            </div>
                                                            <div>
                                                                <span className="font-bold text-gray-800 block text-base sm:text-lg">Cash on Delivery (COD)</span>
                                                                <span className="text-xs text-gray-600">Pay in cash or UPI upon delivery to your doorstep in Krishnagiri and all over India</span>
                                                            </div>
                                                        </div>
                                                    }
                                                />
                                            </div>
                                        </RadioGroup>
                                    </FormControl>

                                    {/* Action Buttons */}
                                    <div className="pt-4 border-t mt-4 flex flex-col sm:flex-row gap-3 items-center">
                                        {paymentMethod === 'whatsapp' ? (
                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-8 rounded shadow-lg flex items-center justify-center gap-2 uppercase tracking-wide transition cursor-pointer"
                                            >
                                                <WhatsAppIcon />
                                                {submitting ? "Placing Order..." : `Place Order on WhatsApp (₹${totalPrice.toLocaleString()})`}
                                            </button>
                                        ) : (
                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className="w-full sm:w-auto bg-primary-orange hover:bg-orange-600 text-white font-bold py-3.5 px-8 rounded shadow-lg flex items-center justify-center gap-2 uppercase tracking-wide transition cursor-pointer"
                                            >
                                                <LocalAtmIcon />
                                                {submitting ? "Placing Order..." : `Confirm Cash on Delivery (₹${totalPrice.toLocaleString()})`}
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </Stepper>
                    </div>

                    <PriceSidebar cartItems={cartItems} />
                </div>
            </main>
        </>
    );
};

export default Payment;