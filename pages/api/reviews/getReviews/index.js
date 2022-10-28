import connectdb from "../../../../utils/connectMongo";
import Review from "../../../../models/Reviews";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { product } = req.body
        await connectdb();
        const reviews = await Review.find({ product }).populate('user', 'firstName lastName');
        res.json({ success: true, reviews })
    } else {
        res.json({ success: false, error: 'Invalid Request' })
    }
}