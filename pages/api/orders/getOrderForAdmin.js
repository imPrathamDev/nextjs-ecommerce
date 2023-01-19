import connectdb from "../../../utils/connectMongo";
import Order from "../../../models/Orders";

export default async function (req, res) {
  if (process.env.ADMIN_SECRET_KEY === req.headers["x-admin-key"]) {
    try {
      const { orderID } = req.body;
      await connectdb();
      const orderData = await Order.findById(orderID)
        .populate("products._id")
        .populate("discountCodeId");
      delete orderData["razorpay"];
      return res.json({ success: true, order: orderData });
    } catch (error) {
      return res.json({ success: false, error: error.message });
    }
  }
  return res.json({ success: false });
}
