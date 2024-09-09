import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { asyncHandler, apiResponse, apiError } from "../utils/index.utils.js";

const protectRoute = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt; //get token from cookie
  if (!token) {
    throw new apiError(401, "Unauthorized: No token provided");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET); //verify token
  if (!decoded) {
    throw new apiError(401, "Unauthorized: Invalid token");
  }

  const user = await User.findById(decoded.userId).select("-password"); //get user from database
  if (!user) {
    throw new apiError(401, "Unauthorized: User not found");
  }

  req.user = user; //set user in req
  next();
});

export { protectRoute };
