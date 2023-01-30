import { getProducts } from "../../../../dbOperations/productOperations";

export default async function handler(req, res) {
  try {
    return res.status(200).json(await getProducts(req.body));
  } catch (err) {
    return res.status(200).json({ success: false, error: err.message });
  }
}
