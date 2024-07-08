const express = require('express');
const router = express.Router()

const signIn = require('../controllers/signup')

router.post("/", signIn);

module.exports = router