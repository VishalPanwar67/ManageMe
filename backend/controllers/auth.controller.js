import { User } from "../models/index.model.js";
import bcrpypt from "bcryptjs";

import {
  asyncHandler,
  apiError,
  generateTokenAndSetCookie,
} from "../utils/indexUtils.js";
import { apiResponse } from "../utils/apiResponse.js";

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new apiError(400, "All fields are required");
  }
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new apiError(409, "user with email exist");
  }

  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    throw new apiError(409, "user with username exist");
  }

  if (password.length < 6) {
    return res.status(400).json({
      error: "password is short=> must have more then 6 ",
    });
  }

  const salt = await bcrpypt.genSalt(10);
  const hashedPassword = await bcrpypt.hash(password, salt);

  const user = await User.create({
    username: username.toLowerCase(),
    email: email,
    password: hashedPassword,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new apiError(500, "something went wrong while register user");
  }
  generateTokenAndSetCookie(user._id, res);
  return res
    .status(201)
    .json(new apiResponse(201, createdUser, "user registered successfully"));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new apiError(400, "All fields are required");
  }

  const user = await User.findOne({ email });
  const isPasswordCorrect = await bcrpypt.compare(
    password,
    user?.password || ""
  );
  if (!user || !isPasswordCorrect) {
    throw new apiError(409, "Invalid username or password");
  }
  generateTokenAndSetCookie(user._id, res);
  user.password = undefined;

  return res
    .status(201)
    .json(new apiResponse(201, user, "User login Successfully"));
});

const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
});

const getMe = asyncHandler(async (req, res) => {
  const userID = req.user._id;
  const user = await User.findOne(userID).select("-password");
  if (!user) {
    throw new apiError(500, "user is not fatched");
  }
  return res
    .status(201)
    .json(new apiResponse(201, user, "user fetched successfully"));
});
export { register, login, logout, getMe };
