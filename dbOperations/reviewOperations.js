import Review from "../models/Reviews";
import connectdb from "../utils/connectMongo";

export async function getReviews(id) {
  try {
    await connectdb();
    const reviews = await Review.find({ product: id }).populate(
      "user",
      "firstName lastName"
    );

    return {
      success: true,
      reviews,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}
