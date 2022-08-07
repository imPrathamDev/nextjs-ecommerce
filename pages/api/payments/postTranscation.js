import connectdb from "../../../utils/connectMongo";
import Order from "../../../models/Orders";
import Razorpay from 'razorpay'
import crypto from 'crypto'
export default async function handler(req, res) {
    await connectdb();
    const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY)
                                  .update(body.toString())
                                  .digest('hex');
    if(expectedSignature === razorpay_signature){
    const order = await Order.findOneAndUpdate({ orderId: razorpay_order_id }, {
        razorpay: {
            razorpayPaymentId: razorpay_payment_id,
            razorpayOrderId: razorpay_order_id,
            razorpaySignature: razorpay_signature
        }
    })
    res.redirect(307, `/account/orders/${order._id}?refresh=true`)
    } else {
        
    }
}