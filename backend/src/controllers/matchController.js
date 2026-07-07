const { connectRedis } = require('../config/db');
const Match = require('../models/Match'); 

const redis = connectRedis();

const getLiveMatches = async (req, res) => { /* ... */ };

 //* Endpoint: GET /api/v1/matches/upcoming
const getUpcomingMatches = async (req, res) => {
    try {
        
        const matches = await Match.find({ "status.short": "NS" }).sort({ createdAt: 1 });

        return res.status(200).json({
            success: true,
            message: "Success",
            timestamp: Math.floor(Date.now() / 1000),
            data: matches
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve upcoming fixtures.",
            error: { code: "DATABASE_ERROR" }
        });
    }
};


// * Endpoint: GET /api/v1/matches/finished
const getFinishedMatches = async (req, res) => {
    try {
        
        const matches = await Match.find({ "status.short": "FT" }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Success",
            timestamp: Math.floor(Date.now() / 1000),
            data: matches
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve finished fixtures.",
            error: { code: "DATABASE_ERROR" }
        });
    }
};

module.exports = {
    getLiveMatches,
    getUpcomingMatches,
    getFinishedMatches
};