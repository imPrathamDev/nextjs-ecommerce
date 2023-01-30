import connectdb from "../../../utils/connectMongo";
import Address from "../../../models/Address";
import User from "../../../models/Users";
import { getToken } from "next-auth/jwt";

const secret = process.env.JWT_SECRET;

export default async function handler(req, res) {
  const token = await getToken({ req, secret });
  if (token) {
    await connectdb();
    const countUser = await User.countDocuments({ _id: token._id });
    if (req.method === "GET") {
      try {
        if (countUser === 1) {
          const address = await Address.find({ userId: token._id });
          return res.status(200).json({ success: true, data: address });
        } else {
          return res.json({ success: false, error: "Invalid Request" });
        }
      } catch (error) {
        return res.json({ success: false, error: error.message });
      }
    } else if (req.method === "POST") {
      const { firstName, lastName, address, city, state, pincode, phone } =
        req.body;
      if (
        firstName.length > 0 &&
        lastName.length > 0 &&
        address.length > 0 &&
        city.length > 0 &&
        state.length > 0
      ) {
        try {
          if (countUser === 1) {
            const verifyPincode = await fetch(
              `https://api.postalpincode.in/pincode/${parseInt(pincode)}`
            ).then((response) => response.json());
            if (verifyPincode?.[0]?.Status === "Success") {
              Address.create({
                userId: token._id,
                firstName,
                lastName,
                address,
                city,
                state,
                pincode,
                phone: parseInt(phone),
                country: "India",
              });
              return res.status(200).json({ success: true });
            } else {
              return res
                .status(401)
                .json({ success: false, error: "Invalid Pincode" });
            }
          } else {
            return res
              .status(401)
              .json({ success: false, error: "Invalid Request" });
          }
        } catch (error) {
          return res.status(401).json({ success: false, error: error.message });
        }
      } else {
        return res
          .status(401)
          .json({ success: false, error: "Invalid Request" });
      }
    } else if (req.method === "PATCH") {
      const {
        addressId,
        firstName,
        lastName,
        address,
        city,
        state,
        pincode,
        phone,
      } = req.body;
      if (
        firstName.length > 0 &&
        lastName.length > 0 &&
        address.length > 0 &&
        city.length > 0 &&
        state.length > 0
      ) {
        try {
          if (countUser === 1) {
            const countAddress = await Address.countDocuments({
              _id: addressId,
            });
            if (countAddress === 1) {
              const verifyPincode = await fetch(
                `https://api.postalpincode.in/pincode/${parseInt(pincode)}`
              ).then((response) => response.json());
              if (verifyPincode?.[0]?.Status === "Success") {
                await Address.findByIdAndUpdate(addressId, {
                  userId: token._id,
                  firstName,
                  lastName,
                  address,
                  city,
                  state,
                  pincode,
                  phone: parseInt(phone),
                  country: "India",
                });
                return res.status(200).json({ success: true });
              } else {
                return res
                  .status(401)
                  .json({ success: false, error: "Invalid Pincode" });
              }
            } else {
              return res
                .status(401)
                .json({ success: false, error: "Invalid Request" });
            }
          } else {
            return res
              .status(401)
              .json({ success: false, error: "Invalid Request" });
          }
        } catch (error) {
          return res.status(401).json({ success: false, error: error.message });
        }
      } else {
        res.status(401).json({ success: false, error: "Invalid Request" });
      }
    } else if (req.method === "DELETE") {
      const { addressId } = req.body;
      try {
        if (countUser === 1) {
          const countAddress = await Address.countDocuments({ _id: addressId });
          if (countAddress === 1) {
            await Address.findByIdAndDelete(addressId);
            return res.status(200).json({ success: true });
          } else {
            return res
              .status(401)
              .json({ success: false, error: "Invalid Request" });
          }
        } else {
          return res
            .status(401)
            .json({ success: false, error: "Invalid Request" });
        }
      } catch (error) {
        return res.status(401).json({ success: false, error: error.message });
      }
    }
    return res.json({ success: false, error: "Invalid Request" });
  } else {
    return res.status(401).json({ success: false, error: "Invalid Request" });
  }
}
