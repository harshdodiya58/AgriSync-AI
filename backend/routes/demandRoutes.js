const express = require('express');
const router = express.Router();
const { getDemandForecast } = require('../controllers/demandController');
const { protect } = require('../middleware/auth');

router.get('/forecast', protect, getDemandForecast);

module.exports = router;
