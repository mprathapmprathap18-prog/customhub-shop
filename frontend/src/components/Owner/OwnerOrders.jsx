import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOwnerOrders, updateOwnerOrder, clearErrors } from '../../actions/ownerAction';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import Loader from '../Layouts/Loader';

const OwnerOrders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { orders, error, loading } = useSelector((state) => state.ownerOrders);
    const { isUpdated, error: updateError } = useSelector((state) => state.ownerOrderUpdate);

    const [filterStatus, setFilterStatus] = useState("All");

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
            dispatch(getOwnerOrders());
        }
        dispatch(getOwnerOrders());
    }, [dispatch, error, updateError, isUpdated, enqueueSnackbar]);

    const handleStatusUpdate = (orderId, newStatus) => {
        dispatch(updateOwnerOrder(orderId, newStatus));
    };

    const filteredOrders = filterStatus === "All" 
        ? orders 
        : orders?.filter((order) => order.orderStatus === filterStatus);

    return (
        <>
            <MetaData title="Owner Orders | CustomHub Gift Shop" />

            {loading && <Loader />}

            <div className="space-y-6 p-4 sm:p-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">📦 All Customer Orders</h1>
                </div>

                {/* Filter */}
                <div className="flex gap-2 flex-wrap">
                    {["All", "Processing", "Shipped", "Delivered"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-lg font-medium transition ${
                                filterStatus === status
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                            }`}
                        >
                            {status} ({filterStatus === status ? filteredOrders?.length || 0 : orders?.filter((o) => status === "All" || o.orderStatus === status).length || 0})
                        </button>
                    ))}
                </div>

                {/* Orders Table */}
                {filteredOrders && filteredOrders.length > 0 ? (
                    <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-100 border-b">
                                    <th className="text-left p-4 font-bold">Order ID</th>
                                    <th className="text-left p-4 font-bold">Customer</th>
                                    <th className="text-left p-4 font-bold">Email</th>
                                    <th className="text-left p-4 font-bold">Amount</th>
                                    <th className="text-left p-4 font-bold">Items</th>
                                    <th className="text-left p-4 font-bold">Status</th>
                                    <th className="text-left p-4 font-bold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map((order) => (
                                    <tr key={order._id} className="border-b hover:bg-gray-50">
                                        <td className="p-4">
                                            <button
                                                onClick={() => navigate(`/owner/order/${order._id}`)}
                                                className="text-blue-600 font-semibold hover:underline cursor-pointer"
                                            >
                                                {order._id.substring(0, 12)}...
                                            </button>
                                        </td>
                                        <td className="p-4 font-medium">{order.user?.name}</td>
                                        <td className="p-4">{order.user?.email}</td>
                                        <td className="p-4 font-bold">₹{order.totalPrice?.toLocaleString()}</td>
                                        <td className="p-4">{order.orderItems?.length}</td>
                                        <td className="p-4">
                                            <select
                                                value={order.orderStatus}
                                                onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                                className={`px-3 py-1 rounded font-medium text-white cursor-pointer ${
                                                    order.orderStatus === "Delivered" ? "bg-green-600" :
                                                    order.orderStatus === "Shipped" ? "bg-yellow-600" :
                                                    "bg-purple-600"
                                                }`}
                                            >
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                            </select>
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => navigate(`/owner/order/${order._id}`)}
                                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                        <p className="text-gray-600 text-lg">No orders found</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default OwnerOrders;
