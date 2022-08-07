import connectdb from '../../../utils/connectMongo';
import Collection from '../../../models/Collections'

export default async function handler(req, res) {
    try {
        await connectdb();
        const collections = await Collection.find();
        res.json({ success: true, collections });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
}