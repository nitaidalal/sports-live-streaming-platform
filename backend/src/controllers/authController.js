import { authService } from '../services/authService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { cookieOptions } from '../utils/cookieOptions.js';

export const authController = {
  register: asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;
    const { user, token } = await authService.register({
      fullName,
      email,
      password,
    });

    res
      .status(201)
      .cookie('token', token, cookieOptions)
      .json({ success: true, data: user });
  }),

  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const { user, token } = await authService.login({ email, password });

    res
      .status(200)
      .cookie('token', token, cookieOptions)
      .json({ success: true, data: user });
  }),

  logout: asyncHandler(async (req, res) => {
    res
      .status(200)
      .clearCookie('token', cookieOptions)
      .json({ success: true, message: 'Logged out successfully' });
  }),

  getMe: asyncHandler(async (req, res) => {
    const user = await authService.getMe(req.user.id);
    res.status(200).json({ success: true, data: user });
  }),
};
