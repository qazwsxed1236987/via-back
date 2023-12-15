const express = require("express");
const router = express.Router();

router.use(express.json());

const db = require("./connectDB.js");

//get data
// 差會員
router.route("/").get(async (req, res) => {
    const sql = `SELECT * 
                from memos
                WHERE names = 'allen';`;
    const datas = await db.query(sql);
    res.json(datas);
});


//新增資料  差指定時間寄出sendtime+會員names
router.route("/add").post(async (req, res) => {

    // 此為編輯的當下時間(尚未轉時區)
    let nowDate = new Date().toISOString().slice(0, 16).replace("T", " ");
    const { names, title, text, toemail, sendtime } = req.body

    const sql = `INSERT INTO memos 
    (names,Title,Text,settime,toemail,sendtime) VALUES
    ('${names}','${title}','${text}','${nowDate}','${toemail}','${sendtime}');`
    const datas = await db.query(sql);

    res.json(datas);
});
//修改資料 
router.route("/reset").post(async (req, res) => {
    // 此為編輯的修改時間(尚未轉時區)
    let nowDate = new Date().toISOString().slice(0, 16).replace("T", " ");
    const { id, title, text, toemail, sendtime } = req.body
    const sql =
        `UPDATE memos SET 
        title = '${title}',
        text = '${text}',
        toemail = '${toemail}',
        sendtime = '${sendtime}',
        resettime ='${nowDate}'
        WHERE id = ${id};`
    const datas = await db.query(sql)
    res.json(datas)
});

//刪除
router.route("/deleted").post(async (req, res) => {
    const { id } = req.body
    console.log(id);
    const sql = `DELETE FROM memos
                WHERE id = ${id};`
    const datas = await db.query(sql)
    res.json(datas)

});
//完成確認
router.route("/completed").post(async (req, res) => {
    console.log(req.body);
    const { id, toemail, sendtime, complete } = req.body
    const sql =
        `UPDATE memos SET 
        complete = '${complete}',
        toemail = '${toemail}',
        sendtime = '${sendtime}'
        WHERE id = ${id};`
    const datas = await db.query(sql)
    res.json(datas)
});






module.exports = router