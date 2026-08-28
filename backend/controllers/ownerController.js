const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');

// Get Owner Dashboard Stats
exports.getOwnerStats = asyncErrorHandler(async (req, res, next) => {
    
    const ownerId = req.user._id;

    // Get all orders (owner can see all orders)
    const totalOrders = await Order.countDocuments();
    const totalOrdersAmount = await Order.aggregate([
        { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    // Get products created by owner
    const totalProducts = await Product.countDocuments({ createdBy: ownerId });

    // Get total users in system
    const totalUsers = await User.countDocuments({ role: "user" });

    // Get order status breakdown
    const orderStatusBreakdown = await Order.aggregate([
        { $group: { _id: "$orderStatus", count: { $sum: 1 } } }
    ]);

    // Get recent orders (last 10)
    const recentOrders = await Order.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .populate("user", "name email");

    res.status(200).json({
        success: true,
        stats: {
            totalOrders,
            totalOrdersAmount: totalOrdersAmount[0]?.total || 0,
            totalProducts,
            totalUsers,
            orderStatusBreakdown,
        },
        recentOrders,
    });
});

// Get All Orders for Owner
exports.getOwnerOrders = asyncErrorHandler(async (req, res, next) => {
    
    const orders = await Order.find()
        .sort({ createdAt: -1 })
        .populate("user", "name email");

    if (!orders) {
        return next(new ErrorHandler("Orders Not Found", 404));
    }

    res.status(200).json({
        success: true,
        orders,
    });
});

// Get Owner Products
exports.getOwnerProducts = asyncErrorHandler(async (req, res, next) => {
    
    const ownerId = req.user._id;
    const products = await Product.find({ createdBy: ownerId });

    if (!products) {
        return next(new ErrorHandler("Products Not Found", 404));
    }

    res.status(200).json({
        success: true,
        products,
    });
});

// Get Owner Info
exports.getOwnerProfile = asyncErrorHandler(async (req, res, next) => {
    
    const ownerId = req.user._id;
    const owner = await User.findById(ownerId);

    if (!owner) {
        return next(new ErrorHandler("Owner Not Found", 404));
    }

    res.status(200).json({
        success: true,
        owner,
    });
});

// Update Owner Info
exports.updateOwnerProfile = asyncErrorHandler(async (req, res, next) => {
    
    const ownerId = req.user._id;
    const { name, email } = req.body;

    const owner = await User.findByIdAndUpdate(
        ownerId,
        { name, email },
        { new: true, runValidators: true }
    );

    res.status(200).json({
        success: true,
        owner,
    });
});

// Get Order Details for Owner
exports.getOwnerOrderDetails = asyncErrorHandler(async (req, res, next) => {
    
    const order = await Order.findById(req.params.id)
        .populate("user", "name email")
        .populate("orderItems.product");

    if (!order) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
});

// Update Order Status (Owner can update)
exports.updateOwnerOrder = asyncErrorHandler(async (req, res, next) => {
    
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("Order Already Delivered", 400));
    }

    if (req.body.status === "Shipped") {
        order.shippedAt = Date.now();
    }

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    order.orderStatus = req.body.status;
    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Order Updated Successfully",
    });
});

// Get Customer List (for owner reference)
exports.getOwnerCustomers = asyncErrorHandler(async (req, res, next) => {
    
    const customers = await User.find({ role: "user" });

    res.status(200).json({
        success: true,
        customers,
    });
});

module.exports = exports;
