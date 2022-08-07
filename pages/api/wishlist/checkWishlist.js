import connectdb from "../../../utils/connectMongo";
import Wishlist from "../../../models/Wishlist";

export default async function handler(req, res){
    const { userId, productId } = req.body;
    console.log('userId =>', userId)
    console.log('productId =>', productId)
    if(req.method === 'POST'){
        await connectdb();
        const isWishlist = await Wishlist.countDocuments({ userId, productId });
        if(isWishlist > 0){
            res.json({ sucess: true })
        } else {
            res.json({ sucess: false })
        }
    } else {
        res.json({ sucess: false })
    }
}