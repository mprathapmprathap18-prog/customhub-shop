const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const shopConfig = require('../config/shopConfig');

// Get Shop Information
exports.getShopInfo = asyncErrorHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        shop: shopConfig,
    });
});

module.exports = exports;
