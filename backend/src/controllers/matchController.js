const { connectRedis } = require('../config/db');

const redis = connectRedis();

const getLiveMatches = async (req, res) => {
    try {

        const rawCachedMatches = await redis.hvals('live_matches');

        const matches = rawCachedMatches.map(matchString => JSON.parse(matchString));

        return res.status(200).json({
            success: true,
            message: "Success",
            timestamp: Math.floor(Date.now() / 1000),
            data: matches
        });

    } catch (error) {
        console.error('❌ Error fetching live matches from cache:', error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to retrieve live match data.",
            error: {
                code: "INTERNAL_SERVER_ERROR"
            }
        });
    }
};

module.exports = {
    getLiveMatches
};