const getSongByName = require('../controllers/getSongs');
const express = require('express');

const router = express.Router();

router.get('/:song_name', getSongByName)

module.exports = router