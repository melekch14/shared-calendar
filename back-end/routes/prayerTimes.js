const express = require('express');
const router = express.Router();

const prayerTimesController = require('../controllers/prayerTimesController');

router.get('/', prayerTimesController.getAllPrayerTimes);

router.get('/by_ville/:id_ville', prayerTimesController.getPrayerTimeByIdVille);

module.exports = router;
