import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOwnerStats, getOwnerOrders, getOwnerProducts, getOwnerCustomers, clearErrors } from '../../actions/ownerAction';
import { useSnackbar } from 'notistack';
import MetaData from '../Layouts/MetaData';
import Loader from '../Layouts/Loader';
import ShopInfo from '../Common/ShopInfo';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const OwnerDashboard = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { stats, recentOrders, error, loading } = useSelector((state) => state.ownerStats);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        dispatch(getOwnerStats());
        dispatch(getOwnerOrders());
        dispatch(getOwnerProducts());
        dispatch(getOwnerCustomers());
    }, [dispatch, error, enqueueSnackbar]);

    const pieData = stats?.orderStatusBreakdown?.map((item) => ({
        name: item._id,
        value: item.count,
    })) || [];

    const COLORS = ['#9333ea', '#facc15', '#4ade80'];

    return (
        <>
            <MetaData title="Owner Dashboard | CustomHub Gift Shop" />

            {loading && <Loader />}

            <div className="space-y-6 p-4 sm:p-8">
                {/* Shop Info */}
                <ShopInfo variant="full" />

                {/* Stats Cards */}
                {stats && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-6">
                        <div className="flex flex-col bg-blue-600 text-white gap-2 rounded-xl shadow-lg hover:shadow-xl p-6">
                            <h4 className="text-gray-100 font-medium">Total Sales</h4>
                            <h2 className="text-2xl font-bold">₹{stats.totalOrdersAmount?.toLocaleString()}</h2>
                        </div>
                        <div className="flex flex-col bg-red-500 text-white gap-2 rounded-xl shadow-lg hover:shadow-xl p-6">
                            <h4 className="text-gray-100 font-medium">Total Orders</h4>
                            <h2 className="text-2xl font-bold">{stats.totalOrders}</h2>
                        </div>
                        <div className="flex flex-col bg-yellow-500 text-white gap-2 rounded-xl shadow-lg hover:shadow-xl p-6">
                            <h4 className="text-gray-100 font-medium">Products</h4>
                            <h2 className="text-2xl font-bold">{stats.totalProducts}</h2>
                        </div>
                        <div className="flex flex-col bg-green-500 text-white gap-2 rounded-xl shadow-lg hover:shadow-xl p-6">
                            <h4 className="text-gray-100 font-medium">Total Customers</h4>
                            <h2 className="text-2xl font-bold">{stats.totalUsers}</h2>
                        </div>
                    </div>
                )}

                {/* Order Status Pie Chart */}
                {pieData.length > 0 && (
                    <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                        <span className="font-medium uppercase text-gray-800 block mb-4">Order Status Breakdown</span>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, value }) => `${name}: ${value}`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {/* Recent Orders */}
                {recentOrders && recentOrders.length > 0 && (
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="font-bold text-lg mb-4">📦 Recent Orders</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left p-2">Order ID</th>
                                        <th className="text-left p-2">Customer</th>
                                        <th className="text-left p-2">Amount</th>
                                        <th className="text-left p-2">Status</th>
                                        <th className="text-left p-2">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrders.map((order) => (
                                        <tr key={order._id} className="border-b hover:bg-gray-50">
                                            <td className="p-2 text-blue-600 font-medium">{order._id.substring(0, 8)}</td>
                                            <td className="p-2">{order.user?.name}</td>
                                            <td className="p-2 font-bold">₹{order.totalPrice?.toLocaleString()}</td>
                                            <td className="p-2">
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                                    order.orderStatus === "Delivered" ? "bg-green-100 text-green-800" :
                                                    order.orderStatus === "Shipped" ? "bg-yellow-100 text-yellow-800" :
                                                    "bg-purple-100 text-purple-800"
                                                }`}>
                                                    {order.orderStatus}
                                                </span>
                                            </td>
                                            <td className="p-2 text-xs">{new Date(order.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default OwnerDashboard;
