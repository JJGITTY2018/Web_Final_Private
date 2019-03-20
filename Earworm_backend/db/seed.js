const pgp = require("pg-promise")({})
const db = pgp("postgres://localhost:5432/earworm")

// just changing this to fit my db name, disregard

module.exports = { db }
