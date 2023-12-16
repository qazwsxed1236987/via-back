const express = require("express")
const router = express.Router()

router.use(express.json())

const db = require("./connectDB.js")

//get data
router.route("/").post(async (req, res) => {
    const { name } = req.body
    const sql = `SELECT * 
                from memos
                WHERE names = ${name};`
    const datas = await db.query(sql)
    res.json(datas)
})

//add memos
router.route("/add").post(async (req, res) => {
    const date = new Date();
    date.setHours(date.getHours() + 8);
    const addDate = date.toISOString().slice(0, 16).replace('T', ' ');

    const { names, title, text, toemail, sendtime } = req.body

    const sql = `INSERT INTO memos 
    (names,title,text,settime,toemail,sendtime) VALUES
    ('${names}','${title}','${text}','${addDate}','${toemail}','${sendtime}');`
    const datas = await db.query(sql)

    res.json(datas)
})
//reset memo data 
router.route("/reset").post(async (req, res) => {
    const date = new Date();
    date.setHours(date.getHours() + 8);
    const resetDate = date.toISOString().slice(0, 16).replace('T', ' ');
    const { id, title, text, toemail, sendtime } = req.body

    const sql =
        `UPDATE memos SET 
        title = '${title}',
        text = '${text}',
        toemail = '${toemail}',
        sendtime = '${sendtime}',
        resettime ='${resetDate}'
        WHERE id = ${id};`
    const datas = await db.query(sql)
    res.json(datas)
})

//deleted momo
router.route("/deleted").post(async (req, res) => {
    const { id } = req.body
    const sql = `DELETE FROM memos
                WHERE id = ${id};`
    const datas = await db.query(sql)
    res.json(datas)
})

//memo completed check
router.route("/completed").post(async (req, res) => {
    const { id, toemail, sendtime, complete } = req.body

    const sql =
        `UPDATE memos SET 
        complete = '${complete}',
        toemail = '${toemail}',
        sendtime = '${sendtime}'
        WHERE id = ${id};`
    const datas = await db.query(sql)
    res.json(datas)
})

module.exports = router