const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

router.get('/allEvents', eventsController.getAllEvents);

module.exports = router;
