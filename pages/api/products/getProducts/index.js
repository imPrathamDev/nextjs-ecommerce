import Product from "../../../../models/Products";
import connectdb from "../../../../utils/connectMongo";

const DEFAULT_LIMIT = 8;

export default async function handler(req, res) {
  try {
    await connectdb();
    const { category, sort, limit } = req.query;
    if (category) {
      let products;
      products = await Product.find({ category }).limit(
        limit ? limit : DEFAULT_LIMIT
      );
      if (products.length <= 1) {
        products = await Product.find()
          .sort({ createdAt: -1 })
          .limit(limit ? limit : DEFAULT_LIMIT);
        res.status(200).json({
          success: true,
          length: products.length,
          products,
          testCode: 1,
        });
      }
      res.status(200).json({
        success: true,
        length: products.length,
        products,
        testCode: 2,
      });
    } else if (sort) {
      if (req.query.sort === "new") {
        const products = await Product.find()
          .sort({ createdAt: -1 })
          .limit(limit ? limit : DEFAULT_LIMIT);
        res
          .status(200)
          .json({ success: true, length: products.length, products });
      }
    } else {
      const products = await Product.find().limit(
        limit ? limit : DEFAULT_LIMIT
      );
      res
        .status(200)
        .json({ success: true, length: products.length, products });
    }
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
}
