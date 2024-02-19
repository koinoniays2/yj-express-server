import Notice from "../models/notice";

export const noticeList = async (req,res) => {
    try {
        // await Notice.find({}) // find로 불러오기(연결)
        return res.send({ name: "list" });
    } catch(error) {
        console.log(error)
    }
};
export const noticeWrite = async (req,res) => {
    try{
        const {title, description, writer} = req.body;
        const data = await Notice.create({
            title,
            description,
            createdAt: Date.now(),
            writer
        })
        return res.send({result: "ok", data});   
    }catch(error){
        console.log(error);
    }
};
export const noticeDetail = (req,res) => res.send({name: "detail"});
export const noticeUpdate = (req,res) => res.send({name: "update"});
export const noticeDelete = (req,res) => res.send({name: "delete"});