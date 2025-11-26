# 📝 Blog API

Une API RESTful moderne pour gérer un blog, construite avec **Express.js**, **TypeScript**, **MongoDB** et **JWT**.

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8.x-47A248?logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-Apache%202.0-blue)

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Architecture](#-architecture)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Lancement](#-lancement)
- [Endpoints API](#-endpoints-api)
- [Authentification](#-authentification)
- [Modèles de données](#-modèles-de-données)
- [Sécurité](#-sécurité)
- [Licence](#-licence)

## ✨ Fonctionnalités

- 🔐 **Authentification JWT** - Tokens d'accès et de rafraîchissement sécurisés
- 👥 **Gestion des utilisateurs** - Inscription, connexion, profils avec liens sociaux
- 📝 **Gestion des blogs** - CRUD complet avec bannières images
- 💬 **Commentaires** - Système de commentaires sur les articles
- ❤️ **Likes** - Système de likes/unlikes
- 🛡️ **Rôles & Permissions** - Admin et utilisateur avec autorisations granulaires
- ☁️ **Upload d'images** - Intégration Cloudinary pour les bannières
- 🧹 **Sanitization HTML** - Protection XSS avec DOMPurify
- ⚡ **Performance** - Compression gzip, rate limiting, caching headers

## 🏗️ Architecture

```
src/
├── @types/           # Types TypeScript personnalisés
├── config/           # Configuration de l'application
├── controllers/v1/   # Logique métier par fonctionnalité
│   ├── auth/         # Authentification (register, login, logout, refresh)
│   ├── blog/         # CRUD blogs
│   ├── comment/      # Gestion des commentaires
│   ├── like/         # Système de likes
│   └── user/         # Gestion des utilisateurs
├── lib/              # Intégrations externes
│   ├── cloudinary.ts # Upload d'images
│   ├── jwt.ts        # Gestion des tokens
│   ├── mongoose.ts   # Connexion MongoDB
│   └── winston.ts    # Logging
├── middlewares/      # Middlewares Express
│   ├── authenticate.ts
│   ├── authorize.ts
│   └── validationError.ts
├── models/           # Schémas Mongoose
├── routes/v1/        # Définition des routes API
├── utils/            # Utilitaires
└── server.ts         # Point d'entrée
```

## 📦 Prérequis

- **Node.js** >= 18.x
- **npm** >= 9.x
- **MongoDB** >= 6.x (local ou Atlas)
- **Compte Cloudinary** (pour l'upload d'images)

## 🚀 Installation

```bash
# Cloner le repository
git clone https://github.com/GuillaumePOREZ72/blog-api.git
cd blog-api

# Installer les dépendances
npm install
```

## ⚙️ Configuration

Créer un fichier `.env` à la racine du projet :

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/blog-api

# JWT
JWT_ACCESS_SECRET=your_access_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_key_here
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Logging
LOG_LEVEL=info
```

## 🏃 Lancement

```bash
# Mode développement (avec hot-reload)
npm run dev

# L'API sera disponible sur http://localhost:3000
```

## 📡 Endpoints API

Base URL: `/api/v1`

### Santé

| Méthode | Endpoint | Description     |
| ------- | -------- | --------------- |
| `GET`   | `/`      | Statut de l'API |

### Authentification (`/auth`)

| Méthode | Endpoint         | Description         | Auth |
| ------- | ---------------- | ------------------- | ---- |
| `POST`  | `/register`      | Inscription         | ❌   |
| `POST`  | `/login`         | Connexion           | ❌   |
| `POST`  | `/refresh-token` | Rafraîchir le token | 🍪   |
| `POST`  | `/logout`        | Déconnexion         | ✅   |

### Utilisateurs (`/users`)

| Méthode  | Endpoint   | Description                 | Auth | Rôle  |
| -------- | ---------- | --------------------------- | ---- | ----- |
| `GET`    | `/current` | Profil utilisateur connecté | ✅   | All   |
| `PUT`    | `/current` | Modifier son profil         | ✅   | All   |
| `DELETE` | `/current` | Supprimer son compte        | ✅   | All   |
| `GET`    | `/`        | Liste tous les utilisateurs | ✅   | Admin |
| `GET`    | `/:userId` | Détail d'un utilisateur     | ✅   | Admin |
| `DELETE` | `/:userId` | Supprimer un utilisateur    | ✅   | Admin |

### Blogs (`/blogs`)

| Méthode  | Endpoint        | Description            | Auth | Rôle  |
| -------- | --------------- | ---------------------- | ---- | ----- |
| `POST`   | `/`             | Créer un blog          | ✅   | Admin |
| `GET`    | `/`             | Liste des blogs        | ✅   | All   |
| `GET`    | `/user/:userId` | Blogs d'un utilisateur | ✅   | All   |
| `GET`    | `/:slug`        | Détail d'un blog       | ✅   | All   |
| `PUT`    | `/:blogId`      | Modifier un blog       | ✅   | Admin |
| `DELETE` | `/:blogId`      | Supprimer un blog      | ✅   | Admin |

### Commentaires (`/comments`)

| Méthode  | Endpoint        | Description              | Auth |
| -------- | --------------- | ------------------------ | ---- |
| `POST`   | `/blog/:blogId` | Commenter un blog        | ✅   |
| `GET`    | `/blog/:blogId` | Commentaires d'un blog   | ✅   |
| `DELETE` | `/:commentId`   | Supprimer un commentaire | ✅   |

### Likes (`/likes`)

| Méthode  | Endpoint        | Description      | Auth |
| -------- | --------------- | ---------------- | ---- |
| `POST`   | `/blog/:blogId` | Liker un blog    | ✅   |
| `DELETE` | `/blog/:blogId` | Retirer son like | ✅   |

## 🔐 Authentification

L'API utilise un système JWT à double token :

### Token d'accès (Access Token)

- Durée de vie courte (configurable via `ACCESS_TOKEN_EXPIRY`)
- Envoyé dans le header : `Authorization: Bearer <token>`
- Utilisé pour authentifier les requêtes

### Token de rafraîchissement (Refresh Token)

- Durée de vie longue (configurable via `REFRESH_TOKEN_EXPIRY`)
- Stocké dans un cookie HTTP-only sécurisé
- Permet de renouveler le token d'accès

### Exemple d'utilisation

```bash
# 1. Inscription
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'

# 2. Connexion
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'

# 3. Requête authentifiée
curl -X GET http://localhost:3000/api/v1/users/current \
  -H "Authorization: Bearer <access_token>"
```

## 📊 Modèles de données

### User

```typescript
{
  username: string,      // Auto-généré, unique
  email: string,         // Unique
  password: string,      // Hashé avec bcrypt
  role: 'admin' | 'user',
  firstName?: string,
  lastName?: string,
  socialLinks?: {
    website?, facebook?, instagram?,
    linkedin?, x?, youtube?
  }
}
```

### Blog

```typescript
{
  title: string,
  slug: string,          // Auto-généré depuis le titre
  content: string,       // HTML sanitisé
  banner: {
    publicId: string,
    url: string,
    width: number,
    height: number
  },
  author: ObjectId,      // Référence User
  viewsCount: number,
  likesCount: number,
  commentsCount: number,
  status: 'draft' | 'published',
  publishedAt: Date
}
```

### Comment

```typescript
{
  content: string,
  author: ObjectId,      // Référence User
  blog: ObjectId         // Référence Blog
}
```

### Like

```typescript
{
  user: ObjectId,        // Référence User
  blog: ObjectId         // Référence Blog
}
```

## 🛡️ Sécurité

L'API implémente plusieurs couches de sécurité :

| Fonctionnalité        | Description                                 |
| --------------------- | ------------------------------------------- |
| **Helmet**            | Headers HTTP sécurisés                      |
| **CORS**              | Origines autorisées configurables           |
| **Rate Limiting**     | Protection contre les abus                  |
| **bcrypt**            | Hashage des mots de passe (salt rounds: 10) |
| **JWT**               | Tokens signés avec secrets séparés          |
| **DOMPurify**         | Sanitization du contenu HTML                |
| **express-validator** | Validation des entrées                      |
| **Cookie HTTP-only**  | Protection XSS pour refresh tokens          |

### Restriction Admin

Seuls les emails présents dans `WHITELIST_ADMINS_MAIL` peuvent s'enregistrer avec le rôle `admin`.

## 📝 Format des réponses

### Succès

```json
{
  "message": "Operation successful",
  "data": { ... }
}
```

### Erreur

```json
{
  "code": "ValidationError",
  "message": "Description de l'erreur",
  "errors": { ... }
}
```

## 🔧 Scripts disponibles

```bash
npm run dev      # Démarre le serveur en mode développement
```

## 📄 Licence

Ce projet est sous licence [Apache 2.0](LICENSE).

---

Développé avec ❤️ par [Guillaume POREZ](https://github.com/GuillaumePOREZ72)
