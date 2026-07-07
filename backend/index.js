const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const { connectDB, connectRedis } = require('./src/config/db');
const matchRoutes = require('./src/routes/matchRoutes');
const { startPollingEngine } = require('./src/services/SportsService');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

connectDB();
const redis = connectRedis();

startPollingEngine(); // Start the polling engine to fetch live match data from the external API and cache it in Redis

// Middleware
app.use(cors({ origin: '*' })); // Open for local dev integration with Dev B
app.use(express.json());

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Socket.io 
io.on('connection', (socket) => {
    console.log(`🔌 Client connected to live sync pipeline: ${socket.id}`);

    socket.on('join_match', (payload) => {
        if (payload && payload.matchId) {
            socket.join(payload.matchId);
            console.log(`👤 Client ${socket.id} joined match room: ${payload.matchId}`);
        }
    });

    socket.on('leave_match', (payload) => {
        if (payload && payload.matchId) {
            socket.leave(payload.matchId);
            console.log(`👤 Client ${socket.id} left match room: ${payload.matchId}`);
        }
    });

    socket.on('disconnect', () => {
        console.log(`🔌 Client disconnected from live sync pipeline: ${socket.id}`);
    });
});


app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the upNext central sports engine API. Use /api/v1/health to check connection diagnostics."
    });
});

// API ROUTES (Base URL: /api/v1)

// Health Diagnostic API Route
app.get('/api/v1/health', async (req, res) => {
    const mongoStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    
    let redisStatus = 'disconnected';
    if (redis && redis.status === 'ready') {
        redisStatus = 'connected';
    }

    const ioStatus = io ? 'running' : 'stopped';

    const healthResponse = {
        status: (mongoStatus === 'connected' && redisStatus === 'connected') ? 'OK' : 'DEGRADED',
        redis: redisStatus,
        mongodb: mongoStatus,
        socket: ioStatus
    };

    res.status(healthResponse.status === 'OK' ? 200 : 500).json({
        success: healthResponse.status === 'OK',
        message: healthResponse.status === 'OK' ? 'Success' : 'Internal infrastructure error',
        timestamp: Math.floor(Date.now() / 1000),
        data: healthResponse
    });
});

app.use('/api/v1/matches', matchRoutes);

//core application stack
server.listen(PORT, () => {
    console.log(`upNext central engine spinning smoothly on port ${PORT}`);
});

//if needed,
module.exports = { app, io, redis };