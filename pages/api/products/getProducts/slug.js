import connectdb from "../../../../utils/connectMongo";
import Product from "../../../../models/Products";
import { getProduct } from "../../../../dbOperations/productOperations";

export default async function handler(req, res) {
  const { slug } = req.body;
  const product = await getProduct(slug);
  if (product.success) {
    return res.status(200).json(product);
  }
  return res.status(400).json(product);
}
