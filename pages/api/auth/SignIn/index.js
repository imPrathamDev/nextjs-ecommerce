import { SignIn } from "../../../../dbOperations/authOperations";
import rateLimit from "../../../../utils/rateLimit";

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

export default async function handler(req, res) {
  try {
    await limiter.check(res, 100, "CACHE_TOKEN");
    if (req.method == "POST") {
      const request = await SignIn(req.body?.email, req.body?.password);
      if (request.success) {
        return res.status(200).json(request);
      }
      return res.status(400).json(request);
    } else {
      return res
        .status(400)
        .json({ success: false, error: "This method is not allowed" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, error: "Limit exceeded" });
  }
}
