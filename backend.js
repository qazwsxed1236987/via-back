// cmd node backend.js 開啟後端

const express = require('express')
const app = express()

require('dotenv').config()

const port = process.env.PORT || 5001

const cors = require("cors")
app.use(
    cors({
        origin: ['https://via-front.onrender.com'],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.get('/test', (req, res) => res.json({ answer: 42 }));
const todos = require("./servers/todoserver.js")
const member = require("./servers/memberserver.js")

app.use("/member", member); //member use
app.use("/todos", todos); //todos use

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
