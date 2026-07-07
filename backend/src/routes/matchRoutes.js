// src/routes/matchRoutes.js
const express = require('express');
const router = express.Router();
const { 
    getLiveMatches, 
    getUpcomingMatches, 
    getFinishedMatches 
} = require('../controllers/matchController');

router.get('/live', getLiveMatches);
router.get('/upcoming', getUpcomingMatches); 
router.get('/finished', getFinishedMatches); 

module.exports = router;