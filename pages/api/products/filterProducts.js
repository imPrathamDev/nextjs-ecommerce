import { filterProducts } from "../../../dbOperations/productOperations";

export default async function handler(req, res) {
  const { keyword } = req.body;
  try {
    res.status(200).json(await filterProducts(keyword));
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
}
