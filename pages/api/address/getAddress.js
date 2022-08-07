import connectdb from "../../../utils/connectMongo";
import Address from "../../../models/Address";
import User from "../../../models/Users";

export default async function handler(req, res){
    if(req.method === 'POST'){
        try {
            const { userId } = req.body;
            await connectdb();
            const countUser = await User.countDocuments({ _id: userId });
            console.log(countUser)
            if(countUser === 1){
            const address = await Address.find({ userId });
            res.status(200).json({ success: true, address })
            } else {
                res.json({ success: false, error: 'Invalid Request' });   
            }
        } catch (error) {
            res.json({ success: false, error: error.message }); 
        }
    } else {
        res.json({ success: false, error: 'Invalid Request' });
    }
}