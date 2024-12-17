import express from "express";
import cookieParser from "cookie-parser";
import userAuthRoutes from "./routes/auth.route.js";

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes Declaration
app.use("/api/v1/users/", userAuthRoutes);

export default app;
