import { asyncHandler, ApiResponse, ApiError } from "../utils/Export.js";
import pool from "../database/DbConfig.js";
import {
  generateAccessToken,
  generateUniquieUserId,
  hashPassword,
  compareHashPassword,
  generateVerificationToken,
} from "../helpers.js";
import {
  sendForgotPasswordEmail,
  sendVerifyEmail,
  sendWelcomeEmail,
} from "../mailtrap/MailtrapConfig.js";

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res
      .status(401)
      .json(new ApiError(401, "Email and password are required", false));
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
      { userId: user.userId, email: user.email, token },
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

  // Insert the new user
  await pool.query(
    "INSERT INTO users (userId, email, name, password) VALUES (?, ?, ?, ?)",
    [userId, email, name, hashedPassword]
  );

  // Retrieve the newly created user
  const [user] = await pool.query("SELECT * FROM users WHERE userId = ?", [
    userId,
  ]);

  if (user.length === 0) {
    return res.json(new ApiError(501, "Failed to create user account", false));
  }

  // Send success response
  sendWelcomeEmail(user[0].email);
  return res.json(
    new ApiResponse(201, user[0], "Account created successfully")
  );
});

const userLogout = asyncHandler(async (req, res) => {
  res.clearCookie("userToken");
  return res
    .status(200)
    .json(new ApiResponse(200, null, "User logged out successfully."));
});

const sendVerificationToken = asyncHandler(async (req, res, next) => {
  const token = generateVerificationToken();
  const { email } = req.user;
  const [result] = await pool.query(
    "UPDATE users SET verificationToken = ? WHERE email = ?",
    [token, email]
  );
  if (result.affectedRows) {
    sendVerifyEmail(email, token);
    return res.json(
      new ApiResponse(200, [], "Verification token send to the email")
    );
  }
  return res.json(
    new ApiError(500, "Error occured while sending the verification token")
  );
});

const sendForgotPasswordToken = asyncHandler(async (req, res, next) => {
  const token = generateVerificationToken();
  const { email } = req.user;
  const [result] = await pool.query(
    "UPDATE users SET resetPasswordToken = ? WHERE email = ?",
    [token, email]
  );
  if (result.affectedRows) {
    sendForgotPasswordEmail(email, process.env.FRONTEND_DOMAIN + token);
    return res.json(
      new ApiResponse(200, [], "Reset password token send to the email")
    );
  }
  return res.json(
    new ApiError(500, "Error occured while sending the verification token")
  );
});

const verifyUserToken = asyncHandler(async (req, res) => {
  const { token } = req.query;
  const { email } = req.user;
  const [result] = await pool.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  const user = result[0];
  if (user.verificationToken === token) {
    return res.json(new ApiResponse(200, [], "User verified successfully"));
  }

  return res.json(new ApiError(401, "Failed to verify user email"));
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { userId } = req.user;
  const hashedPassword = await hashPassword(password);
  const [result] = await pool.query(
    "UPDATE users SET password = ? WHERE userId = ?",
    [hashedPassword, userId]
  );

  if (result.affectedRows) {
    return res.json(
      new ApiResponse(201, [], "User password changed successfully.")
    );
  }
  return res.json(new ApiError(400, "Failed to change the user password"));
});

export {
  loginUser,
  signUpUser,
  userLogout,
  sendVerificationToken,
  resetPassword,
  verifyUserToken,
  sendForgotPasswordToken,
};
