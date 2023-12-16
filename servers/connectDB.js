require('dotenv').config()
const mysql = require('mysql2/promise');

// database message
const pool = mysql.createPool({
    host: 'tcp://0.tcp.jp.ngrok.io:16217',
    user: 'root',
    password: 'asd620134',
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