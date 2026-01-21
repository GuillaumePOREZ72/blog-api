# 📝 Blog API

A production-ready RESTful API for modern blogging platforms, built with **Express.js v5**, **TypeScript**, and **MongoDB**.

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8.x-47A248?logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-Apache%202.0-blue)

---

## ⚡ Quick Start

```bash
# 1. Clone & Install
git clone https://github.com/GuillaumePOREZ72/blog-api.git
cd blog-api && npm install

# 2. Configure
cp .env.example .env # Ensure you fill in the required variables

# 3. Launch
npm run dev
```

> [!TIP]
> Use `npm run build` then `npm start` for production environments.

---

## ✨ Core Features

- 🔐 **Dual-Token Auth**: Secure JWT-based authentication with Access and Refresh tokens (HttpOnly cookies).
- 🛡️ **RBAC**: Role-Based Access Control (Admin vs. User) for granular permissions.
- 📝 **Blog Engine**: Full CRUD for blogs with automated slug generation and content sanitization.
- 💬 **Interactions**: Deeply integrated comment and like systems.
- ☁️ **Media Management**: Direct image uploads to Cloudinary for blog banners.
- 🔒 **Hardened Security**: Pre-configured with Helmet, CORS, Rate Limiting, and XSS protection.
- 📚 **OpenAPI Documentation**: Fully interactive Swagger UI for API testing.

---

## 🏗️ Architecture

```text
src/
├── controllers/v1/   # Business logic (Auth, Blog, Comment, Like, User)
├── lib/              # External integrations (Cloudinary, JWT, Mongoose, Swagger, Winston)
├── middlewares/      # Auth guards, Permission checks, and Error handlers
├── models/           # Mongoose schemas (Type-safe models)
├── routes/v1/        # API endpoint definitions
├── server.ts         # Application entry point & Middleware orchestration
└── config/           # Environment-driven configuration
```

---

## ⚙️ Configuration

Create a `.env` file in the root directory:

| Variable                | Description                   | Default    |
| :---------------------- | :---------------------------- | :--------- |
| `PORT`                  | API listening port            | `3000`     |
| `MONGO_URI`             | MongoDB connection string     | `required` |
| `JWT_ACCESS_SECRET`     | Secret key for access tokens  | `required` |
| `JWT_REFRESH_SECRET`    | Secret key for refresh tokens | `required` |
| `ACCESS_TOKEN_EXPIRY`   | Duration (e.g., `15m`, `1h`)  | `15m`      |
| `REFRESH_TOKEN_EXPIRY`  | Duration (e.g., `7d`, `30d`)  | `7d`       |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary credentials        | `required` |
| `WHITELIST_ADMINS_MAIL` | Comma-separated admin emails  | `required` |

---

## 📚 API Documentation

Once the server is running, explore the API endpoints via Swagger:

- **Local UI**: [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)
- **Production**: [https://blog-api-9dch.onrender.com/api-docs/](https://blog-api-9dch.onrender.com/api-docs/)

---

## 🛠️ Development Scripts

- `npm run dev`: Start development server with hot-reload via `nodemon`.
- `npm run build`: Compile TypeScript to optimized JavaScript in `/dist`.
- `npm start`: Run the production build.

---

## 🛡️ Security Implementation

| Layer            | Technology           | Purpose                                         |
| :--------------- | :------------------- | :---------------------------------------------- |
| **Headers**      | `helmet`             | Protects against common web vulnerabilities.    |
| **Rate Limit**   | `express-rate-limit` | Prevents Brute-force and DoS attacks.           |
| **Auth**         | `jsonwebtoken`       | Stateless authentication via signed tokens.     |
| **Sanitization** | `dompurify`          | Strips malicious scripts from user HTML input.  |
| **Validation**   | `express-validator`  | Strict schema validation for all incoming data. |

---

## 📄 License

Distributed under the [Apache 2.0](LICENSE) License.

---

Crafted with ❤️ by [Guillaume POREZ](https://github.com/GuillaumePOREZ72)
