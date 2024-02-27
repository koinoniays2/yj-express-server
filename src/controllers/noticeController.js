import Notice from "../models/notice";

// 리스트
export const noticeList = async (req,res) => {
    try {
        const data = await Notice.find({}) // find로 데이터베이스의 데이터 불러와서 변수에 담기
        return res.send({ name: "list", data }); // 클라이언트에 send 해주기
    } catch(error) {
        console.log(error)
    }
};
// 글쓰기
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
        return res.send({result: true, data: data}); // 클라이언트가 요청한 것을 보냄
    }catch(error){
        console.log(error);
        return res.send({result: false});
    }
};
// 디테일(id로 찾을 수 있는 엔드포인트 생성)
export const noticeDetail = async (req,res) => {
    // const id = req.params.id;
     const {params: {id}} = req;
    try{
        const data = await Notice.findById(id);
        return res.send({name: "detail", data})
    }catch(error) {
        console.log(error);
    }
};
export const noticeUpdate = (req,res) => res.send({name: "update"});
export const noticeDelete = (req,res) => res.send({name: "delete"});