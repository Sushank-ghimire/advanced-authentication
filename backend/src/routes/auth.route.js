import { Router } from "express";
import {
  loginUser,
  userLogout,
  signUpUser,
  sendCode,
  verifyCode,
  resetPassword,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const userAuthRoutes = Router();

userAuthRoutes.post("/login", loginUser);
userAuthRoutes.post("/register", signUpUser);
userAuthRoutes.delete("/logout", authMiddleware, userLogout);
userAuthRoutes.post("/send-code", authMiddleware, sendCode);
userAuthRoutes.post("/verify", userAuthRoutes, verifyCode);
userAuthRoutes.post("/reset-password", authMiddleware, sendCode, resetPassword);

export default userAuthRoutes;
