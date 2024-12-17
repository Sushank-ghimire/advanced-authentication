import { Router } from "express";
import {
  loginUser,
  userLogout,
  signUpUser,
} from "../controllers/auth.controller.js";

const userAuthRoutes = Router();

userAuthRoutes.post("/login", loginUser);
userAuthRoutes.post("/register", signUpUser);
userAuthRoutes.get("/logout", userLogout);

export default userAuthRoutes;
