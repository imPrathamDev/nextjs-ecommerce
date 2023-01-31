import { validateEmail } from "../helpers/validation";
import User from "../models/Users";
import connectdb from "../utils/connectMongo";
import bcrypt from "bcrypt";

export async function SignUp(firstName, lastName, email, password) {
  if (
    firstName.length > 0 &&
    lastName.length > 0 &&
    email.length &&
    password.length > 0
  ) {
    if (validateEmail(email)) {
      try {
        const salt = bcrypt.genSaltSync(
          parseInt(process.env.BCRYPT_SALT_ROUND)
        );
        const hash = bcrypt.hashSync(password, salt);
        if (hash) {
          await connectdb();
          await User.create({
            firstName,
            lastName,
            email: email.trim().toLowerCase(),
            password: hash,
            avatar: `https://avatars.dicebear.com/api/micah/${firstName.trim()}.svg`,
          });
          return {
            success: true,
          };
        }
      } catch (error) {
        return {
          success: false,
          error: error.message,
        };
      }
    } else {
      return {
        success: false,
        error: "Invalid Email",
      };
    }
  } else {
    return {
      success: false,
      error: "Invalid Details",
    };
  }
}

export async function SignIn(email, password) {
  if (email.length > 0 && password.length > 0) {
    if (validateEmail(email)) {
      await connectdb();
      const user = await User.findOne({ email });
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          return {
            success: true,
            _id: user?._id,
            name: `${user?.firstName} ${user?.lastName}`,
            email: user?.email,
            image: user?.avatar,
            type: user?.type,
          };
        }
        return {
          success: false,
          error: "Invalid Request",
        };
      } else {
        return { success: false, error: "Invalid Request" };
      }
    } else {
      return { success: false, error: "Invalid Email" };
    }
  } else {
    return {
      success: false,
      error: "Invalid Request",
    };
  }
}
