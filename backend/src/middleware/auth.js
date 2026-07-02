import jwt from 'jsonwebtoken';

import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;
  console.log('Cookies:', req.cookies);


  if (!token) {
    throw new ApiError(401, 'Not authenticated — please log in');
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new ApiError(401, 'Session expired — please log in again');
    }
    throw new ApiError(401, 'Invalid token — please log in again');
  }
});
