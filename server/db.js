const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "AccessGranted@P",
    host: "192.168.7.141",
    port: 5432,
    database: "creativesza"
});

module.exports = pool;