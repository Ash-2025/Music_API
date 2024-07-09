const express = require('express');
const {getPlaylist,getFullPlaylist} = require('../controllers/getPlaylist');
const checkApi = require('../middleware/api_verify');

const router = express.Router();

router.get('/:playlist_name/',getPlaylist)
router.get('/:playlist_name/:api_key',checkApi,getFullPlaylist)
module.exports = router;