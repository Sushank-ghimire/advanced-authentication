import { asyncHandler, ApiResponse, ApiError } from "../utils/Export.js";
import pool from "../database/DbConfig.js";
import {
  generateAccessToken,
  generateUniquieUserId,
  generateVerificationCode,
  hashPassword,
  compareHashPassword
} from "../helpers.js";

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res.status(401).json(
      new ApiError(401, "Email and password are required", false)
    );
  }

  // Retrieve user details from the database
  const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  if (users.length === 0) {
    return res.json(new ApiError(404, "User not found", false));
  }

  const user = users[0]; // Get the first user object

  // Verify the provided password with the stored hashed password
  const isValidPassword = await compareHashPassword(password, user.password);

  if (!isValidPassword) {
    return res.json(new ApiError(401, "Wrong user password", false));
  }

  // Generate JWT Token
  const token = generateAccessToken({
    userId: user.userId,
    email: user.email,
  });

  // Cookie options for secure storage
  const cookieOptions = {
    httpOnly: true, // Prevent access via JavaScript
    secure: process.env.NODE_ENV === "production", // Use secure flag in production
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  };

  // Set cookie with the token
  res.cookie("userToken", token, cookieOptions);

  // Respond with success
  return res.json(
    new ApiResponse(
      200,
      { userId: user.userId, email: user.email },
      "User logged in successfully."
    )
  );
});

const signUpUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  // Validate required fields
  if ([email, name, password].some((field) => !field)) {
    return res.json(new ApiError(400, "All fields are required", false));
  }

  const [userAlreadyExists] = await pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (userAlreadyExists.length > 0) {
    return res.json(
      new ApiError(400, "User with this email is already registered", false)
    );
  }

  // Hash the password
  const hashedPassword = await hashPassword(password);

  // Generate a unique user ID
  const userId = generateUniquieUserId();

  const code = generateVerificationCode();
  // Insert the new user
  await pool.query(
    "INSERT INTO users (userId, email, name, password, verificationToken) VALUES (?, ?, ?, ?, ?)",
    [userId, email, name, hashedPassword, code]
  );

  // Retrieve the newly created user
  const [user] = await pool.query("SELECT * FROM users WHERE userId = ?", [
    userId,
  ]);

  if (user.length === 0) {
    return res.json(new ApiError(501, "Failed to create user account", false));
  }

  // Send success response
  return res.json(
    new ApiResponse(201, user[0], "Account created successfully")
  );
});

const userLogout = asyncHandler(async (req, res) => {});

export { loginUser, signUpUser, userLogout };
