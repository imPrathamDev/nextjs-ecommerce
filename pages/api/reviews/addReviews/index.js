import Review from "../../../../models/Reviews";
import Product from "../../../../models/Products"
import User from "../../../../models/Users"
import connectdb from "../../../../utils/connectMongo"

export default async function handler(req, res) {
    const { user, product, review, rating, heading } = req.body;
    console.log(req.body)
    if (req.method === 'POST') {
        if (review.length > 0) {
            if (review.length < 100) {
                if (heading.length > 0) {
                    try {
                        await connectdb();
                        const checkUser = await User.countDocuments({ _id: user });
                        if (checkUser === 1) {
                            const checkProduct = await Product.countDocuments({ _id: product });
                            if (checkProduct) {
                                const checkReview = await Review.countDocuments({ user, product });
                                if (checkReview === 0) {
                                    await Review.create({ user, product, rating, review, heading });
                                    const allReviews = await Review.find({ product });
                                    const totalRatings = allReviews.reduce((arr, curr) => arr + curr?.rating, 0);
                                    await Product.findByIdAndUpdate(product, {
                                        rating: totalRatings / allReviews.length,
                                        numReviews: allReviews.length
                                    })
                                    res.json({ success: true })
                                } else {
                                    res.json({ success: false, error: 'Multiple Reviews not allowed' })
                                }
                            } else {
                                res.json({ success: false, error: 'Invalid Request' })
                            }
                        } else {
                            res.json({ success: false, error: 'Invalid Request' })
                        }
                    } catch (error) {
                        res.json({ success: false, error: error.message })
                    }
                } else {
                    res.json({ success: false, error: 'Empty Heading' })
                }
            } else {
                res.json({ success: false, error: 'Too Long Review' })
            }

        } else {
            res.json({ success: false, error: 'Empty Review' })
        }

    } else {
    }
}