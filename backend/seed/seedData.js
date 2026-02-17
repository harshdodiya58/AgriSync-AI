const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const User = require('../models/User');
const Synchronization = require('../models/Synchronization');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB for seeding...');

        // Clear existing data
        await User.deleteMany({});
        await Synchronization.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // Create sample users
        const users = await User.create([
            { name: 'Rajesh Kumar', email: 'farmer@example.com', password: 'password123', role: 'farmer' },
            { name: 'Priya Sharma', email: 'processor@example.com', password: 'password123', role: 'processor' },
            { name: 'Admin User', email: 'admin@example.com', password: 'password123', role: 'admin' }
        ]);
        console.log(`👤 Created ${users.length} users`);

        // Create sample sync/alert data
        const syncRecords = await Synchronization.create([
            {
                cropType: 'wheat', region: 'North', supply: 5000, demand: 3200,
                imbalance: 1800, imbalancePercentage: 56.25, alertType: 'oversupply', severity: 'high',
                recommendation: 'Consider diverting excess supply to South region where demand is higher.'
            },
            {
                cropType: 'rice', region: 'South', supply: 2100, demand: 4500,
                imbalance: -2400, imbalancePercentage: -53.33, alertType: 'shortage', severity: 'critical',
                recommendation: 'Source additional rice from North and neighboring regions immediately.'
            },
            {
                cropType: 'corn', region: 'East', supply: 3800, demand: 3600,
                imbalance: 200, imbalancePercentage: 5.56, alertType: 'oversupply', severity: 'low',
                recommendation: 'Supply-demand balance is near optimal. Monitor stocks closely.'
            },
            {
                cropType: 'soybean', region: 'West', supply: 1200, demand: 2800,
                imbalance: -1600, imbalancePercentage: -57.14, alertType: 'shortage', severity: 'critical',
                recommendation: 'Activate backup supplier network for soybean in West area.'
            },
            {
                cropType: 'cotton', region: 'Central', supply: 4200, demand: 2900,
                imbalance: 1300, imbalancePercentage: 44.83, alertType: 'oversupply', severity: 'high',
                recommendation: 'Explore export opportunities or cold storage for surplus cotton in Central.'
            },
            {
                cropType: 'sugarcane', region: 'North', supply: 8500, demand: 7200,
                imbalance: 1300, imbalancePercentage: 18.06, alertType: 'oversupply', severity: 'medium',
                recommendation: 'Contact processing units in nearby regions for bulk procurement of sugarcane.'
            },
            {
                cropType: 'potato', region: 'East', supply: 2000, demand: 3500,
                imbalance: -1500, imbalancePercentage: -42.86, alertType: 'shortage', severity: 'high',
                recommendation: 'Fast-track imports of potato to meet East regional demand gap.'
            },
            {
                cropType: 'tomato', region: 'South', supply: 6000, demand: 5800,
                imbalance: 200, imbalancePercentage: 3.45, alertType: 'balanced', severity: 'low',
                recommendation: 'Tomato market in South is stable. Continue current distribution strategy.'
            }
        ]);
        console.log(`📊 Created ${syncRecords.length} synchronization records`);

        console.log('\n✅ Database seeded successfully!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Login credentials:');
        console.log('  Farmer:    farmer@example.com / password123');
        console.log('  Processor: processor@example.com / password123');
        console.log('  Admin:     admin@example.com / password123');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
};

seedData();
