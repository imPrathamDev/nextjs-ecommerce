import mongoose from "mongoose";

const connectdb = async () => mongoose.connect(process.env.MONGOOSE_URI)

export default connectdb;