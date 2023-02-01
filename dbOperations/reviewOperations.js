import Product from "../models/Products";
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

export async function addReview(product, user, rating, review, heading) {
  if (
    product &&
    user &&
    review &&
    review.length > 0 &&
    review.length <= 100 &&
    heading &&
    heading.length > 0 &&
    heading.length < 40
  ) {
    try {
      await connectdb();
      const check = await Review.find({ user, product });
      if (check && check.length > 0) {
        return {
          success: false,
          error: "Already Reviewed By You",
        };
      }
      await Review.create({ user, product, rating, review, heading });
      const allReviews = await Review.find({ product });
      const totalRatings = allReviews.reduce(
        (arr, curr) => arr + curr?.rating,
        0
      );
      await Product.findByIdAndUpdate(product, {
        rating: totalRatings / allReviews.length,
        numReviews: allReviews.length,
      });
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  } else {
    return {
      success: false,
      error: "Invalid Details",
    };
  }
}
