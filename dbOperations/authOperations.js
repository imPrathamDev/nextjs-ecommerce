const { default: User } = require("../models/Users");
const { default: connectdb } = require("../utils/connectMongo");

class AuthOperations {
  constructor() {}
  async SignUp({ firstName, lastName, email, password }) {
    try {
      await connectdb();
      const newUser = await User.create({
        firstName,
        lastName,
        email: email.trim().toLowerCase(),
        password: "",
        avatar: `https://avatars.dicebear.com/api/micah/${firstName.trim()}.svg`,
      });

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }
}

exports.AuthOperations = AuthOperations;
