const {Pool} = require('pg');

require('dotenv').config({
    path: `.env${process.env.DEVELOPMENT ? '.DEV' : ''}`
});

const config = {
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    }
};

const pool = new Pool(config.db);


module.exports = pool
