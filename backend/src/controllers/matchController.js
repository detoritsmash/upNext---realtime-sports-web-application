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


//* Endpoint: GET /api/v1/matches/:matchId
const getMatchById = async (req, res) => {
    const { matchId } = req.params;

    try {
        // Tier 1: Check Redis cache for live match data
        const cachedMatch = await redis.hget('live_matches', matchId);

        if (cachedMatch) {
            return res.status(200).json({
                success: true,
                message: "Success",
                timestamp: Math.floor(Date.now() / 1000),
                data: JSON.parse(cachedMatch)
            });
        }

        // Tier 2: Not in Redis, check MongoDB for historical match data
        const dbMatch = await Match.findOne({ id: matchId });

        if (dbMatch) {
            return res.status(200).json({
                success: true,
                message: "Success",
                timestamp: Math.floor(Date.now() / 1000),
                data: dbMatch
            });
        }

        // Tier 3: Match not found in either Redis or MongoDB
        return res.status(404).json({
            success: false,
            message: "Match not found",
            error: {
                code: "MATCH_NOT_FOUND"
            }
        });

    } catch (error) {
        console.error(`❌ Error retrieving match details for ${matchId}:`, error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve match metrics.",
            error: {
                code: "INTERNAL_SERVER_ERROR"
            }
        });
    }
};

module.exports = {
    getLiveMatches,
    getUpcomingMatches,
    getFinishedMatches,
    getMatchById
};