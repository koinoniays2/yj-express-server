// 몽고DB 연결 파일
import mongoose from "mongoose";
mongoose.connect(`${process.env.DB_URL}/yj-express`);

const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("Connected on DB"));
