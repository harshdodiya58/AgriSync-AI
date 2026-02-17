const Synchronization = require('../models/Synchronization');

// @desc    Get all alerts (from synchronization records)
// @route   GET /api/alerts
// @access  Private
exports.getAlerts = async (req, res) => {
    try {
        const { type, severity } = req.query;
        const filter = {};

        // Filter by alert type if provided
        if (type && ['oversupply', 'shortage', 'balanced'].includes(type)) {
            filter.alertType = type;
        } else {
            // By default, exclude balanced (only show actionable alerts)
            filter.alertType = { $in: ['oversupply', 'shortage'] };
        }

        // Filter by severity if provided
        if (severity && ['low', 'medium', 'high', 'critical'].includes(severity)) {
            filter.severity = severity;
        }

        const alerts = await Synchronization.find(filter)
            .sort({ createdAt: -1 })
            .limit(50);

        // Compute summary stats
        const totalAlerts = alerts.length;
        const oversupplyCount = alerts.filter(a => a.alertType === 'oversupply').length;
        const shortageCount = alerts.filter(a => a.alertType === 'shortage').length;
        const criticalCount = alerts.filter(a => a.severity === 'critical').length;
        const highCount = alerts.filter(a => a.severity === 'high').length;

        res.status(200).json({
            success: true,
            summary: {
                total: totalAlerts,
                oversupply: oversupplyCount,
                shortage: shortageCount,
                critical: criticalCount,
                high: highCount
            },
            data: alerts
        });
    } catch (error) {
        console.error('Alerts fetch error:', error);
        res.status(500).json({ success: false, message: 'Error fetching alerts' });
    }
};

// @desc    Get dashboard stats (for admin/overview)
// @route   GET /api/alerts/stats
// @access  Private
exports.getDashboardStats = async (req, res) => {
    try {
        const User = require('../models/User');
        const YieldData = require('../models/YieldData');

        const [totalUsers, totalYields, totalSyncs, recentAlerts] = await Promise.all([
            User.countDocuments(),
            YieldData.countDocuments(),
            Synchronization.countDocuments(),
            Synchronization.find({ alertType: { $ne: 'balanced' } })
                .sort({ createdAt: -1 })
                .limit(5)
        ]);

        // Average yield
        const yieldAgg = await YieldData.aggregate([
            { $group: { _id: null, avgYield: { $avg: '$predictedYield' }, totalYield: { $sum: '$predictedYield' } } }
        ]);

        const avgYield = yieldAgg.length > 0 ? parseFloat(yieldAgg[0].avgYield.toFixed(2)) : 0;
        const totalYield = yieldAgg.length > 0 ? parseFloat(yieldAgg[0].totalYield.toFixed(2)) : 0;

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalPredictions: totalYields,
                totalSyncRecords: totalSyncs,
                avgYield,
                totalYield,
                recentAlerts
            }
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({ success: false, message: 'Error fetching dashboard stats' });
    }
};
