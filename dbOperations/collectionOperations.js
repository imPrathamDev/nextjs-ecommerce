import Collection from "../models/Collections";
import connectdb from "../utils/connectMongo";

export async function getCollections() {
  await connectdb();
  const collections = await Collection.find();
  return {
    success: true,
    collections,
  };
}

export async function getCollection(name) {
  await connectdb();
  const collection = await Collection.findOne({ slug: name });

  return {
    success: true,
    collection,
  };
}
