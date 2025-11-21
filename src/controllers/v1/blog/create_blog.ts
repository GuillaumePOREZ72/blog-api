/**
 * Node modules
 */
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

/**
 * Custom modules
 */
import { logger } from '@/lib/winston';

/**
 * Models
 */

/**
 * Types
 */
import type { Request, Response } from 'express';

/**
 * Purify the blog content
 */
const window = new JSDOM('').window;
const purify = DOMPurify(window);

const createBlog = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId = req.userId;
  try {
    await User.deleteOne({
      _id: userId,
    });
    logger.info('A user account has been deleted', { userId });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: error,
    });

    logger.error('Error during blog creation', error);
  }
};

export default createBlog;

