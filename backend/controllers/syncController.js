const Synchronization = require('../models/Synchronization');

// Recommendation templates
const OVERSUPPLY_RECOMMENDATIONS = [
    'Consider diverting excess supply to {region} region where demand is higher.',
    'Explore export opportunities or cold storage for surplus {crop} in {region}.',
    'Recommend price adjustment to stimulate demand in {region} market.',
    'Contact processing units in nearby regions for bulk procurement of {crop}.',
    'Setup farmer cooperatives in {region} for collective bargaining of surplus {crop}.'
];

const SHORTAGE_RECOMMENDATIONS = [
    'Source additional {crop} from {region} and neighboring regions immediately.',
    'Activate backup supplier network for {crop} in {region} area.',
    'Implement demand rationing strategy for {crop} in {region} market.',
    'Fast-track imports of {crop} to meet {region} regional demand gap.',
    'Coordinate with interstate supply chains to fill {crop} shortage in {region}.'
];

const BALANCED_RECOMMENDATIONS = [
    'Supply-demand balance is optimal for {crop} in {region}. Maintain current flow.',
    'Monitor {crop} stocks in {region} closely — maintain buffer inventory.',
    '{crop} market in {region} is stable. Continue current distribution strategy.'
];

function getRecommendation(alertType, cropType, region) {
    let templates;
    if (alertType === 'oversupply') templates = OVERSUPPLY_RECOMMENDATIONS;
    else if (alertType === 'shortage') templates = SHORTAGE_RECOMMENDATIONS;
    else templates = BALANCED_RECOMMENDATIONS;

    const template = templates[Math.floor(Math.random() * templates.length)];
    return template.replace(/\{crop\}/g, cropType).replace(/\{region\}/g, region);
}

function getSeverity(imbalancePercentage) {
    const abs = Math.abs(imbalancePercentage);
    if (abs < 10) return 'low';
    if (abs < 25) return 'medium';
    if (abs < 50) return 'high';
    return 'critical';
}

// @desc    Compare supply vs demand and generate sync data
// @route   POST /api/sync/compare
// @access  Private
exports.compareSyncData = async (req, res) => {
    try {
        const { cropType, region, supply, demand } = req.body;

        if (!cropType || !region || supply === undefined || demand === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Please provide cropType, region, supply, and demand values'
            });
        }

        const supplyVal = parseFloat(supply);
        const demandVal = parseFloat(demand);
        const imbalance = parseFloat((supplyVal - demandVal).toFixed(2));
        const imbalancePercentage = demandVal > 0
            ? parseFloat(((imbalance / demandVal) * 100).toFixed(1))
            : 0;

        // Determine alert type
        let alertType;
        if (imbalance > demandVal * 0.05) alertType = 'oversupply';
        else if (imbalance < -demandVal * 0.05) alertType = 'shortage';
        else alertType = 'balanced';

        const severity = getSeverity(imbalancePercentage);
        const recommendation = getRecommendation(alertType, cropType, region);

        // Save to database
        const syncData = await Synchronization.create({
            cropType,
            region,
            supply: supplyVal,
            demand: demandVal,
            imbalance,
            imbalancePercentage,
            alertType,
            severity,
            recommendation
        });

        res.status(200).json({
            success: true,
            data: syncData
        });
    } catch (error) {
        console.error('Sync comparison error:', error);
        res.status(500).json({ success: false, message: 'Error comparing supply and demand' });
    }
};

// @desc    Get synchronization history
// @route   GET /api/sync/history
// @access  Private
exports.getSyncHistory = async (req, res) => {
    try {
        const { cropType, region } = req.query;
        const filter = {};
        if (cropType) filter.cropType = cropType;
        if (region) filter.region = region;

        const history = await Synchronization.find(filter)
            .sort({ createdAt: -1 })
            .limit(50);

        res.status(200).json({ success: true, data: history });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching sync history' });
    }
};
