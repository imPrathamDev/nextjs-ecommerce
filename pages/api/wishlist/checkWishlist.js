import connectdb from "../../../utils/connectMongo";
import Wishlist from "../../../models/Wishlist";
import { getToken } from "next-auth/jwt";

const secret = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const token = await getToken({ req, secret });
    if (token) {
      const { productId } = req.body;
      if (productId) {
        await connectdb();
        const isWishlist = await Wishlist.countDocuments({
          userId: token._id,
          productId,
        });
        if (isWishlist > 0) {
          res.json({ success: true });
        } else {
          res.json({ success: false });
        }
      } else {
        res.json({ success: false });
      }
    } else {
      res.json({ success: false });
    }
  } else {
    res.json({ success: false });
  }
}
