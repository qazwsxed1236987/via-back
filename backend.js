// 終端機輸入 node backend.js 開啟後端



const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require("cors")
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
// app.use(cors())

app.get('/test', (req, res) => {
    res.json({
        message: "test work!!"
    })
})
const todos = require("./servers/todoserver.js")
const member = require("./servers/memberserver.js")


app.use("/member", member); //member use
app.use("/todos", todos); //todos use

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
