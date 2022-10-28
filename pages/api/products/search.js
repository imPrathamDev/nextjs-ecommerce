import connectdb from '../../../utils/connectMongo'
import Product from '../../../models/Products'

export default async function handler(req, res){
    await connectdb();
    const data = await Product.find({})
    const filterProducts = await data.filter(product => {
        return product?.title.toLowerCase().includes(req.query.q.toLowerCase()) || product?.desc.toLowerCase().includes(req.query.q.toLowerCase()) || product?.category.toLowerCase().includes(req.query.q.toLowerCase()) || product?.stone.toLowerCase().includes(req.query.q.toLowerCase()) || product?.style.toLowerCase().includes(req.query.q.toLowerCase()) || product?.color.toLowerCase().includes(req.query.q.toLowerCase()) || product?.tags.indexOf(req.query.q.toLowerCase()) > -1; 
    });
    res.json({ success: true, length: filterProducts.length, data: filterProducts })    
}