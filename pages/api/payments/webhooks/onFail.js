import Razorpay from 'razorpay';
import connectdb from '../../../../utils/connectMongo';
import Order from '../../../../models/Orders';

export default async function handler(req, res){
    const check = Razorpay.validateWebhookSignature(JSON.stringify(req.body), req.headers['x-razorpay-signature'], process.env.RAZORPAY_FAILED_SECRET_KEY);
    if(check){
        const paymentInfo = req.body.payload.payment.entity;
        const status = req.body.payload.payment.entity.status;
        const orderId = req.body.payload.payment.entity.order_id;
        console.log('data =>',paymentInfo, status, orderId)
        await connectdb();
        if(status === 'failed'){
            await Order.findOneAndUpdate({ orderId }, {
                txnStatus: 'Failed',
                paymentInfo: JSON.stringify(paymentInfo)
            })
        }
    }
    res.json({ success: true })
}