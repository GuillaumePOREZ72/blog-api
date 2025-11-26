# Blog API - AI Agent Instructions

## Architecture Overview

This is a RESTful blog API built with Express.js, TypeScript, MongoDB (Mongoose), and JWT authentication. The project follows a modular, feature-based architecture with strict separation of concerns.

**Key Components:**

- `src/server.ts` - Express server setup with middleware stack (CORS, rate limiting, helmet, compression)
- `src/routes/v1/` - Versioned API routes mounted at `/api/v1`
- `src/controllers/v1/` - Business logic organized by feature (auth, blog, comment, like, user)
- `src/models/` - Mongoose schemas with built-in validation
- `src/middlewares/` - Reusable middleware chain (authenticate → authorize → validationError)
- `src/lib/` - External service integrations (JWT, Cloudinary, Winston logger, MongoDB, Swagger)

## Authentication & Authorization Flow

**Two-layer security pattern:**

1. `authenticate` middleware - Verifies JWT from `Authorization: Bearer <token>` header, attaches `req.userId`
2. `authorize(['admin', 'user'])` middleware - Checks user role from database

```typescript
// Example from src/routes/v1/blog.ts
router.post(
  '/',
  authenticate, // First: verify token, set req.userId
  authorize(['admin']), // Second: check role against DB
  validationError, // Third: validate request
  createBlog, // Finally: execute controller
);
```

**Token Pattern:**

- Access tokens (short-lived) - stored in response JSON
- Refresh tokens (long-lived) - stored in httpOnly cookies
- Refresh token records persist in `Token` model for revocation

## Route Definition Pattern

All routes follow this consistent middleware chain:

1. **Validation** - `express-validator` rules defined inline
2. **validationError** - Middleware that checks validation results and returns structured errors
3. **Authentication/Authorization** - If endpoint requires auth
4. **File Upload** - Multer + custom upload middleware (e.g., `uploadBlogBanner`)
5. **Controller** - Business logic

```typescript
// Standard pattern from src/routes/v1/auth.ts
router.post(
  '/register',
  body('email')
    .trim()
    .notEmpty()
    .isEmail()
    .custom(async (value) => {
      // Custom validation: check database
    }),
  body('password').isLength({ min: 8 }),
  validationError, // ALWAYS after validators
  register, // Controller
);
```

## Controller Structure

Controllers are single-function exports handling one endpoint each. They:

- Extract data from `req.body`, `req.params`, `req.query`
- Access authenticated user via `req.userId` (set by authenticate middleware)
- Use try-catch with consistent error responses
- Log operations with Winston logger

**Error Response Format:**

```typescript
res.status(code).json({
  code: 'ValidationError' | 'AuthenticationError' | 'ServerError',
  message: 'Human readable message',
  errors?: {} // For validation errors
});
```

## Database Patterns

**Mongoose Schema Conventions:**

- Use TypeScript interfaces exported as `IModelName`
- Auto-generate unique fields (slug, username) in `pre('validate')` hooks
- Password hashing in `pre('save')` hook (see `src/models/user.ts`)
- Reference other models using `Schema.Types.ObjectId` with `ref`
- Timestamps enabled: `{ timestamps: true }` or custom names like `publishedAt`

**Example from src/models/blog.ts:**

```typescript
blogSchema.pre('validate', function (next) {
  if (this.title && !this.slug) {
    this.slug = genSlug(this.title); // Auto-generate slug
  }
  next();
});
```

## Path Aliases

TypeScript paths configured in `tsconfig.json`:

```typescript
import config from '@/config'; // → src/config
import User from '@/models/user'; // → src/models/user
import { logger } from '@/lib/winston'; // → src/lib/winston
```

**Always use `@/` prefix** for internal imports. Requires `tsconfig-paths/register` (configured in nodemon).

## Development Workflow

**Run dev server:**

```bash
npm run dev  # Nodemon watches src/, auto-restarts on .ts changes
```

**Environment variables required:**

```
MONGO_URI, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET,
ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY,
CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
```

## API Documentation (Swagger/OpenAPI)

The API is documented using Swagger/OpenAPI 3.0 with `swagger-jsdoc` and `swagger-ui-express`.

**Configuration:** `src/lib/swagger.ts`

**Access URLs:**

- Local: `http://localhost:3000/api-docs/`
- Production: `https://blog-api-9dch.onrender.com/api-docs/`

**Documentation Pattern:**

All routes are annotated with JSDoc comments using the `@openapi` tag:

```typescript
/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login user
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
 */
router.post('/login', ...);
```

**Schemas defined in `swagger.ts`:**

- User, SocialLinks, Blog, Banner, Comment, Like
- RegisterInput, LoginInput, AuthResponse
- ValidationError, AuthenticationError, ServerError
- PaginatedBlogs, PaginatedUsers

**When adding new routes:** Always add the corresponding `@openapi` annotation above the route definition.

## Security & Content Handling

**DOMPurify integration** - All user-generated HTML content (blog posts) sanitized before saving:

```typescript
// Pattern from src/controllers/v1/blog/create_blog.ts
const window = new JSDOM('').window;
const purify = DOMPurify(window);
const cleanContent = purify.sanitize(content);
```

**Role-based admin restrictions:**

- Admin registration restricted to `WHITELIST_ADMINS_MAIL` emails (see `src/config/index.ts`)
- Blog CRUD operations limited to admin role
- Comments/likes available to all authenticated users

## File Upload Pattern

Custom middleware `uploadBlogBanner` handles Cloudinary integration:

- Validates file size (2MB max)
- Uploads to Cloudinary with overwrite support
- Updates existing image if `blogId` provided (PUT requests)
- Attaches banner data to `req.body.banner` for controller consumption

**Usage pattern:**

```typescript
(upload.single('banner_image'), // Multer captures file
  uploadBlogBanner('post'), // Upload to Cloudinary, set req.body.banner
  createBlog); // Controller receives banner in req.body
```

## Type Safety Extensions

Custom Express types in `src/@types/express/index.d.ts` extend Request:

```typescript
interface Request {
  userId?: Types.ObjectId; // Set by authenticate middleware
}
```

Register custom types in `tsconfig.json` via `typeRoots: ["./src/@types"]`.

## Common Gotchas

1. **Validation must precede controller** - Always put `validationError` middleware before controller function
2. **Password field excluded by default** - Use `.select('password')` when querying User model for authentication
3. **Slugs auto-generated** - Don't manually set slug field; generated from title in model hook
4. **File uploads require multer** - Even for Cloudinary uploads, use `multer()` to parse multipart/form-data
5. **Refresh tokens in cookies** - Don't send refresh token in JSON response; use httpOnly cookie only
