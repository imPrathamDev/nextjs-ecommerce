import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectdb = async () =>
  mongoose.connect(
    process.env.MONGOOSE_URI,
    { useNewUrlParser: true },
    (err) => {
      if (!err) console.log("MongoDB has connected successfully.");
    }
  );

require("../models/Products");
require("../models/DiscountCodes");
require("../models/Reviews");
require("../models/Users");

export default connectdb;
