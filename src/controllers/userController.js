import User from "../models/user";
import bcrypt from "bcrypt";

// 회원가입
export const memberRegister = async (req, res) => {
    try{
        // const data = req.body;
        // console.log(data);
        const {body: {username, email, password}} = req;

        // 데이터베이스안에 요청받은 username과 email이 존재하는지(중복확인)
        const exist = await User.exists({ $or: [ {username}, {email} ] });
        // console.log(exist);
        if(exist) { // 중복시 데이터베이스에 저장하지않고 프론트로 보냄
            return res.send({ result:false, 
                message: "이미 존재하는 아이디입니다." });
        }

        // 패스워드 암호화(암호화할 비밀번호, 암호화횟수, )
        const hashedPassword = bcrypt.hashSync(password, 5);
        console.log("password : " + hashedPassword);

        const data = User.create({
            username,
            email,
            password : hashedPassword,
            createdAt: new Date()
        })
        return res.send({ result: true, data });
    }catch(error){
        console.log(error);
        return res.send({result: false})
    }
}
// 로그인
export const memberLogin = async (req, res) => {
    // 데이터 가져오기
    const { body: { username, password } } = req;

    // 아이디 중복체크(findOne는 데이터를 다 불러오고 exists는 있는지 없는지만 확인)
    const user = await User.findOne( { username } );
    if(!user) {
        return res.send({result:false, message:"해당하는 유저가 없습니다."});
    }

    // bcrypt를 사용자가 입력한 패스워드와 DB에 있는 패스워드 확인(암호화 된 패스워드 확인 compareSync)
    const ok = bcrypt.compareSync(password, user.password); // (넘어온 패스워드, 데이터베이스에 저장된 패스워드)
    console.log(ok);
    if(!ok) {
        return res.send({result:false, message:"패스워드가 다릅니다."});
    }

    // 패스워드가 맞으면 로그인
    if(ok) {
        // session 저장
        req.session.save(() => { // 세션 저장
            req.session.user = { // 세션 객체 내에서 데이터를 식별하기 위한 이름 : user
                username: user.username,
                email: user.email,
            };
            const data = req.session;
            console.log(data); // user: { username: 'admin', email: 'admin@admin.com' }
            res.send({result:true, data:data});
        })
    }
}

// 로그인 성공 시
export const loginSuccess = async (req, res) => {
    try{
        if(req.session.user){
            res.send({result: true, user: req.session.user, isLogin: true});
        }else {
            res.send({result: true, isLogin: false});
        }
    }catch(error){
        console.log(error);
    }
}

// 로그아웃
export const logout = async (req, res) => {
    try{
        req.session.destroy(() => {
            res.send({result: true, message: "로그아웃 성공"});
        });
    }catch(error){
        console.log(error);
    }
}