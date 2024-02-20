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
        console.log(req.body);
        const {title, description, writer} = req.body; // req.body에서 가져온다.
        const data = await Notice.create({ // 데이터베이스에 json 형식으로 create
            title,
            description,
            createdAt: Date.now(),
            writer
        })
        return res.send({result: true, data});   
    }catch(error){
        console.log(error);
        return res.send({result: false});
    }
};
export const noticeDetail = (req,res) => res.send({name: "detail"});
export const noticeUpdate = (req,res) => res.send({name: "update"});
export const noticeDelete = (req,res) => res.send({name: "delete"});