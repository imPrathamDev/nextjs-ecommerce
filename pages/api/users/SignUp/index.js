import connectdb from "../../../../utils/connectMongo";
import User from "../../../../models/Users";
const CryptoJS = require("crypto-js");


export default async function handler(req, res) {

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


    try {
        if (req.method == 'POST') {
            if (validateEmail(req.body.email.trim())) {

                const { firstName, lastName, email, password }  = req.body;

                console.log('CONNECTING TO DB');
                await connectdb();
                console.log('CONNECTED TO DB');

                console.log('CREATING NEW USER')
                const newUser = await User.create({ firstName, lastName, email: email.trim().toLowerCase(), password: CryptoJS.AES.encrypt(password, process.env.CRYPTO_JS_SECRET_KEY).toString(), avatar: `https://avatars.dicebear.com/api/micah/${firstName.trim()}.svg` });
                console.log('NEW USER CREATED');
                res.status(200).json({ success: true, newUser });
            } else {
                res.json({ success: false, error: 'Invalid email' })
            }

        } else {
            res.json({ success: false, error: 'This method is not allowed' });
        }
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
}