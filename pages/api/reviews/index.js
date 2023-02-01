import { getToken } from "next-auth/jwt";
import { addReview } from "../../../dbOperations/reviewOperations";

const secret = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method == "POST") {
    const token = await getToken({ req, secret });
    if (token) {
      const request = await addReview(
        req.body?.product,
        token._id,
        req.body?.rating,
        req.body?.review,
        req.body?.heading
      );
      if (request.success) {
        return res.status(201).json(request);
      }
      return res.status(400).json({ success: false, error: request.error });
    }
    return res.status(402).json({ success: false, error: "Unauthrized" });
  }
  return res.status(400).json({ success: false, error: "Invalid Request" });
}
