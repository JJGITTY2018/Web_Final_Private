var express = require('express');
var router = express.Router();

const {
  deleteSong,
  createNewSong,
  getOneSong,
  getAllSongByUser,
  getAllSongsByGenre,
  getAllSongs
} = require("../queries/songs_q")

/* GET users listing. */
router.get("/", getAllSongs)
router.get("/:id", getOneSong)
router.get("/genres/:id", getAllSongsByGenre)
router.get("/users/:id", getAllSongByUser)

router.post("/", createNewSong)
router.delete("/", deleteSong)











module.exports = router;
