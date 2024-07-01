const getArtistSongs = require('../controllers/getArtist');

const express = require('express');
const router = express.Router();

router.get("/:artist_name" ,getArtistSongs)

module.exports = router;