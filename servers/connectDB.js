const mysql = require('mysql2/promise');
// 讀取.env檔用
// require('dotenv/config.js');


// const DB_HOST = '127.0.0.1'
// const DB_DATABASE = 'travel_kh'
// const DB_USERNAME = 'root'
// const DB_PASSWORD = 'root'

// 資料庫連結資訊
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'via',
    connectionLimit: 10,
    waitForConnections: true,
    dateStrings: true
})

// 啟動時測試連線
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

// 輸出模組
module.exports = pool;