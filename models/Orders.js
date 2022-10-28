import { Schema, model, models } from 'mongoose'

const OrderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    userEmail: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    products: { 
        type: Object,
        required: true,
        ref: 'Product'
     },
    amount: {
        type: Number,
        required: true
    },
    giftWrap: {
        type: Boolean,
        default: false
    },
    giftWrapCost: {
        type: Number,
        required: true,
        default: 50
    },
    paymentInfo: {
        type: String,
        required: true,
        default: 'na'
    },
    status: {
        type: String,
        required: true,
        default: 'Pending'
    },
    txnStatus: {
        type: String,
        required: true,
        default: 'initialize'
    },
    address: {
        type: String,
        required: true
    },
    billingAddress: {
        type: String,
        required: true
    },
    trackingId: {
        type: String,
        required: true,
        default: 'na'
    },
    shippingRate: {
        type: Number,
        required: true,
        default: 0
    },
    phone: {
        type: Number,
        required: true
    },
    isDiscountCode: {
        type: Boolean,
        required: true,
        default: false
    },
    discountCodeId: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: 'DiscountCode'
    },
    razorpay: {
        razorpayPaymentId: {
            type: String
        },
        razorpayOrderId: {
            type: String
        },
        razorpaySignature: {
            type: String
        }
    },
    isVisiable: {
        type: Boolean,
        required: true,
        default: true
    },
    discount: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

const Order = models.Order || model('Order', OrderSchema);

export default Order;