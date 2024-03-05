import Notice from "../models/notice";

// 리스트
export const noticeList = async (req,res) => {
    const OFFSET = 0;
    const LIMIT = 10;
    try {
        const data = await Notice.find({}).sort({createdAt: -1}).limit(LIMIT).skip(OFFSET); // find로 데이터베이스의 데이터 불러와서 변수에 담기
        // sort 최신글 위로, limit(10): 리미트걸기, skip(2): 글 생략 => 페이지네이션 가능
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
            createdAt: new Date(),
            // createdAt: new Date(Date.now() + (1000 * 60 * 60 * 9)), //Date.now() : 표준시 (보통 프론트에서 변경함)
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
export const noticeUpdate = async (req, res) => {
    console.log(req);
    // console.log(res.body);
    // console.log(req.params);
    // const { title, description, writer } = req.body;
    // const {
    //   params: { id },
    // } = req;
    const {
      body: { title, description, writer },
      params: { id },
    } = req;
  
    try {
      const data = await Notice.findByIdAndUpdate(id, {
        title,
        description,
        writer,
      });
      res.send({ result: true, data });
    } catch (error) {
      console.log(error);
    }
  };
export const noticeDelete = (req,res) => res.send({name: "delete"});