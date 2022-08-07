import connectdb from "../../../../utils/connectMongo";
import Product from "../../../../models/Products";

export default async function handler(req, res){
    try {

    const data = JSON.parse(req.body)
    const slug = data.slug
    console.log('new slug', data)
    console.log('CONNECTING TO DB');
    await connectdb();
    console.log('CONNECTED TO DB');

    console.log('FETCHING DATA BT SLUG')
    const exists = await Product.exists({ slug: slug });
    console.log('FETCHED DATA BY SLUG');
    if(exists){
        const product = await Product.find({ slug: slug });
        res.status(202).json({ success: true, product });        
    } else {
        res.json({ success: false, error: 'Not Exists' });
    }
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
}