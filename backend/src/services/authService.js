import jwt from 'jsonwebtoken';

import { env } from '../config/env.js';
import { toSafeUser, userRepository } from '../repositories/userRepository.js';
import { ApiError } from '../utils/ApiError.js';

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).{6,}$/; 

function generateToken(userId) {
  return jwt.sign({ id: userId }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

function validateRegisterInput({ fullName, email, password }) {
    if(!fullName || !email || !password) {
        throw new ApiError(400, 'Full name, email, and password are required');
    }

    if(fullName.length < 2 || fullName.length > 50) {
        throw new ApiError(400, 'Full name must be between 2 and 50 characters long');
    }

    if (!PASSWORD_REGEX.test(password)) {
        throw new ApiError(400, 'Password must be at least 6 characters long, contain at least 1 uppercase letter and 1 number');
    }
} 

export const authService = {
  async register({ fullName, email, password }) {
    validateRegisterInput({ fullName, email, password });

    const emailExists = await userRepository.existsByEmail(email);
    if (emailExists) {
      throw new ApiError(409, 'Email is already registered');
    }

    const user = await userRepository.create({ fullName, email, password });
    const token = generateToken(user.id);

    return { user, token };
  },

  async login({ email, password }) {
    if (!email || !password) {
      throw new ApiError(400, 'Email and password are required');
    }

    const userDoc = await userRepository.findByEmail(email);
    if (!userDoc) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const isMatch = await userDoc.comparePassword(password);
    if (!isMatch) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const token = generateToken(userDoc._id.toString());

    return { user: toSafeUser(userDoc), token };
  },
  async getMe(userId) {
    const user = await userRepository.findByIdSafe(userId);
    if (!user) throw new ApiError(404, 'User not found');
    return user;
  },
};

