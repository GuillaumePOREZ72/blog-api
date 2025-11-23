import { Router } from 'express';
import { param, query, body } from 'express-validator';
import multer from 'multer';

/**
 * Middlewares
 */
import authenticate from '@/middlewares/authenticate';
import validationError from '@/middlewares/validationError';
import authorize from '@/middlewares/authorize';
import uploadBlogBanner from '@/middlewares/uploadBlogBanner';

/**
 * Controllers
 */
import createBlog from '@/controllers/v1/blog/create_blog';

const upload = multer();

const router = Router();

router.post(
  '/',
  authorize(['admin']),
  upload.single('banner_image'),
  uploadBlogBanner('post'),
  createBlog,
);

export default router;
