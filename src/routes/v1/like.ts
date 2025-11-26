import { Router } from 'express';
import { body, param } from 'express-validator';

/**
 * Middlewares
 */
import authenticate from '@/middlewares/authenticate';
import authorize from '@/middlewares/authorize';
import validationError from '@/middlewares/validationError';

/**
 * Controllers
 */
import likeBlog from '@/controllers/v1/like/like_blog';
import unlikeBlog from '@/controllers/v1/like/unlike_blog';

const router = Router();

/**
 * @openapi
 * /likes/blog/{blogId}:
 *   post:
 *     summary: Like a blog post
 *     description: Adds a like to a specific blog post from a user.
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID (MongoDB ObjectId)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User ID who is liking the blog
 *     responses:
 *       201:
 *         description: Blog liked successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Like'
 *       400:
 *         description: Validation error or already liked
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
 *       404:
 *         description: Blog not found
 */
router.post(
  '/blog/:blogId',
  authenticate,
  authorize(['admin', 'user']),
  param('blogId').isMongoId().withMessage('Invalid blog ID'),
  body('userId')
    .notEmpty()
    .withMessage('User ID is required')
    .isMongoId()
    .withMessage('Invalid user ID'),
  validationError,
  likeBlog,
);

/**
 * @openapi
 * /likes/blog/{blogId}:
 *   delete:
 *     summary: Unlike a blog post
 *     description: Removes a like from a specific blog post.
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID (MongoDB ObjectId)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User ID who is unliking the blog
 *     responses:
 *       200:
 *         description: Blog unliked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Blog unliked successfully
 *       400:
 *         description: Validation error or not liked yet
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
 *       404:
 *         description: Like not found
 */
router.delete(
  '/blog/:blogId',
  authenticate,
  authorize(['admin', 'user']),
  param('blogId').isMongoId().withMessage('Invalid blog ID'),
  body('userId')
    .notEmpty()
    .withMessage('User ID is required')
    .isMongoId()
    .withMessage('Invalid user ID'),
  validationError,
  unlikeBlog,
);

export default router;
