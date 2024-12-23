import { Router } from "express";
import {
  loginUser,
  userLogout,
  signUpUser,
  verifyEmailAddress,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const userAuthRoutes = Router();

userAuthRoutes.post("/login", loginUser);
userAuthRoutes.post("/register", signUpUser);
userAuthRoutes.delete("/logout", authMiddleware, userLogout);
userAuthRoutes.post("/verify", authMiddleware, verifyEmailAddress);

export default userAuthRoutes;
