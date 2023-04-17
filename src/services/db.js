const Knex = require('knex')

require('dotenv').config({
  path: `.env${process.env.DEVELOPMENT ? '.DEV' : ''}`,
})

const knex = Knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  useNullAsDefault: true,
})

module.exports = knex
