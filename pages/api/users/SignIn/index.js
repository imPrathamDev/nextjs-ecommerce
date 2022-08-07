import connectdb from "../../../../utils/connectMongo";
import User from "../../../../models/Users";
const CryptoJS = require('crypto-js')
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';

/*
*function for checking is email address is correct or no
*
*it will simply return true or false
*/
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export default async function handler(req, res) {
    try {
        if (req.method == 'POST') {
            if (validateEmail(req.body.email)) {
                console.log('CONNECTING TO DB');
                await connectdb();
                console.log('CONNECTED TO DB');

                const checkUser = await User.findOne({ email: req.body.email });
                if (checkUser) {
                    const bytes = CryptoJS.AES.decrypt(checkUser.password, process.env.CRYPTO_JS_SECRET_KEY);
                    const decryptPass = bytes.toString(CryptoJS.enc.Utf8);
                    if (decryptPass == req.body.password) {
                        const token = sign(
                    {
                    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, id: checkUser._id, firstName: checkUser.firstName, lastName: checkUser.lastName, email: checkUser.email, avatar: checkUser.avatar, type: checkUser.type 
                    }, process.env.JWT_SECRET_KEY);
                            if (token) {
                                //serializing cookie data
                                const serialized = await serialize("userJWT", token, {
                                    httpOnly: true,
                                    secure: process.env.NODE_ENV !== 'development',
                                    sameSite: 'strict',
                                    maxAge: 60 * 60 * 24 * 30,
                                    path: '/'
                                });
                                //setting Header
                                res.setHeader('Set-Cookie', serialized);
                                console.log(token);
                                res.json({ success: true, message: 'User Successfully Login', token });
                            } else {
                                res.json({ success: false, error: "Don't know what happened" });
                            }
                    } else {
                        res.json({ success: false, error: 'Invalid Password' })
                    }
                } else {
                    res.json({ success: false, error: 'No User Found' })
                }
            } else {
                res.json({ success: false, error: 'Invalid Email' })
            }
        } else {
            res.json({ success: false, error: 'This method is not allowed' });
        }
    } catch (error) {
        res.json({ success: false, error: error.message })
    }
}