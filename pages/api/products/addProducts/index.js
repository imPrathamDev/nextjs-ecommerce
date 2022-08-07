import connectdb from "../../../../utils/connectMongo"
import Product from '../../../../models/Products';

export default async function handler(req, res) {

  try {
    if (req.method == 'POST') {
      const { title } = req.body;
      console.log('CONNECTING TO DATABASE')
      await connectdb();
      console.log('COONECTED TO DATABASE')
      console.log('CREATING DOCU...')
      // for(let i = 0; i < req.body.length; i++){
      function convertToSlug(Text) {
        return Text.toLowerCase()
          .replace(/ /g, '-')
          .replace(/[^\w-]+/g, '');
      }

      const products = await Product.create({ ...req.body, slug: convertToSlug(title) });
      console.log('CREATED DOCUMENT ')
      // }
      res.status(200).json({ success: true, products });
    } else {
      res.json({ success: false, error: 'This method is not allowed!' });
    }
  } catch (error) {
    res.json({ success: false, error });
  }
}  