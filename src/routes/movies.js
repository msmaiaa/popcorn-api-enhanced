const express = require("express");
const router = express.Router();
const MoviesController = require('../controllers/Movies');

router.get('/', MoviesController.listMovies);

module.exports = router;