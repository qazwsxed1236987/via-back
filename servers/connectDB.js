require('dotenv').config()
const mysql = require('mysql2/promise');

// database message
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 10,
    waitForConnections: true,
    dateStrings: true
})

// test connect
pool
    .getConnection()
    .then((connection) => {
        console.log('Database Connected Successfully')
        connection.release()
    })
    .catch((error) => {
        console.log('Database Connection Failed'.bgRed)
        console.log(error)
    })

module.exports = pool;