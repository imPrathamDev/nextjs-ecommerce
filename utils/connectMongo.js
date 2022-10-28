import mongoose from "mongoose";

const connectdb = async () => mongoose.connect(process.env.MONGOOSE_URI)
require('../models/Products');
require('../models/DiscountCodes');
require('../models/Reviews');
require('../models/Users');
export default connectdb;