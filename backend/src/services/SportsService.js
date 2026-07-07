const axios = require('axios');
const cron = require('node-cron');
const { connectRedis } = require('../config/db');

const redis = connectRedis();

function normalizeFootballMatch(raw) {
    return {
        id: `fb_${raw.fixture.id}`,
        sport: 'football',
        league: {
            name: raw.league.name,
            logo: raw.league.logo
        },
        teams: {
            home: { name: raw.teams.home.name, logo: raw.teams.home.logo },
            away: { name: raw.teams.away.name, logo: raw.teams.away.logo }
        },
        status: {
            short: raw.fixture.status.short,
            elapsed: raw.fixture.status.elapsed || 0
        },
        score: {
            home: raw.goals.home ?? 0,
            away: raw.goals.away ?? 0
        },
        details: {
            referee: raw.fixture.referee,
            venue: raw.fixture.venue.name,
            halftime_score: {
                home: raw.score.halftime.home,
                away: raw.score.halftime.away
            }
        }
    };
}

async function fetchLiveMatchesFromAPI() {
    try {
        console.log('Fetching live match feeds from external Sports API...');
        
        const response = await axios.get('https://v3.football.api-sports.io/fixtures', {
            params: { live: 'all' },
            headers: {
                'x-rapidapi-key': process.env.SPORTS_API_KEY,
                'x-rapidapi-host': 'v3.football.api-sports.io'
            }
        });

        const rawFixtures = response.data.response || [];
        
        if (rawFixtures.length === 0) {
            console.log('No active live matches streaming right now.');
            return;
        }

        for (const rawMatch of rawFixtures) {
            const normalized = normalizeFootballMatch(rawMatch);
            
            await redis.hset('live_matches', normalized.id, JSON.stringify(normalized));
        }

        console.log(`✅ Successfully cached ${rawFixtures.length} live matches to Redis memory.`);
        
    } catch (error) {
        console.error('❌ Background Polling Engine Error:', error.message);
    }
}

/**
 * background automated schedulers.
 */
const startPollingEngine = async () => {

    console.log('🚀 Executing initial API fetch on startup...');
    await fetchLiveMatchesFromAPI();

    // Run the live polling service every 15 min
    cron.schedule('*/15 * * * *', async () => {
        await fetchLiveMatchesFromAPI();
    });
    
    console.log('Background task cron loops initiated safely.');
};

module.exports = { startPollingEngine };