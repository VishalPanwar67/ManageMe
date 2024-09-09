import express from "express";
const router = express.Router();

import {
  register,
  login,
  logout,
  getMe,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

//routes import form the auth file
router.get("/me", protectRoute, getMe); //to get user is loged in or not=> middleware
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
