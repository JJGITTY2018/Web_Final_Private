const { db } = require("../db/seed")


const getAllFavs = (req, res, next) => {
  db.any('SELECT Favorites.id,favorites.users_id, songs_id, title, img_url,username, genres.type FROM favorites JOIN SONGS ON favorites.songs_id = SONGS.ID JOIN USERS ON favorites.users_id = users.id JOIN GENRES ON Genres_id = genres.id').then((data) => {
    res.status(200).json({
      data
    })
  }).catch(err => {
    res.status(404).json({
      message: err
    })
  })
}

const getFavSpecSongs = (req,res,next) =>{
  db.any('SELECT Favorites.id,favorites.users_id, songs_id, title, img_url,username, genres.type FROM favorites JOIN SONGS ON favorites.songs_id = SONGS.ID JOIN USERS ON favorites.users_id = users.id JOIN GENRES ON Genres_id = genres.id WHERE favorites.songs_ID = $1'
  ,[req.params.id]).then((data)=>{
    res.status(200).json({
      data
    })

  }).catch( err =>{
    res.status(404).json({
      message: err
    })
  })
}

const getFavUserSongs = (req, res, next) => {
  db.any('SELECT Favorites.id,favorites.users_id, songs_id, title, img_url,username, genres.type FROM favorites JOIN SONGS ON favorites.songs_id = SONGS.ID JOIN USERS ON favorites.users_id = users.id JOIN GENRES ON Genres_id = genres.id WHERE favorites.users_id = $1', [req.params.id]).then((data) => {
      res.status(200).json({
        data
      })

    }).catch(err => {
      res.status(404).json({
        message: err
      })
    })
  }

const createFavorite = (req, res, next) => {
  console.log(req.body.username)
  db.none('INSERT INTO favorite (users_id,songs_id) VALUES ($1,$2)', [req.body.users_id, req.body.songs_id, req.body.users_id, req.body.genres_id]).then(() => {
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

const deleteFavs = (req, res, next) => {
  console.log(req.body.username)
  db.none('DELETE FROM favorite WHERE id = ($1)', [req.params.id]).then(() => {
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
  getAllFavs,
  getFavSpecSongs,
  getFavUserSongs,
  createFavorite,
  deleteFavs

}