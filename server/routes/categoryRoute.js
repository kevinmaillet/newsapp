const express = require('express');
const router = express.Router();
const getPosts = require('../controllers/getPosts');

router.post('/articles/:category', getPosts);

module.exports = router;
