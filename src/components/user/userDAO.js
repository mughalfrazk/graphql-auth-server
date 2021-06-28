import { UserError } from "./userError";
import User from "../../models/User";
import LoginLogs from "../../models/LoginLogs";
import smtpModule from "../../module/smtp";
import Bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserDAO {
  // Registering New User ------------ Controller
  createUser = async ({ name, username, email, password }) => {
    // Hashing Password
    let hashedPassword;
    try {
      const salt = await Bcrypt.genSalt(10);
      hashedPassword = await Bcrypt.hash(password, salt);
    } catch (error) {
      throw new UserError(error);
    }

    let token;
    try {
      token = jwt.sign(
        {
          email,
        },
        `${process.env.JWT_SECRET_KEY}`,
        { expiresIn: "2h" }
      );
    } catch (error) {
      throw new UserError(error);
    }

    var verificationUrl = `Secret Token => ${token}`;

    try {
      await smtpModule(email, "Verify Email", verificationUrl);
    } catch (error) {
      throw new UserError(error);
    }

    // New User Object
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      verified: false,
    });

    // Save User Object
    try {
      await newUser.save();
    } catch (error) {
      throw new UserError(error);
    }
    return newUser;
  };

  // Login User ------------ Controller
  login = async ({ email, password }) => {
    // Check User Email
    let checkUser;
    try {
      checkUser = await User.findOne({ email });
    } catch (error) {
      throw new UserError(error);
    }

    if (!checkUser) {
      throw new UserError("User does not exist.");
    }

    if (checkUser.verified === false) {
      let token;
      try {
        token = jwt.sign(
          {
            email,
          },
          `${process.env.JWT_SECRET_KEY}`,
          { expiresIn: "2h" }
        );
      } catch (error) {
        throw new UserError(error);
      }

      var verificationUrl = `Secret Token => ${token}`;

      try {
        await smtpModule(email, "Verify Email", verificationUrl);
      } catch (error) {
        throw new UserError(error);
      }

      throw new UserError("Email not verified");
    }

    // Comparing Password
    let isValidPassword;
    try {
      isValidPassword = await Bcrypt.compare(password, checkUser.password);
    } catch (error) {
      throw new UserError(error);
    }

    if (!isValidPassword) {
      throw new UserError("Invalid Credentials");
    }

    // Save Login Logs
    const loggedIn = new LoginLogs({
      user: checkUser._id,
      timestamp: new Date(),
    });

    try {
      await loggedIn.save();
    } catch (error) {
      throw new UserError(error);
    }

    // Create JWT Token
    let token;
    try {
      token = jwt.sign(
        {
          userId: checkUser._id,
        },
        `${process.env.JWT_SECRET_KEY}`,
        { expiresIn: "10h" }
      );
    } catch (error) {
      throw new UserError(error);
    }

    return {
      user: checkUser,
      token,
    };
  };

  // Verify Email ------------ Controller
  verifyEmail = async (token) => {
    let decodedToken;
    if (token) {
      try {
        decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      } catch (error) {
        throw new UserError("This is link is expired.");
      }
    }

    let checkUser;
    try {
      checkUser = await User.findOne({ email: decodedToken.email });
    } catch (error) {
      throw new UserError(error);
    }

    if (!checkUser) {
      throw new UserError("User does not exist.");
    }

    checkUser.verified = true;

    try {
      await checkUser.save();
    } catch (error) {
      throw new UserError(error);
    }

    return { message: `${checkUser.email} Verified!` };
  };
}

export const userDAO = new UserDAO();
