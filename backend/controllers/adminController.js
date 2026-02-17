const User = require('../models/User');
const YieldData = require('../models/YieldData');
const DemandData = require('../models/DemandData');
const Synchronization = require('../models/Synchronization');

// @desc    Get all users (Admin only)
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
    try {
        const { search, role, page = 1, limit = 10 } = req.query;

        // Build query
        let query = {};
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }
        if (role && role !== 'all') {
            query.role = role;
        }

        // Execute query with pagination
        const users = await User.find(query)
            .select('-password')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await User.countDocuments(query);

        res.status(200).json({
            success: true,
            data: users,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            total: count
        });
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Update user role (Admin only)
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
exports.updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        const userId = req.params.id;

        // Validate role
        if (!['farmer', 'processor', 'admin'].includes(role)) {
            return res.status(400).json({ success: false, message: 'Invalid role' });
        }

        // Prevent admin from changing their own role
        if (userId === req.user.id) {
            return res.status(400).json({ success: false, message: 'Cannot change your own role' });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { role },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Update user role error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Delete user (Admin only)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Prevent admin from deleting themselves
        if (userId === req.user.id) {
            return res.status(400).json({ success: false, message: 'Cannot delete your own account' });
        }

        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Get system statistics (Admin only)
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getSystemStats = async (req, res) => {
    try {
        // Get counts
        const totalUsers = await User.countDocuments();
        const farmerCount = await User.countDocuments({ role: 'farmer' });
        const processorCount = await User.countDocuments({ role: 'processor' });
        const adminCount = await User.countDocuments({ role: 'admin' });

        const totalPredictions = await YieldData.countDocuments();
        const totalDemandRecords = await DemandData.countDocuments();
        const totalSyncRecords = await Synchronization.countDocuments();

        // Get total yield
        const yieldAgg = await YieldData.aggregate([
            { $group: { _id: null, total: { $sum: '$predictedYield' } } }
        ]);
        const totalYield = yieldAgg.length > 0 ? yieldAgg[0].total : 0;

        // Get recent users
        const recentUsers = await User.find()
            .select('-password')
            .sort({ createdAt: -1 })
            .limit(5);

        // Get recent activity (sync records)
        const recentActivity = await Synchronization.find()
            .sort({ createdAt: -1 })
            .limit(10);

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                farmerCount,
                processorCount,
                adminCount,
                totalPredictions,
                totalDemandRecords,
                totalSyncRecords,
                totalYield: Math.round(totalYield),
                recentUsers,
                recentActivity
            }
        });
    } catch (error) {
        console.error('Get system stats error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
