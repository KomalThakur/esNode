
const express = require('express');
const router = express.Router();
const esController = require('./controller');

router.get('/unique_sessions', esController.getUniqueSessions);

module.exports = router;