import { Schema, model, models } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    color: { type: String, required: true, default: '#212121' },
    avatar: { type: String },
    type: { type: String, required: true, default: 'user' }
}, { timestamps: true });


UserSchema.plugin(uniqueValidator);

const User = models.User || model('User', UserSchema);

export default User;
