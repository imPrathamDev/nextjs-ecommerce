const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    color: { type: String, required: true },
    type: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('User', UserSchema);