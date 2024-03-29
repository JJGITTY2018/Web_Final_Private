var express = require('express');
var router = express.Router();

const {
  getAllFavs,
  getFavSpecSongs,
  getFavUserSongs,
  createFavorite,
  deleteFavs
} = require("../queries/favorites_q")

/* GET users listing. */
router.get("/", getAllFavs)
router.get("/songs/:id", getFavSpecSongs)
router.get("/users/:id", getFavUserSongs)

router.post("/", createFavorite)
router.delete("/", deleteFavs)

module.exports = router;
 
