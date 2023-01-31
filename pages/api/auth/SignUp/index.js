import { SignUp } from "../../../../dbOperations/authOperations";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { firstName, lastName, email, password } = req.body;
    const request = await SignUp(firstName, lastName, email, password);
    if (request.success) {
      return res.status(201).json(request);
    }
    return res.status(400).json(request);
  } else {
    return res.status(400).json({ success: false, error: "Invalid Request" });
  }
}
