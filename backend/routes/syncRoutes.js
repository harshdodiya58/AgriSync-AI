const express = require('express');
const router = express.Router();
const { compareSyncData, getSyncHistory } = require('../controllers/syncController');
const { protect } = require('../middleware/auth');

router.post('/compare', protect, compareSyncData);
router.get('/history', protect, getSyncHistory);

module.exports = router;
