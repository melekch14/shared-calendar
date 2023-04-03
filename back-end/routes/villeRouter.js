const express = require('express');
const router = express.Router();
const villeController = require('../controllers/villeController');

router.get('/get_all_ville', villeController.getAllVille);

module.exports = router;
