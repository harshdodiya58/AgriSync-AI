const mongoose = require('mongoose');

const synchronizationSchema = new mongoose.Schema({
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
    supply: {
        type: Number,
        required: true
    },
    demand: {
        type: Number,
        required: true
    },
    imbalance: {
        type: Number,
        required: true
    },
    imbalancePercentage: {
        type: Number,
        required: true
    },
    alertType: {
        type: String,
        enum: ['oversupply', 'shortage', 'balanced'],
        required: true
    },
    severity: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'low'
    },
    recommendation: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Synchronization', synchronizationSchema);
