import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShopInfo } from '../../actions/shopAction';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import logo from '../../assets/images/logo.png';

const ShopInfo = ({ variant = "full" }) => {
    const dispatch = useDispatch();
    const { shop } = useSelector((state) => state.shopInfo);

    useEffect(() => {
        dispatch(getShopInfo());
    }, [dispatch]);

    if (!shop || !shop.owner) {
        return null;
    }

    // Mini variant for order details
    if (variant === "mini") {
        return (
            <div className="bg-gradient-to-r from-yellow-50 to-gray-100 p-4 rounded-lg border border-yellow-300">
                <div className="flex items-center gap-2 mb-3">
                    <img src={logo} alt="Custom Hub" className="w-7 h-7 rounded-full bg-white p-0.5 object-contain" />
                    <h4 className="font-bold text-sm text-gray-800">Shop Info</h4>
                </div>
                <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700">Shop:</span>
                        <span>{shop.shopDisplayName || shop.shopName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <EmailIcon sx={{ fontSize: "14px", color: "#4B5563" }} />
                        <a href={`mailto:${shop.owner.email}`} className="text-gray-700 hover:underline">
                            {shop.owner.email}
                        </a>
                    </div>
                    <div className="flex items-center gap-2">
                        <PhoneIcon sx={{ fontSize: "14px", color: "#4B5563" }} />
                        <a href={`tel:${shop.owner.phone}`} className="text-gray-700 hover:underline">
                            {shop.owner.phone}
                        </a>
                    </div>
                    <div className="flex items-center gap-2">
                        <LocationOnIcon sx={{ fontSize: "14px", color: "#4B5563" }} />
                        <span className="text-xs">
                            {shop.address?.city}, {shop.address?.state}
                        </span>
                        {shop.address?.mapUrl && (
                            <a href={shop.address.mapUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline text-xs ml-1">
                                (View Map)
                            </a>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Full variant for admin dashboard
    return (
        <div className="bg-gradient-to-br from-yellow-500 via-gray-700 to-gray-900 text-white rounded-xl shadow-lg p-6 sm:p-8">
            <div className="flex items-center gap-4 pb-6 mb-6 border-b border-gray-500/40">
                <img src={logo} alt="Custom Hub" className="w-16 h-16 rounded-full bg-white p-1 object-contain shadow-md border-2 border-yellow-400" />
                <div>
                    <h2 className="text-2xl font-black tracking-tight text-yellow-400">{shop.shopDisplayName || "CUSTOM HUB"}</h2>
                    <p className="text-sm text-gray-200 font-medium">Sublimation Shop • Mugs, T-Shirts, Gifts & More</p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                
                {/* Owner Info */}
                <div>
                    <h3 className="text-xl font-bold mb-4">👤 Shop Owner</h3>
                    <div className="space-y-3">
                        <div>
                            <p className="text-blue-100 text-sm">Name</p>
                            <p className="text-lg font-semibold">{shop.owner.name}</p>
                        </div>
                        <div>
                            <p className="text-blue-100 text-sm flex items-center gap-2">
                                <EmailIcon sx={{ fontSize: "16px" }} /> Email
                            </p>
                            <a href={`mailto:${shop.owner.email}`} className="text-blue-50 hover:text-white underline">
                                {shop.owner.email}
                            </a>
                        </div>
                        <div>
                            <p className="text-blue-100 text-sm flex items-center gap-2">
                                <PhoneIcon sx={{ fontSize: "16px" }} /> Phone
                            </p>
                            <a href={`tel:${shop.owner.phone}`} className="text-blue-50 hover:text-white underline">
                                {shop.owner.phone}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Support Info */}
                <div>
                    <h3 className="text-xl font-bold mb-4">💬 Support Contact</h3>
                    <div className="space-y-3">
                        <div>
                            <p className="text-blue-100 text-sm flex items-center gap-2">
                                <EmailIcon sx={{ fontSize: "16px" }} /> Support Email
                            </p>
                            <a href={`mailto:${shop.support.email}`} className="text-blue-50 hover:text-white underline">
                                {shop.support.email}
                            </a>
                        </div>
                        <div>
                            <p className="text-blue-100 text-sm flex items-center gap-2">
                                <PhoneIcon sx={{ fontSize: "16px" }} /> Support Phone
                            </p>
                            <a href={`tel:${shop.support.phone}`} className="text-blue-50 hover:text-white underline">
                                {shop.support.phone}
                            </a>
                        </div>
                        <div>
                            <p className="text-blue-100 text-sm">Hours</p>
                            <p className="text-blue-50">{shop.support.hours}</p>
                        </div>
                    </div>
                </div>

                {/* Address */}
                <div>
                    <h3 className="text-xl font-bold mb-4">📍 Shop Address</h3>
                    <div className="space-y-1 text-sm text-blue-50">
                        <p>{shop.address.street}</p>
                        <p>{shop.address.city}, {shop.address.state}</p>
                        <p>{shop.address.country} - {shop.address.pincode}</p>
                        {shop.address.mapUrl && (
                            <a href={shop.address.mapUrl} target="_blank" rel="noreferrer" className="inline-block mt-2 text-yellow-300 hover:text-white underline font-semibold">
                                📍 Open in Google Maps
                            </a>
                        )}
                    </div>
                </div>

                {/* Policies */}
                <div>
                    <h3 className="text-xl font-bold mb-4">📋 Shop Policies</h3>
                    <div className="space-y-2 text-sm text-blue-50">
                        <p>📅 Return Window: <span className="font-semibold">{shop.policies.returnWindow}</span></p>
                        <p>🚚 Shipping: <span className="font-semibold">{shop.policies.shippingTime}</span></p>
                        <p>✅ Warranty: <span className="font-semibold">{shop.policies.warranty}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopInfo;
