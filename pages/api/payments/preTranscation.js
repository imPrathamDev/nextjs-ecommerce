import Razorpay from 'razorpay';
import connectdb from '../../../utils/connectMongo';
import Order from '../../../models/Orders';
import Product from '../../../models/Products';
import shortid from 'shortid';

const instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});

export default async function handler(req, res) {

    const validatePhone = (phone) => {
        const number = /^([\+0]91)?\-?[7-9]{1}[0-9]{9}$/
        const check = number.test(phone);
        return check;
    }

    const validatePincode = async (pincode) => {
        const pincodeData = await fetch(`https://api.postalpincode.in/pincode/${pincode}`).then((response) => response.json());
        if (pincodeData[0].Status === 'Success') {
            return true
        } else {
            return false
        }
    }

    if (req.method === 'POST') {
        if (validatePhone(req.body.phone)) {
            if (validatePincode(req.body?.address?.pincode)) {
                await connectdb();
                let tempIds = [];
                for (let num = 0; num <= req.body.products.length; num++) {
                    tempIds.push(req.body.products?.[num]?._id);
                }
                const newProducts = await Product.find({ _id: { $in: tempIds } });
                for (let a = 0; a < newProducts.length; a++) {
                    if (newProducts[a]?.availableQty < req.body.products?.[a].qty) {
                        res.json({ success: false, error: 'Item Not Available' })
                    }
                }
                try {
                    const options = {
                        amount: req.body.total * 100,
                        currency: "INR",
                        receipt: shortid.generate(),
                        notes: {
                            "isGiftWrap": req.body.giftWrap ? 'Yes' : 'No',
                            "Coupon": req.body.couponCode || 'NOT APPLIED',
                            "Email": req.body.userEmail
                        }
                    }
                    const order = await instance.orders.create(options);
                    let allProducts = req.body.products;
                    let data = [];
                    for (let i = 0; i < newProducts.length; i++) {
                        data[i] = {}
                        data[i]._id = allProducts[i]?._id
                        data[i].qty = allProducts[i]?.qty
                        data[i].discPrice = newProducts[i]?.discPrice
                        data[i].price = newProducts[i]?.price
                    }
                    await Order.create({
                        userId: req.body.userId,
                        userEmail: req.body.userEmail,
                        orderId: order.id,
                        amount: req.body.total,
                        address: JSON.stringify(req.body.address),
                        giftWrap: req.body.giftWrap,
                        products: data,
                        paymentInfo: 'na',
                        trackingId: 'na',
                        phone: req.body.phone,
                        billingAddress: JSON.stringify(req.body.billingAddress),
                        isDiscountCode: req.body.isDiscountCode,
                        discountCodeId: req.body.discountCodeId,
                        discount: req.body.discount
                    })
                    res.json({ success: true, id: order.id, amount: order.amount, currency: order.currency })
                } catch (error) {
                    res.json({ success: false, error: error.message })
                }
            } else {
                res.json({ success: false, error: 'Invalid Pincode' })
            }
        } else {
            res.json({ success: false, error: 'Invalid Number' })
        }
    } else {
        res.json({ success: false, error: 'Invalid Request' })
    }
}
