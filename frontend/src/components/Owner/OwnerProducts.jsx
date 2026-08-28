import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOwnerProducts, clearErrors } from '../../actions/ownerAction';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import Loader from '../Layouts/Loader';

const OwnerProducts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { products, error, loading } = useSelector((state) => state.ownerProducts);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        dispatch(getOwnerProducts());
    }, [dispatch, error, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Owner Products | CustomHub Gift Shop" />

            {loading && <Loader />}

            <div className="space-y-6 p-4 sm:p-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">🛍️ My Products</h1>
                    <button
                        onClick={() => navigate("/admin/new_product")}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                        + Add New Product
                    </button>
                </div>

                {/* Products Grid */}
                {products && products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div key={product._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                                <img
                                    src={product.images?.[0]?.url || "https://via.placeholder.com/300"}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                                    
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-xl font-bold text-blue-600">₹{product.price?.toLocaleString()}</span>
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                            product.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                        }`}>
                                            Stock: {product.stock}
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => navigate(`/admin/product/${product._id}`)}
                                            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => navigate(`/product/${product._id}`)}
                                            className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
                                        >
                                            View
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                        <p className="text-gray-600 text-lg mb-4">No products yet</p>
                        <button
                            onClick={() => navigate("/admin/new_product")}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                        >
                            Create First Product
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default OwnerProducts;
