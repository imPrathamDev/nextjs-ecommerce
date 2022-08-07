import connectdb from "../../../utils/connectMongo";
import Order from "../../../models/Orders";

export default async function handler(req, res){
    try {
        await connectdb();
        const order = await Order.create(req.body);
        res.status(200).json({ success: true, data: order });        
    } catch (error) {
        res.json({ success: false, error: error.message }); 
    }
}