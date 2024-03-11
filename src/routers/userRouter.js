import express from "express"; // 라우터를 쓰기위해
import { memberRegister } from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/register", memberRegister);
export default userRouter;