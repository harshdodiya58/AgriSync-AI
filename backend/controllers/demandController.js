const DemandData = require('../models/DemandData');

// Festival/seasonal events that cause demand spikes
const FESTIVALS = [
    { name: 'Harvest Festival', dayOffset: 5, multiplier: 1.8 },
    { name: 'Diwali', dayOffset: 12, multiplier: 2.2 },
    { name: 'Christmas Season', dayOffset: 20, multiplier: 1.9 },
    { name: 'New Year', dayOffset: 28, multiplier: 1.6 }
];

// Regional demand base factors
const REGION_DEMAND = {
    north: { base: 150, variance: 30 },
    south: { base: 180, variance: 35 },
    east: { base: 120, variance: 25 },
    west: { base: 160, variance: 30 },
    central: { base: 140, variance: 28 },
    default: { base: 150, variance: 30 }
};

// @desc    Get demand forecast with 30-day time series
// @route   GET /api/demand/forecast
// @access  Private
exports.getDemandForecast = async (req, res) => {
    try {
        const { cropType, region, days } = req.query;
        const forecastDays = parseInt(days) || 30;
        const cropFilter = cropType || 'wheat';
        const regionFilter = region || 'north';

        // Generate mock 30-60 day time-series data
        const regionKey = regionFilter.toLowerCase();
        const regionData = REGION_DEMAND[regionKey] || REGION_DEMAND.default;
        const today = new Date();
        const dailyData = [];
        let totalDemand = 0;

        for (let i = 0; i < forecastDays; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);

            // Base demand with sinusoidal seasonal pattern
            let demand = regionData.base + Math.sin(i / 7) * regionData.variance * 0.5;

            // Add random noise
            demand += (Math.random() - 0.5) * regionData.variance;

            // Check for festival spikes
            let isFestivalSpike = false;
            let festivalName = '';
            for (const festival of FESTIVALS) {
                if (i === festival.dayOffset || i === festival.dayOffset + 1) {
                    demand *= festival.multiplier;
                    isFestivalSpike = true;
                    festivalName = festival.name;
                    break;
                }
            }

            demand = Math.max(50, parseFloat(demand.toFixed(1)));
            totalDemand += demand;

            dailyData.push({
                date: date.toISOString().split('T')[0],
                demand,
                isFestivalSpike,
                festivalName
            });
        }

        // Regional breakdown
        const regions = ['North', 'South', 'East', 'West', 'Central'];
        const regionalBreakdown = regions.map(r => ({
            region: r,
            demand: parseFloat((totalDemand * (0.15 + Math.random() * 0.1)).toFixed(1)),
            trend: Math.random() > 0.5 ? 'increasing' : 'decreasing',
            changePercent: parseFloat((Math.random() * 15 - 5).toFixed(1))
        }));

        const forecastResult = {
            cropType: cropFilter,
            region: regionFilter,
            totalPredictedDemand: parseFloat(totalDemand.toFixed(1)),
            avgDailyDemand: parseFloat((totalDemand / forecastDays).toFixed(1)),
            peakDemand: Math.max(...dailyData.map(d => d.demand)),
            forecastDays,
            dailyData,
            regionalBreakdown,
            festivalSpikes: dailyData.filter(d => d.isFestivalSpike)
        };

        res.status(200).json({
            success: true,
            data: forecastResult
        });
    } catch (error) {
        console.error('Demand forecast error:', error);
        res.status(500).json({ success: false, message: 'Error generating demand forecast' });
    }
};
