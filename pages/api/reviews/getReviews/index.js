import { getReviews } from "../../../../dbOperations/reviewOperations";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { product } = req.body;
    const review = await getReviews(product);
    if (review.success) {
      return res.status(200).json(review);
    }
    return res.status(400).json(review);
  } else {
    res.json({ success: false, error: "Invalid Request" });
  }
}
