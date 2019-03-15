var express = require('express');
var router = express.Router();

const { 
  getAllUsers,
  getSingleUser,
  createNewUser,
  deleteUser
} = require("../queries/user_q.js")

/* GET users listing. */
router.get('/:id', getSingleUser);
router.get('/', getAllUsers);
router.post('/', createNewUser)
router.delete('/:id', deleteUser)

module.exports = router;
