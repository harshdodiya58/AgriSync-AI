const express = require('express');
const router = express.Router();
const { getAlerts, getDashboardStats } = require('../controllers/alertController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getAlerts);
router.get('/stats', protect, getDashboardStats);

module.exports = router;
