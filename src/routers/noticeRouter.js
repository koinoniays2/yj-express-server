import express from "express";
import { noticeDelete, noticeDetail, noticeList, noticeUpdate, noticeWrite } from "../controllers/noticeController";

const noticeRouter = express.Router(); // 라우터
// notice/ -> 리스트페이지
// notice/wirte -> 글쓰기페이지
// notice/{게시물아이디} -> 디테일페이지
// notice/{게시물아이디}/update -> 수정페이지
// notice/{게시물아이디}/delete -> 삭제페이지

// notice 경로에 대한 요청을 처리(라우팅 그룹화)
noticeRouter.get("", noticeList)
noticeRouter.post("/write", noticeWrite);
noticeRouter.get("/:id", noticeDetail);
noticeRouter.post("/:id/update", noticeUpdate);
noticeRouter.post("/:id/delete", noticeDelete);

export default noticeRouter;