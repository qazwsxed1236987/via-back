require('dotenv').config()
const mysql = require('mysql2/promise');

// database message
const pool = mysql.createPool({
    host: '192.168.20.189',
    user: 'qazwsxedtest',
    password: 'test',
    database: 'via',
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