import Product from "../../../../models/Products";
import connectdb from "../../../../utils/connectMongo";

export default async function handler(req, res){
    const idsList = req.body.ids;
  try {
      console.log('CONNECTING TO DB');
      await connectdb();
      console.log('CONNECTED TO DB');

      console.log('FETCHING DATA FROM DB');
      const products = await Product.find({
        '_id': {
            $in: idsList,
        }
      });
      console.log('FETCHED DATA FROM DB');

      res.status(202).json({ success: true, length: products.length, products });

  } catch (err) {
    res.json({ success: false, error: err })
  }
}