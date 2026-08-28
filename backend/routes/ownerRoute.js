const express = require('express');
const {
    getOwnerStats,
    getOwnerOrders,
    getOwnerProducts,
    getOwnerProfile,
    updateOwnerProfile,
    getOwnerOrderDetails,
    updateOwnerOrder,
    getOwnerCustomers,
} = require('../controllers/ownerController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

// Owner Dashboard Routes - Only accessible by owner role
router.route('/owner/stats').get(isAuthenticatedUser, authorizeRoles("owner"), getOwnerStats);
router.route('/owner/orders').get(isAuthenticatedUser, authorizeRoles("owner"), getOwnerOrders);
router.route('/owner/products').get(isAuthenticatedUser, authorizeRoles("owner"), getOwnerProducts);
router.route('/owner/customers').get(isAuthenticatedUser, authorizeRoles("owner"), getOwnerCustomers);

router.route('/owner/profile').get(isAuthenticatedUser, authorizeRoles("owner"), getOwnerProfile);
router.route('/owner/profile/update').put(isAuthenticatedUser, authorizeRoles("owner"), updateOwnerProfile);

router.route('/owner/order/:id')
    .get(isAuthenticatedUser, authorizeRoles("owner"), getOwnerOrderDetails)
    .put(isAuthenticatedUser, authorizeRoles("owner"), updateOwnerOrder);

module.exports = router;
