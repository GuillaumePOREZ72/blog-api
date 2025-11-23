/**
 * Custom modules
 */
import { logger } from '@/lib/winston';

/**
 * Models
 */
import blog from '@/models/blog';

/**
 * Types
 */
import type { Request, Response, NextFunction } from 'express';

/**
 * Constants
 */
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const uploadBlogBanner = (method: 'post' | 'put') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (method === 'put' && !req.file) {
      next();
      return;
    }

    if (!req.file) {
      res.status(400).json({
        code: 'ValidationError',
        message: 'Blog banner is required',
      });
      return;
    }

    if (req.file.size > MAX_FILE_SIZE) {
      res.status(413).json({
        code: 'ValidationError',
        message: 'File size must be less than 2MB',
      });
      return;
    }

    try {
      const { blogId } = req.params;
      const blog = 
    } catch (error) {}
  };
};

export default uploadBlogBanner;
