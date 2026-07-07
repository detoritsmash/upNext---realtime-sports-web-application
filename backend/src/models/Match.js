// src/models/Match.js
const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // e.g., fb_1034522
    sport: { type: String, required: true },            // e.g., 'football' or 'basketball'
    league: {
        name: { type: String, required: true },
        logo: { type: String }
    },
    teams: {
        home: {
            name: { type: String, required: true },
            logo: { type: String }
        },
        away: {
            name: { type: String, required: true },
            logo: { type: String }
        }
    },
    status: {
        short: { type: String, required: true },       // FT (Finished), NS (Not Started)
        elapsed: { type: Number, default: 0 }
    },
    score: {
        home: { type: Number, default: 0 },
        away: { type: Number, default: 0 }
    },
    details: { type: mongoose.Schema.Types.Mixed, default: {} } // Sport-specific data mapping
}, { timestamps: true });

module.exports = mongoose.model('Match', MatchSchema);