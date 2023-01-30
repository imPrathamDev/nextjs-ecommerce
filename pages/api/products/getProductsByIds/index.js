import Product from "../../../../models/Products";
import connectdb from "../../../../utils/connectMongo";

export default async function handler(req, res) {
  if (req.body.ids) {
    const idsList = req.body.ids;
    try {
      await connectdb();
      const products = await Product.find({
        _id: {
          $in: idsList,
        },
      });

      return res
        .status(200)
        .json({ success: true, length: products.length, products });
    } catch (err) {
      return res.status(400).json({ success: false, error: err });
    }
  }
  return res.status(400).json({ success: false, error: "Empty IDs" });
}
