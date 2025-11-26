import { Router } from 'express';
import { body, cookie } from 'express-validator';
import bcrypt from 'bcrypt';

/**
 * Controllers
 */
import register from '@/controllers/v1/auth/register';
import login from '@/controllers/v1/auth/login';
import refreshToken from '@/controllers/v1/auth/refresh_token';
import logout from '@/controllers/v1/auth/logout';

/**
 * Middlewares
 */
import validationError from '@/middlewares/validationError';
import authenticate from '@/middlewares/authenticate';

/**
 * Models
 */
import User from '@/models/user';

const router = Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account. Admin role requires a whitelisted email address.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *         headers:
 *           Set-Cookie:
 *             description: Refresh token cookie (httpOnly)
 *             schema:
 *               type: string
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 */
router.post(
  '/register',
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isLength({ max: 50 })
    .withMessage('Email must be less than 50 characters')
    .isEmail()
    .withMessage('Invalid email address')
    .custom(async (value) => {
      const userExists = await User.exists({ email: value });
      if (userExists) {
        throw new Error('Email already in use');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.'),
  body('role')
    .optional()
    .isString()
    .withMessage('Role must be a string')
    .isIn(['admin', 'user'])
    .withMessage('Role must be either admin or user'),
  validationError,
  register,
);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticates a user and returns access token. Refresh token is set in httpOnly cookie.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *         headers:
 *           Set-Cookie:
 *             description: Refresh token cookie (httpOnly)
 *             schema:
 *               type: string
 *       400:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 */
router.post(
  '/login',
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isLength({ max: 50 })
    .withMessage('Email must be less than 50 characters')
    .isEmail()
    .withMessage('Invalid email address')
    .custom(async (value) => {
      const userExists = await User.exists({ email: value });
      if (!userExists) {
        throw new Error('User email or password is invalid');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.')
    .custom(async (value, { req }) => {
      const { email } = req.body as { email: string };
      const user = await User.findOne({ email })
        .select('password')
        .lean()
        .exec();

      if (!user) {
        throw new Error('User email or password is invalid');
      }

      const passwordMatch = await bcrypt.compare(value, user.password);

      if (!passwordMatch) {
        throw new Error('User email or password is invalid');
      }
    }),
  validationError,
  login,
);

/**
 * @openapi
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     description: Uses the refresh token from cookie to generate a new access token.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: New access token generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: New JWT access token
 *       400:
 *         description: Invalid or missing refresh token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Refresh token expired or revoked
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationError'
 */
router.post(
  '/refresh-token',
  cookie('refreshToken')
    .notEmpty()
    .withMessage('Refresh token required')
    .isJWT()
    .withMessage('Invalid refresh token'),
  validationError,
  refreshToken,
);

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Revokes the refresh token and clears the cookie.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged out successfully
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationError'
 */
router.post('/logout', authenticate, logout);
export default router;
