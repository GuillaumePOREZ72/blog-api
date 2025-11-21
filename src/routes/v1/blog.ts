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
import createBlog from '@/controllers/v1/blog/create_blog';

const router = Router();

router.post('/', authorize(['admin']), createBlog);

export default router;
