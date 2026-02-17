const express = require('express');
const router = express.Router();
const { getAllUsers, updateUserRole, deleteUser, getSystemStats } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

// All routes are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

// User management routes
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

// Statistics route
router.get('/stats', getSystemStats);

module.exports = router;
