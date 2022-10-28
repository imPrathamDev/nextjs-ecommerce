import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    discPrice: {
        type: Number,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    
    sku: {
            type: String,
            required: true,
            unique: true
    },
    desc: {
        type: String,
        required: true
    },
    shortDesc: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    availableQty: {
        type: Number,
        required: true
    },
    images: {
        type: Array,
        default: []
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    color: {
        type: String,
        default: "None",
    },
    stone: {
        type: String,
        default: "None",
    },
    style: {
        type: String,
        default: "None",
    },
    feature: {
        type: String,
        default: "None",
    },
    collections: {
        type: Object,
        required: true,
        ref: 'Product'
    },
    tags: []
}, {
    timestamps: true
});


const Product = models.Product || model('Product', ProductSchema);

export default Product;