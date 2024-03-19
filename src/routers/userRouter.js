import express from "express"; // 라우터를 쓰기위해
import { memberRegister, memberLogin, loginSuccess, logout, kakaoLogin } from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/register", memberRegister);
userRouter.post("/login", memberLogin)
userRouter.get("/login-success", loginSuccess);
userRouter.post("/logout", logout);
userRouter.get("/socials/kakao", kakaoLogin);
export default userRouter;