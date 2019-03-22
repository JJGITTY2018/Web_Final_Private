const { db } = require("../db/seed.js")


const getAllSongs = (req, res, next) => {
  console.log(req.query.searchQuery)
  db.any('SELECT users.id as users_id, SONGS.ID, COUNT(FAVORITES.SONGS_ID) AS SUMOFFAVS, TITLE, LOWER(TITLE), IMG_URL, TYPE, USERNAME AS ADDED_BY FROM SONGS JOIN GENRES ON SONGS.GENRES_ID = GENRES.ID JOIN USERS ON SONGS.users_id = USERS.ID FULL OUTER JOIN favorites ON SONGS.ID = favorites.songs_id WHERE LOWER(TITLE) LIKE $1 GROUP BY  users.id, SONGS.ID, TITLE, IMG_URL, TYPE, USERNAME ORDER BY COUNT(FAVORITES.SONGS_ID) DESC',["%"+req.query.searchQuery+"%"]).then((data) => {
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
  db.any('SELECT SONGS.ID, COUNT(FAVORITES.SONGS_ID) AS SUMOFFAVS, TITLE,users.id as users_id, LOWER(TITLE), IMG_URL, TYPE, USERNAME AS ADDED_BY FROM SONGS JOIN GENRES ON SONGS.GENRES_ID = GENRES.ID JOIN USERS ON SONGS.users_id = USERS.ID FULL OUTER JOIN favorites ON SONGS.ID = favorites.songs_id WHERE GENRES_ID = $1 GROUP BY  users.id, SONGS.ID, TITLE, IMG_URL, TYPE, USERNAME ORDER BY COUNT(SONGS.ID) DESC', [req.params.id]).then((data) => {
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
  db.any('SELECT users.id as users_id, SONGS.ID, COUNT(FAVORITES.SONGS_ID) AS SUMOFFAVS, TITLE, LOWER(TITLE), IMG_URL, TYPE, USERNAME AS ADDED_BY FROM SONGS JOIN GENRES ON SONGS.GENRES_ID = GENRES.ID JOIN USERS ON SONGS.users_id = USERS.ID FULL OUTER JOIN favorites ON SONGS.ID = favorites.songs_id WHERE SONGS.USERS_ID = $1 GROUP BY  users.id, SONGS.ID, TITLE, IMG_URL, TYPE, USERNAME ORDER BY COUNT(SONGS.ID) DESC', [req.params.id]).then((data) => {
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
      songs_id: req.params.id
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