import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      version: '1.0.0',
      description:
        'RESTful API for blog management with JWT authentication. This API allows users to create, read, update and delete blog posts, comments, and likes.',
      contact: {
        name: 'Guillaume POREZ',
        url: 'https://github.com/GuillaumePOREZ72',
      },
    },
    servers: [
      {
        url: '/api/v1',
        description: 'API v1',
      },
    ],
    tags: [
      {
        name: 'Auth',
        description: 'Authentication endpoints (register, login, logout)',
      },
      {
        name: 'Users',
        description: 'User management endpoints',
      },
      {
        name: 'Blogs',
        description: 'Blog posts management endpoints',
      },
      {
        name: 'Comments',
        description: 'Comments on blog posts',
      },
      {
        name: 'Likes',
        description: 'Like/unlike blog posts',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT access token',
        },
      },
      schemas: {
        // User schemas
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'User unique identifier',
              example: '507f1f77bcf86cd799439011',
            },
            username: {
              type: 'string',
              description: 'Unique username',
              maxLength: 20,
              example: 'johndoe',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              maxLength: 50,
              example: 'john@example.com',
            },
            role: {
              type: 'string',
              enum: ['admin', 'user'],
              description: 'User role',
              example: 'user',
            },
            firstName: {
              type: 'string',
              maxLength: 20,
              example: 'John',
            },
            lastName: {
              type: 'string',
              maxLength: 20,
              example: 'Doe',
            },
            socialLinks: {
              $ref: '#/components/schemas/SocialLinks',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        SocialLinks: {
          type: 'object',
          properties: {
            website: {
              type: 'string',
              format: 'uri',
              maxLength: 100,
            },
            facebook: {
              type: 'string',
              format: 'uri',
              maxLength: 100,
            },
            instagram: {
              type: 'string',
              format: 'uri',
              maxLength: 100,
            },
            linkedin: {
              type: 'string',
              format: 'uri',
              maxLength: 100,
            },
            x: {
              type: 'string',
              format: 'uri',
              maxLength: 100,
            },
            youtube: {
              type: 'string',
              format: 'uri',
              maxLength: 100,
            },
          },
        },
        // Blog schemas
        Blog: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Blog unique identifier',
              example: '507f1f77bcf86cd799439011',
            },
            title: {
              type: 'string',
              maxLength: 180,
              description: 'Blog post title',
              example: 'My First Blog Post',
            },
            slug: {
              type: 'string',
              description: 'URL-friendly slug (auto-generated from title)',
              example: 'my-first-blog-post',
            },
            content: {
              type: 'string',
              description: 'Blog post content (HTML allowed, sanitized)',
              example: '<p>This is my blog content...</p>',
            },
            banner: {
              $ref: '#/components/schemas/Banner',
            },
            author: {
              type: 'string',
              description: 'Author user ID',
              example: '507f1f77bcf86cd799439011',
            },
            viewsCount: {
              type: 'integer',
              default: 0,
            },
            likesCount: {
              type: 'integer',
              default: 0,
            },
            commentsCount: {
              type: 'integer',
              default: 0,
            },
            status: {
              type: 'string',
              enum: ['draft', 'published'],
              default: 'draft',
            },
            publishedAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Banner: {
          type: 'object',
          properties: {
            publicId: {
              type: 'string',
              description: 'Cloudinary public ID',
            },
            url: {
              type: 'string',
              format: 'uri',
              description: 'Banner image URL',
            },
            width: {
              type: 'integer',
              description: 'Image width in pixels',
            },
            height: {
              type: 'integer',
              description: 'Image height in pixels',
            },
          },
        },
        // Comment schema
        Comment: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Comment unique identifier',
            },
            blogId: {
              type: 'string',
              description: 'Associated blog post ID',
            },
            userId: {
              type: 'string',
              description: 'Comment author user ID',
            },
            content: {
              type: 'string',
              maxLength: 1000,
              description: 'Comment content',
            },
          },
        },
        // Like schema
        Like: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
            },
            blogId: {
              type: 'string',
              description: 'Liked blog post ID',
            },
            userId: {
              type: 'string',
              description: 'User who liked',
            },
          },
        },
        // Auth schemas
        RegisterInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              maxLength: 50,
              example: 'user@example.com',
            },
            password: {
              type: 'string',
              minLength: 8,
              example: 'securepassword123',
            },
            role: {
              type: 'string',
              enum: ['admin', 'user'],
              description: 'Role (admin requires whitelisted email)',
            },
          },
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'user@example.com',
            },
            password: {
              type: 'string',
              minLength: 8,
              example: 'securepassword123',
            },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            accessToken: {
              type: 'string',
              description: 'JWT access token',
            },
            user: {
              $ref: '#/components/schemas/User',
            },
          },
        },
        // Error schemas
        ValidationError: {
          type: 'object',
          properties: {
            code: {
              type: 'string',
              example: 'ValidationError',
            },
            message: {
              type: 'string',
              example: 'Validation failed',
            },
            errors: {
              type: 'object',
              additionalProperties: {
                type: 'string',
              },
            },
          },
        },
        AuthenticationError: {
          type: 'object',
          properties: {
            code: {
              type: 'string',
              example: 'AuthenticationError',
            },
            message: {
              type: 'string',
              example: 'Invalid or expired token',
            },
          },
        },
        ServerError: {
          type: 'object',
          properties: {
            code: {
              type: 'string',
              example: 'ServerError',
            },
            message: {
              type: 'string',
              example: 'Internal server error',
            },
          },
        },
        // Pagination
        PaginatedBlogs: {
          type: 'object',
          properties: {
            blogs: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Blog',
              },
            },
            total: {
              type: 'integer',
            },
            limit: {
              type: 'integer',
            },
            offset: {
              type: 'integer',
            },
          },
        },
        PaginatedUsers: {
          type: 'object',
          properties: {
            users: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/User',
              },
            },
            total: {
              type: 'integer',
            },
            limit: {
              type: 'integer',
            },
            offset: {
              type: 'integer',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/v1/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
