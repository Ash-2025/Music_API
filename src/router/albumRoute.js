const express = require('express');
const router = express.Router();

const getAlbum = require("../controllers/getAlbum");

router.get("/:album_name" , getAlbum);

module.exports = router;