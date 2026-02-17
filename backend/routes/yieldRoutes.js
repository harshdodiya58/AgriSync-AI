const express = require('express');
const router = express.Router();
const { predictYield, getYieldHistory } = require('../controllers/yieldController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.post('/predict', protect, predictYield);
router.get('/history', protect, getYieldHistory);

module.exports = router;
