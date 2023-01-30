import { getCollections } from "../../../dbOperations/collectionOperations";

export default async function handler(req, res) {
  try {
    return res.status(200).json(await getCollections);
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}
