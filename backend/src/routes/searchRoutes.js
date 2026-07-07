// src/routes/searchRoutes.js
const express = require('express');
const router = express.Router();
const { searchEntities } = require('../controllers/searchController');

// Rule 4-xii: Search api routing directory
router.get('/', searchEntities);

module.exports = router;