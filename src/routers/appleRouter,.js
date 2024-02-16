import express from "express";
const appleRouter = express.Router(); // 라우터

appleRouter.get("/character", (req,res) => res.send({name: "character"}));
appleRouter.get("/comics", (req,res) => res.send({name: "comics"}));
appleRouter.get("/creators", (req,res) => res.send({name: "creators"}));

export default appleRouter;