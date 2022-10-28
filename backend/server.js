const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

// 서버 생성
const app = express();

// json 파싱 미들웨어
app.use(bodyParser.json());

// 리스트 가져오기 API
app.get("/api/values", (req, res) => {
  db.pool.query("SELECT * FROM lists", (err, results) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.json(results);
    }
  });
});

// 리스트 아이템 추가 API
app.post("/api/value", (req, res) => {
  db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`, (err) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.json({ success: true, value: req.body.value });
    }
  });
});

// 서버 오픈
app.listen(5000, () => {
  console.log("server open!");
});
