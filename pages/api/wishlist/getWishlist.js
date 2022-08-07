import connectdb from "../../../utils/connectMongo";
import Wishlist from "../../../models/Wishlist";
import User from "../../../models/Users";

export default async function handler(req, res){
    if(req.method === 'POST'){
        try {
            const { userId } = req.body;
            await connectdb();
            const countUser = await User.countDocuments({ _id: userId });
            if(countUser == 1){
            const wishlist = await Wishlist.find({ userId }).populate('productId');
            res.status(200).json({ success: true, products: wishlist })
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