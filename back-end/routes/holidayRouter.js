const express = require('express');
const router = express.Router();
const holidayController = require('../controllers/holidayController');

router.get('/get_all_holidays', holidayController.getAllHolidays);
router.get('/all_holidays', holidayController.getHolidays);
router.post('/add_holiday', holidayController.createHoliday);
router.post('/update_holiday/:id', holidayController.updateHoliday);
router.delete('/delete_holiday/:id', holidayController.deleteHoliday);

module.exports = router;
