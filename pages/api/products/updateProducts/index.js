import connectdb from "../../../../utils/connectMongo";
import Product from "../../../../models/Products";

export default async function handler(req, res){
    try {
        if(req.method == 'POST'){
            console.log('CONNECTING TO DATABASE');
            await connectdb();
            console.log('CONNECTED TO DATABASE');
            console.log('UPDATING DATA');
            const products = await Product.findByIdAndUpdate(req.body._id, req.body);
            console.log('UPDATED DATA');
            res.json({ success: true, message: 'Product successfully updated', products });
        } else {
            res.json({ success: false, error: 'This method is not allowed' })
        }
    } catch (error) {
        
    }
}