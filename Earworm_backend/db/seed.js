const pgp = require("pg-promise")({})
const db = pgp("postgres://localhost:1234/earworms")

module.exports = { db }


