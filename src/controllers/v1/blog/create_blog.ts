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
const 