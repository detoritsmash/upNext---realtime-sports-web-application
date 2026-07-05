// backend/src/config/db.js
const mongoose = require('mongoose');
const Redis = require('ioredis');
require('dotenv').config();

let redisClient = null;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/upnext');
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        process.exit(1);
    }
};

const connectRedis = () => {
    if (!redisClient) {
        redisClient = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');
        redisClient.on('connect', () => console.log('Redis cache layer initialized.'));
        redisClient.on('error', (err) => console.error('❌ Redis Connection Error:', err.message));
    }
    return redisClient;
};

module.exports = { connectDB, connectRedis };