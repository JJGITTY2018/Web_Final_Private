var express = require('express');
var router = express.Router();

const {
  createNewGenre,
  getGenres
} = require("../queries/genres_q.js")

/* GET users listing. */
router.get("/", getGenres)
router.post("/", createNewGenre)

module.exports = router;
