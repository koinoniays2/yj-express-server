// const express = require("express");
import 'dotenv/config';
import "./db";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import appleRouter from './routers/appleRouter,';
import noticeRouter from './routers/noticeRouter';

// cors옵션이 허용되는 주소만 적어주기(app.use(cors(여기넣기));)
const corsOption = {
    origin: ["http://localhost:3000", "https://unrivaled-jelly-1ec6a1.netlify.app/"
  ],
};

const PORT = process.env.PORT; // 호스팅 했을때에는 호스팅 사이트의 환경변수를 불러오고(설정해줘야함) 로컬에선 .env에있는 변수를 불러온다.
const app = express();

app.use(express.json()); // 데이터를 json형식으로 주고받겠다
app.use(morgan("dev"));
app.use(cors(corsOption));

// 라우터
app.get("/", (req, res) => { res.send({ name: "root" }); });
app.use("/apple", appleRouter);
app.use("/notice", noticeRouter);
// apple/character
// apple/comics
// apple/creators

// 서버실행 부분
// const PORT = 4000; //create-react-app일경우 3000으로 열리기때문에 3000 -> 4000으로 수정 위에서 환경변수로 정의
app.listen(PORT, () => console.log(`🔶Server on : http://localhost:${PORT}`));