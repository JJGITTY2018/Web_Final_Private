const { db } = require("../db/seed.js")


const getAllSongs = (req, res, next) => {
  db.any('SELECT SONGS.ID, TITLE, IMG_URL, TYPE, USERNAME AS ADDED_BY FROM SONGS JOIN GENRES ON SONGS.GENRES_ID = GENRES.ID JOIN USERS ON SONGS.users_id = USERS.ID').then((data) => {
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
  db.any('SELECT SONGS.ID, TITLE, IMG_URL, TYPE, USERNAME AS ADDED_BY, GENRES.ID AS GENRES_ID FROM SONGS JOIN GENRES ON SONGS.GENRES_ID = GENRES.ID JOIN USERS ON SONGS.users_id = USERS.ID WHERE GENRES_ID = $1', [req.params.id]).then((data) => {
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
  db.any('SELECT SONGS.ID, TITLE, IMG_URL, TYPE, USERNAME AS ADDED_BY, USERS_ID FROM SONGS JOIN GENRES ON SONGS.GENRES_ID = GENRES.ID JOIN USERS ON SONGS.users_id = USERS.ID WHERE USERS_ID = $1', [req.params.id]).then((data) => {
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
  db.one('SELECT SONGS.ID, TITLE, IMG_URL, TYPE, USERNAME AS ADDED_BY, USERS_ID FROM SONGS JOIN GENRES ON SONGS.GENRES_ID = GENRES.ID JOIN USERS ON SONGS.users_id = USERS.ID WHERE songs.id = $1', req.params.id).then((data) => {
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
  db.none('INSERT INTO songs (title,img_url,users_id,genres_id) VALUES ($1,$2,$3,$4)', [req.body.title,req.body.img_url,req.body.users_id,req.body.genres_id]).then(() => {
    res.status(200).json({
      message: "Created",
      title: req.body.title,
      img_url: req.body.img_url,
      users_id: req.body.users_id,
      genres_id: req.body.genres_id,
      
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
  db.none('DELETE FROM songs WHERE id = ($1)', [req.params.id]).then(() => {
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