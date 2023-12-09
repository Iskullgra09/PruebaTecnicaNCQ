const Pool = require("pg").Pool

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'pruebaTecnica',
    user: 'postgres',
    password: 'sa1234567890'
})

module.exports = pool;