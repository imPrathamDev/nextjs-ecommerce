import  { Schema, model, models } from 'mongoose'

const DiscountCodesSchema = Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    isPercent: {
        type: Boolean,
        required: true,
        default: true
    },
    amount: {
        type: Number,
        required: true
    },
    expireDate: {
        type: String,
        required: true,
        default: 'NA'
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true
});

const DiscountCode = models.DiscountCode || model('DiscountCode', DiscountCodesSchema);

export default DiscountCode;