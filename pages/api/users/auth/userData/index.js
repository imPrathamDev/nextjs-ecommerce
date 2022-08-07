import { verify } from "jsonwebtoken";
export default function handler(req, res){

    try {
        const { cookies } =  req;
        console.log(cookies);
        const userToken  = cookies.userJWT;
        const userData = verify(userToken, process.env.JWT_SECRET_KEY);
        if(!userToken){
            res.json({ success: false, error: 'Invalid Token' })
        } else {
            res.status(200).json({ success: true, data: userData });
        }    
    } catch (error) {
        res.json({ success: false, error: error.message })
    }

}