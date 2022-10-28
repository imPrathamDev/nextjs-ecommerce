import connectdb from "../../../../utils/connectMongo";
import DiscountCode from "../../../../models/DiscountCodes";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await connectdb();
            const validateCode = await DiscountCode.findOne({ code: req.body.code });
            if (validateCode?.code) {
                if (validateCode?.isActive) {
                    if (req.body.amount >= validateCode?.limit) {
                        res.json({ success: true, isPercent: validateCode?.isPercent, value: validateCode?.value, codeId: validateCode?._id })
                    } else {
                        res.json({ success: false, error: 'Add More Items' })
                    }
                } else {
                    res.json({ success: false, error: 'Inactive Coupon' })
                }
            } else {
                res.json({ success: false, error: 'Invalid Coupon' })
            }
        } catch (error) {
            res.json({ success: false, error: 'Invalid Coupon' })
        }
    } else {
        res.json({ success: false, error: 'Invalid Request' })
    }
}