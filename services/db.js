const {Pool} = require('pg');
const env = process.env;

const config = {
    db: {
        host: env.DB_HOST,
        port: env.DB_PORT,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME,
    }
};

const pool = new Pool(config.db);


module.exports = pool
