const Pool = require("pg").Pool;

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "saigon",
    port: 5432,
    database: "money"
});

module.exports = pool;