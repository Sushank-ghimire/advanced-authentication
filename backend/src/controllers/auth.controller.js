import { asyncHandler, ApiResponse, ApiError } from "../utils/Export.js";
import pool from "../database/DbConfig.js";
import {
  compareHashPassword,
  generateAccessToken,
  generateUniquieUserId,
  hashPassword,
  validateUserToken,
} from "../helpers.js";

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
});

const signUpUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  if ([email, name, password].some((field) => !field)) {
    return res.json(new ApiError(400, "All fields are required", false));
  }

  const userAlreadyExists = await pool.query(
    "SELECT * FORM users WHERE email = ?",
    [email]
  );

  if (userAlreadyExists.length > 0) {
    return res.json(
      new ApiError(400, "User with this email is already registered", false)
    );
  }

  const hashedPassword = await hashPassword(password);

  const userId = generateUniquieUserId();

  await pool.query(
    "INSERT INTO users(email, password, userId) VALUES(?, ?, ?)",
    [email, hashedPassword, userId]
  );

  const [user] = await pool.query("SELECT * FROM users WHERE userId = ?", [
    userId,
  ]);

  if (user.length === 0) {
    return res.json(new ApiError(501, "Failed to create user account", false));
  }
  return res.json(new ApiResponse(201, user, "Account created successfully"));
});

const userLogout = asyncHandler(async (req, res) => {});

export { loginUser, signUpUser, userLogout };
