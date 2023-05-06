const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

router.get('/allEvents', eventsController.getAllEvents);
router.get('/getallEvents', eventsController.allEvents);
router.post('/add_events', eventsController.createEvent);
router.post('/update_events/:id', eventsController.updateEvent);
router.delete('/delete_events/:id', eventsController.deleteEvent);

module.exports = router;
