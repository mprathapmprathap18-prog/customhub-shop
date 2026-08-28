import { Link } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import successfull from '../../assets/images/Transaction/success.png';
import failed from '../../assets/images/Transaction/failed.png';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HomeIcon from '@mui/icons-material/Home';

const OrderSuccess = ({ success = true }) => {
    return (
        <>
            <MetaData title={`Order ${success ? "Placed Successfully" : "Failed"}`} />

            <main className="w-full mt-20">
                <div className="flex flex-col gap-4 items-center justify-center sm:w-3/5 sm:mt-6 m-auto mb-10 bg-white shadow-lg rounded-xl p-6 sm:p-10 border border-gray-100">
                    <img draggable="false" className="w-48 h-48 object-contain" src={success ? successfull : failed} alt="Transaction Status" />
                    
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-800 text-center">
                        {success ? "🎉 Order Placed Successfully!" : "Order Placement Failed"}
                    </h1>
                    
                    {success ? (
                        <div className="text-center max-w-lg space-y-2">
                            <p className="text-sm text-gray-600">
                                Thank you for shopping with <strong className="text-gray-900">Custom Hub Sublimation Shop</strong>. Your order has been registered in our system.
                            </p>
                            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 text-xs text-gray-800">
                                💵 <strong>Payment Mode:</strong> Cash on Delivery (COD) / Direct WhatsApp Verification
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-600 text-center">There was an issue processing your request. Please try again.</p>
                    )}

                    {success && (
                        <a
                            href="https://api.whatsapp.com/send?phone=917550079573&text=Hi%20Kaaviyaselvan,%20I%20just%20placed%20an%20order%20on%20Custom%20Hub!%20Please%20confirm%20my%20sublimation%20customization%20details."
                            target="_blank"
                            rel="noreferrer"
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg flex items-center gap-2 transition"
                        >
                            <WhatsAppIcon />
                            <span>Connect on WhatsApp with Kaaviyaselvan</span>
                        </a>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full sm:w-auto">
                        <Link to="/orders" className="bg-primary-blue hover:bg-blue-700 py-2.5 px-6 text-white font-medium uppercase text-xs rounded shadow flex items-center justify-center gap-1.5 transition">
                            <ShoppingBagIcon sx={{ fontSize: 16 }} /> View My Orders
                        </Link>
                        <Link to="/products" className="bg-gray-700 hover:bg-gray-800 py-2.5 px-6 text-white font-medium uppercase text-xs rounded shadow flex items-center justify-center gap-1.5 transition">
                            <HomeIcon sx={{ fontSize: 16 }} /> Continue Shopping
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
};

export default OrderSuccess;
