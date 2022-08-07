import Product from "../../../models/Products";
import connectdb from "../../../utils/connectMongo";

export default async function handler(req, res) {
    const { keyword } = req.body
    try {
        await connectdb();
        const products = await Product.find();
        const filterData = await products.filter(data => {
            return data.category == keyword || data.color == keyword || data.stone == keyword || data.style == keyword; 
        });
        res.status(202).json({ success: true, length: filterData.length, products: filterData });

    } catch (err) {
        res.json({ success: false, error: err })
    }
}