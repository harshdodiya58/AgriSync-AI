const mongoose = require('mongoose');

const demandDataSchema = new mongoose.Schema({
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
    predictedDemand: {
        type: Number,
        required: true
    },
    dateRange: {
        start: { type: Date, required: true },
        end: { type: Date, required: true }
    },
    // Array of daily demand data points for charting
    dailyData: [{
        date: { type: Date, required: true },
        demand: { type: Number, required: true },
        isFestivalSpike: { type: Boolean, default: false },
        festivalName: { type: String, default: '' }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('DemandData', demandDataSchema);
