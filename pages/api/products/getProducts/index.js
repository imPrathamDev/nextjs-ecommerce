import Product from "../../../../models/Products";
import connectdb from "../../../../utils/connectMongo";

export default async function handler(req, res) {
  try {
    await connectdb();
    if (req.query.category) {
      let products;
      products = await Product.find({ category: req.query.category });
      if (products.length <= 1) {
        products = await Product.find().sort({ createdAt: -1 }).limit(8);
        res
          .status(200)
          .json({ success: true, length: products.length, products });
      }
      res
        .status(200)
        .json({ success: true, length: products.length, products });
    } else if (req.query.sort) {
      if (req.query.sort === "new") {
        const products = await Product.find().sort({ createdAt: -1 });
        res
          .status(200)
          .json({ success: true, length: products.length, products });
      }
    } else {
      const products = await Product.find();
      res
        .status(200)
        .json({ success: true, length: products.length, products });
    }
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
}
