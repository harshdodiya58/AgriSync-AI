const mongoose = require('mongoose');

const yieldDataSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cropType: {
        type: String,
        required: [true, 'Crop type is required'],
        trim: true
    },
    region: {
        type: String,
        required: [true, 'Region is required'],
        trim: true
    },
    landSize: {
        type: Number,
        required: [true, 'Land size is required'],
        min: [0.1, 'Land size must be at least 0.1 acres']
    },
    soilType: {
        type: String,
        required: [true, 'Soil type is required'],
        enum: ['clay', 'sandy', 'loamy', 'silt', 'peat', 'chalky']
    },
    weatherForecast: {
        type: String,
        required: [true, 'Weather forecast is required'],
        enum: ['sunny', 'rainy', 'cloudy', 'stormy', 'drought', 'normal']
    },
    predictedYield: {
        type: Number,
        required: true
    },
    riskScore: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        required: true
    },
    confidence: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('YieldData', yieldDataSchema);
