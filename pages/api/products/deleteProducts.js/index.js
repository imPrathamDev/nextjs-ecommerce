import connectdb from "../../../../utils/connectMongo";
import Product from "../../../../models/Products";

export default async function handler(req, res){
            try {
            if(req.method == 'DELETE'){
                console.log('CONNECTING TO DB');
                await connectdb();
                console.log('CONNECTED TO DB');
            
                console.log('DELETING DATA');
                const deleteProduct = await Product.findOneAndDelete(req.body.id);
                console.log('DELETED DATA');
                res.json({ success: true, message: 'Product Deleted Successfully' });
            } else {
                res.json({ success: false, error: 'This method is not allowed' });
            }
            } catch (error) {
                res.json({ success: false, error });
            }
}