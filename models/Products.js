const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    desc: { type: String, required: true },
    shortDesc: { type: String, required: true },
    category:  { type: String, required: true },
    availableQty: { type: Number,  },
    tags: { type: Array, },
}, { timestamps: true });

export default mongoose.model('Product', ProductSchema);