import  { Schema, model, models } from 'mongoose'

const ReviewSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    rating: {
        type: Number,
        required: true
    },
    heading: {
        type: String,
        required: true,
        length: 20
    },
    review: {
        type: String,
        required: true,
        length: 100
    },
    isApproved: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true
});

const Review = models.Review || model('Review', ReviewSchema);

export default Review