const Match = require('../models/Match');

// Endpoint: GET /api/v1/search?q=keyword

const searchEntities = async (req, res) => {
    const { q } = req.query;

    try {
        if (!q || q.trim() === "") {
            return res.status(200).json({
                success: true,
                message: "Success",
                timestamp: Math.floor(Date.now() / 1000),
                data: []
            });
        }

        // case-insensitive regex for partial matching
        const searchRegex = new RegExp(q, 'i');

        // Search MongoDB for matches where league name or team names match the query
        const searchResults = await Match.find({
            $or: [
                { "league.name": searchRegex },
                { "teams.home.name": searchRegex },
                { "teams.away.name": searchRegex }
            ]
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Success",
            timestamp: Math.floor(Date.now() / 1000),
            data: searchResults
        });

    } catch (error) {
        console.error('❌ Search execution pipeline failure:', error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to fulfill search request query optimization.",
            error: {
                code: "INTERNAL_SERVER_ERROR"
            }
        });
    }
};

module.exports = {
    searchEntities
};