const express = require("express");
const router = express.Router();
const AnimesController = require('../controllers/Animes');

router.get('/', AnimesController.listAnimes);

module.exports = router;