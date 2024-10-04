const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const emailHelper = require("../utils/emailHelper");

const registerUser = async (req, res) => {
  try {
    const isUserExists = await User.findOne({ email: req.body.email });
    if (isUserExists) {
      return res.status(501).send({
        success: false,
        message: "User already exists",
      });
    }

    //hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save(); // we can use User.create(newUser)
    res.status(200).send({
      success: true,
      message: "User Registered Successfully. Please Login again",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const userLogin = async (req, res) => {
  try {
    //check if email is registered
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(501).send({
        success: false,
        message: "User not found. Please register",
      });
    }
    //check if password is correct
    // if (req.body.password !== user.password) {
    //   return res.status(501).send({
    //     success: false,
    //     message: "Password is incorrect",
    //   });
    // }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(501).send({
        success: false,
        message: "Password is incorrect",
      });
    }
    //creating a jwt token
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).send({
      success: true,
      message: "Login Successful",
      user: user,
      data: token,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.body.userId }).select(
      "-password"
    );
    res.status(200).send({
      success: true,
      data: user,
      message: "You are authorized to go to protected route",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//function to generate otp
const otpGenerator = () => {
  return Math.floor(100000 + Math.random() * 90000);
};

const forgotPassword = async (req, res) => {
  //ask for email, then check if exists in db,
  //if present, gen otp, save it in db,send
  //else navigate to register
  try {
    if (req.body.email === undefined) {
      return res.status(400).send({
        success: false,
        message: "Email is required",
      });
    }
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const otp = otpGenerator();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();
    await emailHelper("otp.html", user.email, { name: user.name, otp: otp });
    res.status(200).send({
      success: true,
      message: "OTP sent to the user",
    });
  } catch (err) {
    console.log(err);
  }
};

const resetPassword = async (req, res) => {
  try {
    const resetDetails = req.body;
    if (!resetDetails.password || !resetDetails.otp) {
      return res.status(400).send({
        success: false,
        message: "password and otp are required",
      });
    }
    const user = await User.findOne({ email: req.params.email });
    if (user === null) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    //check for otp expiration
    if (user.otpExpiry < new Date()) {
      return res.status(404).send({
        success: false,
        message: "OTP Expired",
      });
    }
    if (user.otp !== resetDetails.otp) {
      return res.status(404).send({
        success: false,
        message: "Invalid OTP",
      });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(resetDetails.password, saltRounds);
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password reset is successful",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  userLogin,
  registerUser,
  getCurrentUser,
  forgotPassword,
  resetPassword,
};
