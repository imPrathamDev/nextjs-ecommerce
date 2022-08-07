import { Schema, model, models } from 'mongoose';

const WishlistSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
}, {
    timestamps: true,
});


const Wishlist = models.Wishlist || model('Wishlist', WishlistSchema);

export default Wishlist;