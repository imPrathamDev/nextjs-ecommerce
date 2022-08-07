import Razorpay from 'razorpay';
import connectdb from '../../../../utils/connectMongo';
import Order from '../../../../models/Orders';
import Product from '../../../../models/Products';

export default async function handler(req, res) {
    const secret = '12345678';
    console.log('REQUEST BODY=>', req.body);
    const paymentInfo = req.body.payload.payment.entity;
    const status = req.body.payload.payment.entity.status;
    const orderId = req.body.payload.payment.entity.order_id;
    const verified = Razorpay.validateWebhookSignature(JSON.stringify(req.body), req.headers['x-razorpay-signature'], secret);
    if (verified) {
        await connectdb();
        if (status === 'captured') {
            const data = await Order.findOneAndUpdate({ orderId }, {
                txnStatus: 'Paid',
                paymentInfo: JSON.stringify(paymentInfo)
            });
            // let tempIds = [];
            // for (let num = 0; num <= data.products.length; num++) {
            //     tempIds.push(data.products?.[num]?._id);
            // }
            const products = data?.products
            for(let i = 0; i < products.length; i++){
                 await Product.findByIdAndUpdate(products[i]?._id, { $inc: { "availableQty": - products[i].qty } })
            }
        } else {
            await Order.findOneAndUpdate({ orderId }, {
                txnStatus: 'Failed',
                paymentInfo: JSON.stringify(paymentInfo)
            })
        }
    } else {
        console.log('Error')
    }
    res.json({ status: 'ok' })
}