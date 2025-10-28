const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

//! User Controller
const usersController = {
  //! Register User
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Validate
    if (!username || !email || !password) {
      throw new Error("Please fill all fields");
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const userCreated = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    // Response
    res.status(201).json({
      id: userCreated._id,
      username: userCreated.username,
      email: userCreated.email,
      message: "User registered successfully",
    });
  }),

  //! Login User
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid login credentials");
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid login credentials");
    }

    // Generate token using .env secret key
    const token = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET, // ✅ using .env now
      { expiresIn: "30d" }
    );

    // Response
    res.json({
      message: "Login Success",
      token,
      id: user._id,
      email: user.email,
      username: user.username,
    });
  }),

  //! Get User Profile
  profile: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("User not found");
    }

    res.json({ username: user.username, email: user.email });
  }),

  //! Change User Password
  changeUserPassword: asyncHandler(async (req, res) => {
    const { newPassword } = req.body;

    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("User not found");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;

    await user.save({ validateBeforeSave: false });

    res.json({ message: "Password changed successfully" });
  }),

  //! Update User Profile
  updateUserProfile: asyncHandler(async (req, res) => {
    const { email, username } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      { username, email },
      { new: true }
    );

    res.json({
      message: "User profile updated successfully",
      updatedUser,
    });
  }),
};

module.exports = usersController;
