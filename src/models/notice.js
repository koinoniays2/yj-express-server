import mongoose from "mongoose";
// 스키마 생성
const noticeSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: Date,
    writer: String
})

// mongoose에서 사용할 수 있는 모델로 만들기
const Notice = mongoose.model("Notice", noticeSchema); //이름을 Notice로 지정한것
export default Notice; // 외부에서 호출