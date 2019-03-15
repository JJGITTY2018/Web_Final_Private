const { db } = require("../db/seed")


const getGenres = (req, res, next) => {
  db.any('SELECT * FROM genres').then((data) => {
    res.status(200).json({
      data
    })
  }).catch(err => {
    res.status(404).json({
      message: err
    })
  })
}


const createNewGenre = (req, res, next) => {
  console.log(req.body.username)
  db.none('INSERT INTO genres(type) VALUES ($1)', [req.body.type]).then(() => {
    res.status(200).json({
      message: "Genere Created",
      type: req.body.type
    })
  })
    .catch((err) => {
      res.status(404).json({
        error: err
      })
    })
}


module.exports = {
  createNewGenre,
  getGenres

}