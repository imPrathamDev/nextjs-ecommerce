import connectdb from "../../../utils/connectMongo";
import Wishlist from "../../../models/Wishlist";
import User from "../../../models/Users";
import Product from '../../../models/Products'

export default async function handler(req, res) {
    const { userId, productId } = req.body;
    if (req.method === 'DELETE') {
        try {
            await connectdb();
            const countUser = await User.countDocuments({ _id: userId });
            const countProduct = await Product.countDocuments({ _id: productId });
            if (countUser > 0) {
                if (countProduct > 0) {
                    const wishlist = await Wishlist.findOneAndDelete({ userId, productId });
                    res.status(200).json({ success: true });
                } else {
                    res.json({ success: false, error: 'Invalid Request' });
                }
            } else {
                res.json({ success: false, error: 'Invalid Request' });
            }

        } catch (error) {
            res.json({ success: false, error: error.message });
        }
    } else {
        res.json({ success: false, error: 'Invalid Request Method' });
    }
}