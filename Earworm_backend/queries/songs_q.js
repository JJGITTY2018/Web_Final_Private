const { db } = require("../db/seed.js")


const getAllSongs = (req, res, next) => {
  db.any('SELECT * FROM users').then((data) => {
    res.status(200).json({
      data
    })
  }).catch(err => {
    res.status(404).json({
      message: err
    })
  })
}

const getAllSongsByGenre = (req, res, next) => {
  db.one('SELECT * FROM users WHERE id = $1', req.params.id).then((data) => {
    res.status(200).json({
      data
    })
  })
    .catch((err) => {
      res.status(404).json({
        error: err
      })
    })
}

const getAllSongByUser = (req, res, next) => {
  db.one('SELECT * FROM users WHERE id = $1', req.params.id).then((data) => {
    res.status(200).json({
      data
    })
  })
    .catch((err) => {
      res.status(404).json({
        error: err
      })
    })
}



const getOneSong = (req, res, next) => {
  db.one('SELECT * FROM users WHERE id = $1', req.params.id).then((data) => {
    res.status(200).json({
      data
    })
  })
    .catch((err) => {
      res.status(404).json({
        error: err
      })
    })
}


const createNewSong = (req, res, next) => {
  console.log(req.body.username)
  db.none('INSERT INTO users(username) VALUES ($1)', [req.body.username]).then(() => {
    res.status(200).json({
      message: "Created",
      username: req.body.username
    })
  })
    .catch((err) => {
      res.status(404).json({
        error: err
      })
    })
}

const deleteSong = (req, res, next) => {
  console.log(req.body.username)
  db.none('DELETE FROM users WHERE id = ($1)', [req.params.id]).then(() => {
    res.status(200).json({
      message: "deleted",
      userid: req.params.id
    })
  })
    .catch((err) => {
      res.status(404).json({
        error: err
      })
    })
}

module.exports = {
  deleteSong,
  createNewSong,
  getOneSong,
  getAllSongByUser,
  getAllSongsByGenre,
  getAllSongs
}