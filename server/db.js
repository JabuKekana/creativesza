const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "AccessGranted@P",
    host: "localhost",
    port: 5432,
    database: "creativesza"
});

module.exports = pool;