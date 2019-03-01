// Update with your config settings.
require('dotenv').config(); // load .env variables

const pg = require("pg");
pg.defaults.ssl = true;

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true, // used to avoid warning on console
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './database/seeds' },
  },
};
