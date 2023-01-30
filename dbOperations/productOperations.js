import Product from "../models/Products";
import { DEFAULT_LIMIT } from "../static/staticData";
import connectdb from "../utils/connectMongo";

export async function getProducts(para) {
  const { category = "", sort = "", limit = "" } = para || {};
  await connectdb();
  if (category) {
    let products;
    products = await Product.find({ category }).limit(
      limit ? limit : DEFAULT_LIMIT
    );
    if (products.length <= 1) {
      products = await Product.find()
        .sort({ createdAt: -1 })
        .limit(limit ? limit : DEFAULT_LIMIT);
      return {
        success: true,
        length: products.length,
        products,
        testCode: 1,
      };
    }
    return {
      success: true,
      length: products.length,
      products,
      testCode: 2,
    };
  } else if (sort) {
    if (sort === "new") {
      const products = await Product.find()
        .sort({ createdAt: -1 })
        .limit(limit ? limit : DEFAULT_LIMIT);
      return { success: true, length: products.length, products };
    }
  } else {
    const products = await Product.find().limit(limit ? limit : DEFAULT_LIMIT);
    return { success: true, length: products.length, products };
  }
}

export async function filterProducts(keyword) {
  await connectdb();
  const products = await Product.find();
  const filterData = await products.filter((data) => {
    return (
      data.category.toLowerCase() == keyword.toLowerCase() ||
      data.color.toLowerCase() == keyword.toLowerCase() ||
      data.stone.toLowerCase() == keyword.toLowerCase() ||
      data.style.toLowerCase() == keyword.toLowerCase()
    );
  });

  return {
    success: true,
    length: filterData.length,
    products: filterData,
  };
}

export async function getProduct(slug) {
  try {
    await connectdb();
    const exists = await Product.exists({ slug });
    if (exists) {
      const product = await Product.findOne({ slug: slug }).populate(
        "collections._id"
      );
      return { success: true, product };
    } else {
      return { success: false, error: "Not Exists" };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}
