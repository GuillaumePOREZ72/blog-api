import { Router } from 'express';
import { param, query, body } from 'express-validator';

/**
 * Middlewares
 */
import authenticate from '@/middlewares/authenticate';
import validationError from '@/middlewares/validationError';
import authorize from '@/middlewares/authorize';

/**
 * Controllers
 */
import getCurrentUser from '@/controllers/v1/user/get_current_user';
import updateCurrentUser from '@/controllers/v1/user/update_current_user';
import deleteCurrentUser from '@/controllers/v1/user/delete_current_user';
import getAllUser from '@/controllers/v1/user/get_all_user';
import getUser from '@/controllers/v1/user/get_user';
import deleteUser from '@/controllers/v1/user/delete_user';

/**
 * Models
 */
import User from '@/models/user';

const router = Router();

/**
 * @openapi
 * /users/current:
 *   get:
 *     summary: Get current user profile
 *     description: Retrieves the profile of the currently authenticated user.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationError'
 */
router.get(
  '/current',
  authenticate,
  authorize(['admin', 'user']),
  getCurrentUser,
);

/**
 * @openapi
 * /users/current:
 *   put:
 *     summary: Update current user profile
 *     description: Updates the profile of the currently authenticated user.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 maxLength: 20
 *                 description: New username (must be unique)
 *               email:
 *                 type: string
 *                 format: email
 *                 maxLength: 50
 *                 description: New email address (must be unique)
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 description: New password
 *               first_name:
 *                 type: string
 *                 maxLength: 20
 *               last_name:
 *                 type: string
 *                 maxLength: 20
 *               website:
 *                 type: string
 *                 format: uri
 *                 maxLength: 100
 *               facebook:
 *                 type: string
 *                 format: uri
 *                 maxLength: 100
 *               instagram:
 *                 type: string
 *                 format: uri
 *                 maxLength: 100
 *               linkedin:
 *                 type: string
 *                 format: uri
 *                 maxLength: 100
 *               x:
 *                 type: string
 *                 format: uri
 *                 maxLength: 100
 *                 description: X (Twitter) profile URL
 *               youtube:
 *                 type: string
 *                 format: uri
 *                 maxLength: 100
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationError'
 */
router.put(
  '/current',
  authenticate,
  authorize(['admin', 'user']),
  body('username')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Username must be less than 20 characters')
    .custom(async (value) => {
      const userExists = await User.exists({ username: value });

      if (userExists) {
        throw new Error('This username is already in use');
      }
    }),
  body('email')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Email must be less than 50 characters')
    .isEmail()
    .withMessage('Invalid email address')
    .custom(async (value) => {
      const userExists = await User.exists({ email: value });

      if (userExists) {
        throw new Error('This email is already in use');
      }
    }),
  body('password')
    .optional()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('first_name')
    .optional()
    .isLength({ max: 20 })
    .withMessage('First name must be less than 20 characters'),
  body('last_name')
    .optional()
    .isLength({ max: 20 })
    .withMessage('Last name must be less than 20 characters'),
  body(['website', 'facebook', 'instagram', 'linkedin', 'x', 'youtube'])
    .optional()
    .isURL()
    .withMessage('Invalid URL')
    .isLength({ max: 100 })
    .withMessage('Url must be less than 20 characters'),
  validationError,
  updateCurrentUser,
);

/**
 * @openapi
 * /users/current:
 *   delete:
 *     summary: Delete current user account
 *     description: Permanently deletes the currently authenticated user's account.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Account deleted successfully
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationError'
 */
router.delete(
  '/current',
  authenticate,
  authorize(['admin', 'user']),
  deleteCurrentUser,
);

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users (Admin only)
 *     description: Retrieves a paginated list of all users. Requires admin role.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Number of items to skip
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedUsers'
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationError'
 *       403:
 *         description: Forbidden - Admin role required
 */
router.get(
  '/',
  authenticate,
  authorize(['admin']),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 to 50'),
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Offset must be a positive integer'),
  validationError,
  getAllUser,
);

/**
 * @openapi
 * /users/{userId}:
 *   get:
 *     summary: Get user by ID (Admin only)
 *     description: Retrieves a specific user's profile by their ID. Requires admin role.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid user ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationError'
 *       403:
 *         description: Forbidden - Admin role required
 *       404:
 *         description: User not found
 */
router.get(
  '/:userId',
  authenticate,
  authorize(['admin']),
  param('userId').notEmpty().isMongoId().withMessage('Invalid user ID'),
  validationError,
  getUser,
);

/**
 * @openapi
 * /users/{userId}:
 *   delete:
 *     summary: Delete user by ID (Admin only)
 *     description: Permanently deletes a user account by their ID. Requires admin role.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       400:
 *         description: Invalid user ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationError'
 *       403:
 *         description: Forbidden - Admin role required
 *       404:
 *         description: User not found
 */
router.delete(
  '/:userId',
  authenticate,
  authorize(['admin']),
  param('userId').notEmpty().isMongoId().withMessage('Invalid user ID'),
  validationError,
  deleteUser,
);

export default router;
