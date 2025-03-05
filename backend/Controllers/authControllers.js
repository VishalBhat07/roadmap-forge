const bcrypt = require("bcrypt");
const crypto = require("crypto");
const userModel = require("../Models/userModel");

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // console.log(username, email, password);

    const user = await userModel.findOne({ username });
    // console.log(user);

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
    // console.log(newUser);
    const savedUser = await newUser.save();

    if (!savedUser) {
      return res.json({
        message: "User registration failed",
        user: null,
      });
    }
    return res.json({
      message: "User registered successfully",
      user: savedUser,
    });
  } catch (error) {
    return res.json({
      error: "Internal server error",
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
    // console.log(verificationCode);

    const salt = await bcrypt.genSalt(10);
    const hashedCode = await bcrypt.hash(verificationCode, salt);

    user.forgotPasswordCode = hashedCode;
    user.forgotPasswordCodeExpires =
      Date.now() + expiryTimeInMinutes * 60 * 1000;

    await user.save();

    const subject = "Your Password Reset Code";
    sendEmail(userEmail, subject, verificationCode);

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
