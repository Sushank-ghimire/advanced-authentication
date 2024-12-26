import { Router } from "express";
import {
  loginUser,
  userLogout,
  signUpUser,
  sendVerificationToken,
  verifyUserToken,
  resetPassword,
  sendForgotPasswordToken,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const userAuthRoutes = Router();

// User Authentication Routes
userAuthRoutes.post("/login", loginUser);
userAuthRoutes.post("/register", signUpUser);
userAuthRoutes.delete("/logout", authMiddleware, userLogout);

// User Verification Routes
userAuthRoutes.get("/verify", authMiddleware, sendVerificationToken);
userAuthRoutes.post("/verify/:token", authMiddleware, verifyUserToken);
userAuthRoutes.get("/reset-password", authMiddleware, sendForgotPasswordToken);
userAuthRoutes.post("/reset-password/:token", authMiddleware, resetPassword);

export default userAuthRoutes;
