import connectdb from "../../../utils/connectMongo";
import Wishlist from "../../../models/Wishlist";
import User from "../../../models/Users";
import Product from "../../../models/Products";
import { getToken } from "next-auth/jwt";

const secret = process.env.JWT_SECRET;

export default async function handler(req, res) {
  const token = await getToken({ req, secret });
  if (token) {
    try {
      await connectdb();
      const countUser = await User.countDocuments({ _id: token._id });
      if (req.method === "GET") {
        if (countUser == 1) {
          const wishlist = await Wishlist.find({ userId: token._id }).populate(
            "productId"
          );
          return res.status(200).json({ success: true, products: wishlist });
        } else {
          return res
            .status(401)
            .json({ success: false, error: "Invalid Request" });
        }
      } else if (req.method === "POST") {
        const { productId } = req.body;
        const countProduct = await Product.countDocuments({ _id: productId });
        if (countUser > 0) {
          if (countProduct > 0) {
            const wishlist = await Wishlist.create({
              userId: token._id,
              productId,
            });
            return res.status(200).json({ success: true, data: wishlist });
          } else {
            return res
              .status(401)
              .json({ success: false, error: "Invalid Request" });
          }
        } else {
          return res
            .status(401)
            .json({ success: false, error: "Invalid Request" });
        }
      } else if (req.method === "DELETE") {
        const { productId } = req.body;
        const countProduct = await Product.countDocuments({ _id: productId });
        if (countUser > 0) {
          if (countProduct > 0) {
            await Wishlist.findOneAndDelete({
              userId: token._id,
              productId,
            });
            return res.status(200).json({ success: true });
          } else {
            return res
              .status(401)
              .json({ success: false, error: "Invalid Request" });
          }
        } else {
          return res
            .status(401)
            .json({ success: false, error: "Invalid Request" });
        }
      }
    } catch (error) {
      return res.status(401).json({ success: false, error: error.message });
    }
  } else {
    return res.status(401).json({ success: false, error: "Invalid Request" });
  }
  return res.status(401).json({ success: false, error: "Invalid Request" });
}
