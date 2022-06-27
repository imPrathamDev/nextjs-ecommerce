const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    products: [{
        productId: { type: String, required: true },
        quantity: { type: String, default: 1 },
    }],
    ammout: { type: Number, required: true },
    status: { type: String, default: 'Pending', required: true },
    address: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Order', OrderSchema);