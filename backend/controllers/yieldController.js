const YieldData = require('../models/YieldData');

// Crop productivity factors (tonnes per acre) — simulated AI
const CROP_FACTORS = {
    wheat: { base: 1.2, variance: 0.3 },
    rice: { base: 1.8, variance: 0.4 },
    corn: { base: 2.5, variance: 0.5 },
    soybean: { base: 1.0, variance: 0.2 },
    cotton: { base: 0.8, variance: 0.15 },
    sugarcane: { base: 25.0, variance: 5.0 },
    potato: { base: 8.0, variance: 2.0 },
    tomato: { base: 12.0, variance: 3.0 },
    onion: { base: 6.0, variance: 1.5 },
    default: { base: 1.5, variance: 0.3 }
};

// Soil quality multipliers
const SOIL_MULTIPLIERS = {
    loamy: 1.2,
    clay: 0.9,
    sandy: 0.75,
    silt: 1.1,
    peat: 1.0,
    chalky: 0.8
};

// Weather impact on risk and yield
const WEATHER_IMPACT = {
    sunny: { yieldMultiplier: 1.1, risk: 'Low', riskFactor: 0.1 },
    normal: { yieldMultiplier: 1.0, risk: 'Low', riskFactor: 0.15 },
    cloudy: { yieldMultiplier: 0.95, risk: 'Low', riskFactor: 0.2 },
    rainy: { yieldMultiplier: 0.85, risk: 'Medium', riskFactor: 0.35 },
    stormy: { yieldMultiplier: 0.6, risk: 'High', riskFactor: 0.6 },
    drought: { yieldMultiplier: 0.5, risk: 'High', riskFactor: 0.7 }
};

// @desc    Predict crop yield using simulated AI logic
// @route   POST /api/yield/predict
// @access  Private
exports.predictYield = async (req, res) => {
    try {
        const { cropType, region, landSize, soilType, weatherForecast } = req.body;

        // Validate inputs
        if (!cropType || !region || !landSize || !soilType || !weatherForecast) {
            return res.status(400).json({
                success: false,
                message: 'Please provide cropType, region, landSize, soilType, and weatherForecast'
            });
        }

        // --- Simulated AI Prediction Logic ---
        const cropKey = cropType.toLowerCase();
        const crop = CROP_FACTORS[cropKey] || CROP_FACTORS.default;
        const soilMultiplier = SOIL_MULTIPLIERS[soilType] || 1.0;
        const weather = WEATHER_IMPACT[weatherForecast] || WEATHER_IMPACT.normal;

        // Random productivity factor within crop variance
        const randomFactor = crop.base + (Math.random() * 2 - 1) * crop.variance;

        // Calculate predicted yield (tons)
        const predictedYield = parseFloat(
            (landSize * randomFactor * soilMultiplier * weather.yieldMultiplier).toFixed(2)
        );

        // Determine risk score based on weather and random variance
        const riskScore = weather.risk;

        // Confidence between 75-95% (higher for favorable conditions)
        const baseConfidence = 85;
        const confidenceVariance = (1 - weather.riskFactor) * 10;
        const confidence = parseFloat(
            Math.min(95, Math.max(75, baseConfidence + confidenceVariance + (Math.random() * 5 - 2.5))).toFixed(1)
        );

        // Save prediction to database
        const yieldData = await YieldData.create({
            userId: req.user._id,
            cropType: cropKey,
            region,
            landSize,
            soilType,
            weatherForecast,
            predictedYield,
            riskScore,
            confidence
        });

        res.status(200).json({
            success: true,
            data: {
                _id: yieldData._id,
                cropType: cropKey,
                region,
                landSize,
                soilType,
                weatherForecast,
                predictedYield,
                riskScore,
                confidence,
                createdAt: yieldData.createdAt
            }
        });
    } catch (error) {
        console.error('Yield prediction error:', error);
        res.status(500).json({ success: false, message: 'Error predicting yield' });
    }
};

// @desc    Get yield history for current user
// @route   GET /api/yield/history
// @access  Private
exports.getYieldHistory = async (req, res) => {
    try {
        const yields = await YieldData.find({ userId: req.user._id })
            .sort({ createdAt: -1 })
            .limit(20);

        res.status(200).json({ success: true, data: yields });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching yield history' });
    }
};
