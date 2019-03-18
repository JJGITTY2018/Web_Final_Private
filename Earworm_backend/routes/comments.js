var express = require('express');
var router = express.Router();

const {
  getAllCommts,
  getCommtbySongs,
  postCommts,
  deleteCommts,
  editComments
} = require("../queries/comments_q")

/* GET users listing. */
router.get("/", getAllCommts)
router.get("/songs/:id", getCommtbySongs)


router.post("/", postCommts)
router.delete("/", deleteCommts)
router.patch("/", editComments)


module.exports = router;
