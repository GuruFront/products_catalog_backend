const env = process.env;

const config = {
  db: {
    host: env.DB_HOST || 'hattie.db.elephantsql.com',
    port: env.DB_PORT || '5432',
    user: env.DB_USER || 'clkjrcnk',
    password: env.DB_PASSWORD || 'xMXM1Q0lhUgaLHHutFG6FVnKSNKpWeDq',
    database: env.DB_NAME || 'clkjrcnk',
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;
