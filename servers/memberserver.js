const express = require("express")
const router = express.Router()

router.use(express.json())

const db = require("./connectDB.js")

//regsiter data
router.route("/regsiter").post(async (req, res) => {
    const { Names, Email, Password } = req.body

    const sql = `INSERT INTO member 
    (name,password,email) VALUES
    ('${Names}','${Password}','${Email}');`

    const data = await db.query(sql)
    res.json(data)
})
//login check
router.route("/login").post(async (req, res) => {
    const { Email, Password } = req.body

    const sql = `SELECT name, email
                FROM member
                WHERE password = '${Password}' AND email = '${Email}';`
    const data = await db.query(sql)
    res.json(data)
})

module.exports = router