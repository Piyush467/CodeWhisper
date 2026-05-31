const User = require('../models/User');
const passwordService = require('../services/auth/passwordService');
const jwtService = require('../services/auth/jwtService');
const logger = require('../utils/logger');
const asyncHandler = require('../middlewares/asyncHandler');
const CONSTANTS = require('../utils/constants');

const authController = {
  /**
   * @desc    Register a new user
   * @route   POST /api/auth/register
   * @access  Public
   */
  register: asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: CONSTANTS.ERRORS.AUTH.DUPLICATE_EMAIL
      });
    }

    // Hash the password
    const hashedPassword = await passwordService.hashPassword(password);

    // Create the user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Generate JWT
    const token = jwtService.generateToken({ id: user._id, email: user.email });

    // Set JWT in HTTP-only Cookie
    res.cookie('token', token, jwtService.getCookieOptions());

    logger.info(`User registered successfully: ${user.email} (${user._id})`);

    // Return profile
    return res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  }),

  /**
   * @desc    Login existing user
   * @route   POST /api/auth/login
   * @access  Public
   */
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Verify user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: CONSTANTS.ERRORS.AUTH.INVALID_CREDENTIALS
      });
    }

    // Check password
    const isMatch = await passwordService.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: CONSTANTS.ERRORS.AUTH.INVALID_CREDENTIALS
      });
    }

    // Generate JWT
    const token = jwtService.generateToken({ id: user._id, email: user.email });

    // Set Cookie
    res.cookie('token', token, jwtService.getCookieOptions());

    logger.info(`User logged in: ${user.email}`);

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  }),

  /**
   * @desc    Logout user & Clear cookie
   * @route   POST /api/auth/logout
   * @access  Public
   */
  logout: asyncHandler(async (req, res) => {
    // Clear cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax'
    });

    logger.info('User logged out');

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  }),

  /**
   * @desc    Get current authenticated user profile
   * @route   GET /api/auth/me
   * @access  Private
   */
  me: asyncHandler(async (req, res) => {
    // req.user was populated by the protect middleware
    return res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
      }
    });
  })
};

module.exports = authController;
