// const express = require("express");
import 'dotenv/config';
import "./db";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import appleRouter from './routers/appleRouter,';
import noticeRouter from './routers/noticeRouter';
import userRouter from './routers/userRouter';
import session from "express-session";
import MongoStore from 'connect-mongo';

// cors옵션이 허용되는 주소만 적어주기(app.use(cors(여기넣기));)
const corsOption = {
    origin: ["http://localhost:3000", "https://unrivaled-jelly-1ec6a1.netlify.app"
  ],
  methods: ["GET", "POST"],
  credentials: true, // 세션을 쿠키에 저장하기위해(클라이언트의 api요청에서 credentials: "include"와 함께 이루어져야함)
};

const PORT = process.env.PORT; // 호스팅 했을때에는 호스팅 사이트의 환경변수를 불러오고(설정해줘야함) 로컬에선 .env에있는 변수를 불러온다.
const app = express();

app.use(express.json()); // 데이터를 json형식으로 주고받겠다
app.use(morgan("dev"));
app.use(cors(corsOption));
// 세션설정
app.use(session({
  name: "Session ID", // 세션 쿠키 이름
  secret: "secret", // 세션을 서명하기 위한 비밀 키
  resave: false, // 세션이 변경되지 않아도 항상 저장하도록 설정 false
  saveUninitialized: false, // 초기화되지 않은 세션을 저장소에 저장하지 않도록 설정
  cookie: { // 세션 쿠키의 속성을 설정
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true, // js에서 사용이 안되게 하는 옵션
    secure: false, // https를 통해서만 세션 쿠키를 전송하도록 설정
  },
  store: MongoStore.create({ // 서버가 꺼지면 메모리 위에 떠있는 세션이 사라지는것을 방지하기위해 db에 저장
    mongoUrl: process.env.DB_URL + "/yj-express",
  })
})); 

// 라우터
app.get("/", (req, res) => { res.send({ name: "root" }); });
app.use("/apple", appleRouter);
app.use("/notice", noticeRouter);
app.use("/users", userRouter);
// apple/character
// apple/comics
// apple/creators

// 서버실행 부분
// const PORT = 4000; //create-react-app일경우 3000으로 열리기때문에 3000 -> 4000으로 수정 위에서 환경변수로 정의
app.listen(PORT, () => console.log(`🔶Server on : http://localhost:${PORT}`));