const config = require("../knexfile");
const knex = require("knex");
const db = knex(config);

db.migrate.latest([config]);

module.exports = db;
