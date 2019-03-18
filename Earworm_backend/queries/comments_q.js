const { db } = require("../db/seed")


const getAllCommts = (req, res, next) => {
  db.any('SELECT comments.id, body, comments.users_id, songs_id, username, title  FROM comments JOIN USERS ON users.id = users_id JOIN SONGS ON songs.id = songs_id').then((data) => {
    res.status(200).json({
      data
    })
  }).catch(err => {
    res.status(404).json({
      message: err
    })
  })
}

const getCommtbySongs = (req, res, next) => {
  db.any('SELECT Favorites.id,favorites.users_id, songs_id, title, img_url,username, genres.type FROM favorites JOIN SONGS ON favorites.songs_id = SONGS.ID JOIN USERS ON favorites.users_id = users.id JOIN GENRES ON Genres_id = genres.id WHERE favorites.songs_ID = $1'
    , [req.params.id]).then((data) => {
      res.status(200).json({
        data
      })

    }).catch(err => {
      res.status(404).json({
        message: err
      })
    })
}

const postCommts = (req, res, next) => {
  console.log(req.body.username)
  db.none('INSERT INTO Comments (body, users_id, songs_id) VALUES ($1,$2,$3)', [req.body.body, req.body.users_id, req.body.songs_id]).then(() => {
    res.status(200).json({
      message: "Created",
      title: req.body.title,
      body: req.body.body,
      users_id: req.body.users_id,
      songs_id: req.body.songs_id,
    })
  })
    .catch((err) => {
      res.status(404).json({
        error: err
      })
    })
}

const deleteCommts = (req, res, next) => {
  console.log(req.body.username)
  db.none('DELETE FROM comments WHERE id = ($1)', [req.params.id]).then(() => {
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


const editComments = (req, res, next) => {
  console.log(req.body.username)
  db.none('UPDATE comments SET body = $2 WHERE id = $1', [req.body.id, req.body.body]).then(() => {
    res.status(200).json({
      message: "edit",
    })
  })
    .catch((err) => {
      res.status(404).json({
        error: err
      })
    })
}
module.exports = {
  getAllCommts,
  getCommtbySongs,
  postCommts,
  deleteCommts,
  editComments
}