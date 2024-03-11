import User from "../models/user";

export const memberRegister = async (req, res) => {
    try{
        // const data = req.body;
        // console.log(data);
        const {body: {username, email, password}} = req;
        const data = User.create({
            username,
            email,
            password,
            createdAt: new Date()
        })
        return res.send({ result: true, data });
    }catch(error){
        console.log(error);
        return res.send({result: false})
    }
}