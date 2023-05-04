const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

router.get('/allEvents', eventsController.getAllEvents);
router.post('/add_events', eventsController.createEvent);

module.exports = router;
