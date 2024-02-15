// const express = require("express");
import 'dotenv/config'
import express from "express";
import morgan from "morgan";
import cors from "cors";

// cors옵션이 허용되는 주소만 적어주기(app.use(cors(여기넣기));)
const corsOption = {
    origin: ["http://localhost:5173", "http://localhost:5172"]
};

const PORT = process.env.PORT; // 호스팅 했을때에는 호스팅 사이트의 환경변수를 불러오고(설정해줘야함) 로컬에선 .env에있는 변수를 불러온다.
const app = express();

app.use(morgan("dev"));
app.use(cors(corsOption));

// 라우팅 부분
app.get("/", (req, res) => { res.send({ name: "root" }); });
app.get("/apple", (req, res) => { res.send({ name: "apple" }); });

// 서버실행 부분
// const PORT = 4000; //create-react-app일경우 3000으로 열리기때문에 3000 -> 4000으로 수정 위에서 환경변수로 정의
app.listen(PORT, () => console.log(`🔶Server on : http://localhost:${PORT}`));