const bcrypt = require("bcrypt");
const crypto = require("crypto");
const userModel = require("../Models/userModel");
const sendEmail = require("../utils/mailSender.js");

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("Received data:", { username, email, password });

    const user = await userModel.findOne({ username });
    if (user)
      return res.json({
        message: "Username is already taken",
        user: null,
      });

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      username,
      email,
      password: hashedpassword,
    });

    console.log("New user before saving:", newUser);

    const savedUser = await newUser.save();

    console.log("Saved User:", savedUser);

    if (!savedUser) {
      return res.status(500).json({
        message: "User registration failed",
        user: null,
      });
    }

    sendEmail(
      email,
      "Welcome to RoadMapForge!",
      "You're all set to explore your roadmap journey!",
      "welcome"
    );

    return res.json({
      message: "User registered successfully",
      user: savedUser,
    });
  } catch (error) {
    console.error("Error while saving user:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });

    if (!user)
      return res.json({
        error: "User not found in DB",
        user: null,
      });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.json({
        error: "Invalid credentials",
        user: null,
      });

    res.json({
      message: "Login successfull",
      user: user,
    });
  } catch (err) {
    res.json({
      message: "Internal server error",
    });
  }
};

const generateVerificationCode = async (req, res) => {
  try {
    const { userEmail } = req.body;

    const user = await userModel.findOne({ email: userEmail });

    if (!user) {
      return res.json({
        message: "User not found in DB",
        user: null,
      });
    }

    const verificationCode = crypto.randomInt(100000, 999999).toString();
    const expiryTimeInMinutes = 2;

    const salt = await bcrypt.genSalt(10);
    const hashedCode = await bcrypt.hash(verificationCode, salt);

    user.forgotPasswordCode = hashedCode;
    user.forgotPasswordCodeExpires =
      Date.now() + expiryTimeInMinutes * 60 * 1000;

    await user.save();

    const subject = "Your Password Reset Code";
    sendEmail(userEmail, subject, verificationCode, "otp");

    res.json({
      message: "Data recieved at backend",
      user: user,
    });
  } catch (err) {
    res.json({
      message: "Internal server error",
    });
  }
};

const verifyCode = async (req, res) => {
  try {
    const { userEmail, verificationCode } = req.body;

    const user = await userModel.findOne({ email: userEmail });

    if (!user) {
      return res.json({
        message: "User not found in DB",
      });
    }

    if (
      !user.forgotPasswordCodeExpires ||
      Date.now() > user.forgotPasswordCodeExpires
    ) {
      return res.json({
        message: "Verification code expired",
      });
    }

    const isMatch = await bcrypt.compare(
      verificationCode,
      user.forgotPasswordCode
    );

    if (!isMatch) {
      return res.json({ message: "Invalid verification code" });
    }

    res.json({ message: "Code verified successfully", verified: true });
  } catch (error) {
    res.json({
      message: "Internal server error",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { userEmail, newPassword } = req.body;

    const user = await userModel.findOne({ email: userEmail });

    if (!user) {
      return res.json({
        message: "User not found in DB",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.forgotPasswordCode = undefined;
    user.forgotPasswordCodeExpires = undefined;

    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  registerController,
  loginController,
  generateVerificationCode,
  verifyCode,
  resetPassword,
};
