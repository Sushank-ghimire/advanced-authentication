import crypto from "crypto";
import bcrypt from "bcryptjs";
import { configDotenv } from "dotenv";
configDotenv();
import jwt from "jsonwebtoken";

export function generateUniquieUserId() {
  return crypto.randomBytes(15).toString("hex");
}

export async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 16);
  return hashedPassword;
}

export async function compareHashPassword(password, hashPassword) {
  const result = await bcrypt.compare(password, hashPassword);
  return result;
}

export function generateAccessToken(user) {
  const data = {
    email: user.email,
    userId: user.userId,
  };
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(data, jwtSecretKey);
  return token;
}

export function validateUserToken(token) {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const data = jwt.verify(token, jwtSecretKey);
  return data;
}
