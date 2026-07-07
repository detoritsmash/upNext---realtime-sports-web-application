// src/routes/matchRoutes.js
const express = require('express');
const router = express.Router();
const { 
    getLiveMatches, 
    getUpcomingMatches, 
    getFinishedMatches,
    getMatchById 
} = require('../controllers/matchController');

router.get('/live', getLiveMatches);
router.get('/upcoming', getUpcomingMatches); 
router.get('/finished', getFinishedMatches); 
router.get('/:matchId', getMatchById);

module.exports = router;