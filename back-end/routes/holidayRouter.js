const express = require('express');
const router = express.Router();
const holidayController = require('../controllers/holidayController');

router.get('/get_all_holidays', holidayController.getAllHolidays);
router.post('/add_holiday', holidayController.createHoliday);

module.exports = router;
