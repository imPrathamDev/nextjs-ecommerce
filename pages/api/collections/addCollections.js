import connectdb from '../../../utils/connectMongo';
import Collection from '../../../models/Collections';

function convertToSlug(Text) {
    return Text.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

export default async function handler(req, res){
    if(req.method === 'POST'){
        try {
            await connectdb();
            const collection = await Collection.create({ ...req.body, slug: convertToSlug(req.body.name) });
            res.status(200).json({ sucess: true, data: collection })
        } catch (error) {
            res.status(200).json({ sucess: false, error: error.message })
        }
    } else {
        res.status(200).json({ sucess: false, error: 'Invalid Request Method' })
    }
}