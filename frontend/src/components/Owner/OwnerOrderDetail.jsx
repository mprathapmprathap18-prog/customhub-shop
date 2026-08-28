import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../../actions/orderAction';
import { updateOwnerOrder, clearErrors } from '../../actions/ownerAction';
import { useSnackbar } from 'notistack';
import MetaData from '../Layouts/MetaData';
import Loader from '../Layouts/Loader';
import ShopInfo from '../Common/ShopInfo';

const OwnerOrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { order, loading, error } = useSelector((state) => state.orderDetails);
    const { isUpdated, error: updateError } = useSelector((state) => state.ownerOrderUpdate);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (updateError) {
            enqueueSnackbar(updateError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("Order Updated Successfully", { variant: "success" });
            dispatch(getOrderDetails(id));
        }
        dispatch(getOrderDetails(id));
    }, [dispatch, id, error, updateError, isUpdated, enqueueSnackbar]);

    const handleStatusUpdate = (newStatus) => {
        dispatch(updateOwnerOrder(id, newStatus));
    };

    return (
        <>
            <MetaData title="Order Details | CustomHub Gift Shop" />

            {loading && <Loader />}

            {order && (
                <div className="space-y-6 p-4 sm:p-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">📦 Order Details</h1>
                        <button
                            onClick={() => navigate("/owner/orders")}
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                        >
                            ← Back to Orders
                        </button>
                    </div>

                    {/* Shop Info */}
                    <ShopInfo variant="mini" />

                    {/* Order Summary */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="font-bold text-lg mb-4">Order #: {order._id}</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Customer Info */}
                            <div>
                                <h3 className="font-semibold text-blue-600 mb-3">👤 Customer Information</h3>
                                <div className="space-y-2 text-sm">
                                    <p><span className="font-medium">Name:</span> {order.user?.name}</p>
                                    <p><span className="font-medium">Email:</span> {order.user?.email}</p>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div>
                                <h3 className="font-semibold text-blue-600 mb-3">📍 Shipping Address</h3>
                                <div className="space-y-1 text-sm">
                                    <p>{order.shippingInfo?.address}</p>
                                    <p>{order.shippingInfo?.city}, {order.shippingInfo?.state} - {order.shippingInfo?.pincode}</p>
                                    <p>{order.shippingInfo?.country}</p>
                                    <p><span className="font-medium">Phone:</span> {order.shippingInfo?.phoneNo}</p>
                                </div>
                            </div>
                        </div>

                        {/* Order Status */}
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <h3 className="font-semibold mb-3">📊 Order Status</h3>
                            <div className="flex items-center gap-4">
                                <select
                                    value={order.orderStatus}
                                    onChange={(e) => handleStatusUpdate(e.target.value)}
                                    className={`px-4 py-2 rounded font-medium text-white cursor-pointer ${
                                        order.orderStatus === "Delivered" ? "bg-green-600" :
                                        order.orderStatus === "Shipped" ? "bg-yellow-600" :
                                        "bg-purple-600"
                                    }`}
                                >
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                                <div className="text-sm text-gray-600">
                                    <p>Order placed: {new Date(order.createdAt).toLocaleDateString()}</p>
                                    {order.shippedAt && <p>Shipped: {new Date(order.shippedAt).toLocaleDateString()}</p>}
                                    {order.deliveredAt && <p>Delivered: {new Date(order.deliveredAt).toLocaleDateString()}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="font-bold text-lg mb-4">📦 Order Items</h3>
                        <div className="space-y-4">
                            {order.orderItems?.map((item) => (
                                <div key={item._id} className="flex gap-4 p-4 border rounded-lg hover:bg-gray-50">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h4 className="font-semibold">{item.name}</h4>
                                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                        <p className="text-sm text-gray-600">Price: ₹{item.price?.toLocaleString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-lg">₹{(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Total */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg p-6">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-xl">Order Total</h3>
                            <p className="text-3xl font-bold">₹{order.totalPrice?.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default OwnerOrderDetail;
