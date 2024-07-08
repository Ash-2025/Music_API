const express = require('express');
const {getPlaylist,getFullPlaylist} = require('../controllers/getPlaylist');

const router = express.Router();

router.get('/:playlist_name/',getPlaylist)
router.get('/:playlist_name/:api_key',getFullPlaylist)
module.exports = router;