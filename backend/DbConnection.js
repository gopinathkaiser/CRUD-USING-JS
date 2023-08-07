const { Pool } = require('pg');

const pool = new Pool ({
    user : 'postgres',
    database : 'Employee',
    password : 'divum123',
    port : 5432,
    host : 'localhost',
});

module.exports = {pool};