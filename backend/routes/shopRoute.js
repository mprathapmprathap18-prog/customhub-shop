const express = require('express');
const { getShopInfo } = require('../controllers/shopController');

const router = express.Router();

// Public route - anyone can view shop info
router.route('/shop/info').get(getShopInfo);

module.exports = router;
