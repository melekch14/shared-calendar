const express = require('express');
const router = express.Router();
const mosqueeController = require('../controllers/mosqueeController');

router.get('/get_all_mosquee', mosqueeController.getAllMosquee);
router.post('/add_mosquee', mosqueeController.createMosquee);

module.exports = router;
