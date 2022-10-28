import connectdb from "../../../../utils/connectMongo";
import DiscountCode from '../../../../models/DiscountCodes'

export default async function handler(req, res){
    await connectdb();
    await DiscountCode.create({ code: 'off500', isPercent: false, value: 500, limit: 1999 })
    res.json({ success: true })
}