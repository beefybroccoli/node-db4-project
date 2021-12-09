// // DO NOT CHANGE THIS FILE
// const knex = require('knex');
// const configs = require("./knexfile");
// const environment = process.env.NODE_ENV || 'development';

// module.exports = knex(configs[environment]);

const knex = require('knex')({
    client: 'sqlite3',
    useNullAsDefault:true,
    connection: {
      filename: "./database/db/dev.sqlite3"
    },
    migrations : {
      directory: "./database/migrations"
    },
    seeds : {
      directory: "./database/seeds"
    }
  });

  module.exports = knex;