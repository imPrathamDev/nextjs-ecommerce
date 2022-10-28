import  { Schema, model, models } from 'mongoose'

const DiscountCodesSchema = Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    isPercent: {
        type: Boolean,
        required: true,
        default: true
    },
    value: {
        type: Number,
        required: true
    },
    expireDate: {
        type: Date,
        required: true,
        default: null
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    limit: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const DiscountCode = models.DiscountCode || model('DiscountCode', DiscountCodesSchema);

export default DiscountCode;