import { validateUserToken } from "../helpers.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/AsyncHandler.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  const userToken =
    req.cookies?.userToken ||
    (req.headers.authorization && req.headers.authorization.split(":")[1]);

  // Get user return from function validateUserToken
  const user = validateUserToken(userToken);

  if (!user) {
    return res.status(401).json(new ApiError(401, "Unauthorized user", false));
  }
  req.user = user;
  next();
});

export default authMiddleware;
