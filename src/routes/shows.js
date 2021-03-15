const express = require("express");
const router = express.Router();
const ShowsController = require('../controllers/Shows');

router.get('/', ShowsController.listShows);

module.exports = router;