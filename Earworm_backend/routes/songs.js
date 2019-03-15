var express = require('express');
var router = express.Router();

const {
  deleteSong,
  createNewSong,
  getOneSong,
  getAllSongByUser,
  getAllSongsByGenre,
  getAllSongs
} = require("../queries/song_q.js")

/* GET users listing. */
router.get("/", getAllSongs)
router.get("/:genre", getAllSongs)


module.exports = router;
