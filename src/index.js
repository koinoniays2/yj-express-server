// const express = require("express");
import express from "express";
const app = express();

// 라우팅 부분
app.get("/", (req, res)=>{
    res.send("root diretory");
})
app.get("/apple", (req, res)=>{
    res.send("Hello World apple");
})

const PORT = 3000;
app.listen(PORT, ()=> console.log(`🔶Server on : http://localhost:${PORT}`));