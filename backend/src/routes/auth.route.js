import { Router } from "express";
import { loginUser, userLogout } from "../controllers/auth.controller.js";

const userAuthRoutes = Router();

userAuthRoutes.post("/login", loginUser);
userAuthRoutes.post("/signup", loginUser);
userAuthRoutes.get("/logout", userLogout);

export default userAuthRoutes;
