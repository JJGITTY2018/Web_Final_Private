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
  db.any('SELECT favorites.songs_id AS id, title, favorites.users_id, img_url, username AS added_by, type, COUNT AS SUMoffavs FROM FAVORITES JOIN SONGS ON FAVORITES.SONGS_ID = SONGS.ID JOIN USERS ON SONGS.users_id = USERS.ID JOIN GENRES ON GENRES_ID = GENRES.ID JOIN (SELECT COUNT(SONGS_ID), SONGS_ID FROM FAVORITES GROUP BY(SONGS_ID)) a ON a.SONGS_ID = FAVORITES.SONGS_ID WHERE FAVORITES.USERS_ID = 1',[req.params.id]).then((data) => {
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
  db.none('INSERT INTO favorites (users_id,songs_id) VALUES ($1,$2)', [req.body.users_id, req.body.songs_id]).then(() => {
    res.status(200).json({
      message: "Created"
    })
  })
    .catch((err) => {
      res.status(404).json({
        error: err
      })
    })
}

const deleteFavs = (req, res, next) => {
  console.log(req)
  console.log(req.body.users_id)
  console.log(req.body.songs_id)

  db.none('DELETE FROM FAVORITES WHERE users_ID = $1 AND SONGS_ID = $2', [req.body.users_id, req.body.songs_id]).then(() => {
    res.status(200).json({
      message: "deleted"
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