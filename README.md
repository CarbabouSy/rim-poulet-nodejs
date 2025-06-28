# 🐔 Node.js Aviculture App

A robust RESTful API built with **Node.js** for managing a broiler chicken farm. This application tracks critical production metrics such as weight, temperature, mortality rates, water consumption, vaccinations, and more. Designed for farmers and agricultural businesses, it provides a scalable solution for data management and monitoring.

## ✨ Features

- **Production Tracking**: Monitor chicken weight, mortality, water usage, and environmental conditions.
- **Vaccination Management**: Record and schedule vaccinations for the flock.
- **User Authentication**: Secure JWT-based authentication for user access.
- **Data Validation**: Input validation using Joi for reliable data integrity.
- **TypeScript Support**: Type-safe development for better maintainability.
- **MongoDB Integration**: Persistent storage with Mongoose for efficient data modeling.
- **Optional Firebase Sync**: Cloud synchronization for real-time data access (optional).

## 📦 Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB + Mongoose**: NoSQL database and ODM for data storage.
- **JWT**: JSON Web Tokens for secure authentication.
- **Joi**: Schema validation for API inputs.
- **TypeScript**: Static typing for improved code quality.
- **Firebase** (optional): Cloud storage and real-time synchronization.

## 📋 Prerequisites

- **Node.js**: Version 22.x or higher.
- **MongoDB**: A running MongoDB instance (local or cloud, e.g., MongoDB Atlas).
- **npm**: Version 10.x or higher.
- **Firebase** (optional): Firebase account and project setup if using cloud sync.
- A code editor (e.g., VS Code) for TypeScript development.

## 🚀 Installation

### 1. Clone the Repository

### Pour mettre en place l’environnement de development clonez d’abord le repository `(dépôt)`:

- En utilisant HTTP

```bash
   git clone https://github.com/CarbabouSy/rim-poulet-nodejs.git
   cd nodejs-aviculture-app
```

- En utilisant SSH

```bash
    git clone git@github.com:CarbabouSy/rim-poulet-nodejs.git
    cd nodejs-aviculture-app
```

### 2. Install Dependencies and Server Run

```bash
    npm setup
```

### 3. Configure Environment Variables

```bash
    cp .env.example .env
```

## Copy the example environment file and update it with your configuration `.env`:

```ini
# MongoDB connection string (e.g., MongoDB Atlas or local)
MONGODB_URI=mongodb://localhost:27017/aviculture

# JWT secret for authentication
JWT_SECRET=your_jwt_secret_here

# Port for the server
PORT=3000

NODE_ENV="development"
CORS_ORIGIN="*"
bcryptSaltRounds=10
CORS_ORIGIN="*"
UPLOAD_DIR="uploads"
MAX_FILE_SIZE="5mb"

# Firebase configuration (optional)
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY=your_firebase_private_key
```

Voici une version améliorée et bien formatée de votre tableau de documentation API en Markdown :

```markdown
# 📚 API Endpoints Reference

## Authentication

| Method | Endpoint             | Description               | Authentication | Request Body                              |
| ------ | -------------------- | ------------------------- | -------------- | ----------------------------------------- |
| `POST` | `/api/auth/register` | Register new user         | None           | `{ email, password, accountNumber, ... }` |
| `POST` | `/api/auth/login`    | Login (returns JWT token) | None           | `{ loginId (email/account), password }`   |

## Production Management

| Method | Endpoint          | Description            | Authentication | Parameters/Body                            |
| ------ | ----------------- | ---------------------- | -------------- | ------------------------------------------ |
| `GET`  | `/api/production` | Get production metrics | JWT Required   | `?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD` |
| `POST` | `/api/production` | Add production data    | JWT Required   | `{ date, quantity, mortalityRate, ... }`   |

## Vaccination Records

| Method | Endpoint            | Description              | Authentication | Parameters/Body                           |
| ------ | ------------------- | ------------------------ | -------------- | ----------------------------------------- |
| `GET`  | `/api/vaccinations` | List vaccination records | JWT Required   | `?poultryType=broiler&vaccineType=...`    |
| `POST` | `/api/vaccinations` | Add vaccination record   | JWT Required   | `{ date, vaccineType, batchNumber, ... }` |

## Flock Management

| Method | Endpoint      | Description      | Authentication | Parameters/Body                        |
| ------ | ------------- | ---------------- | -------------- | -------------------------------------- |
| `GET`  | `/api/flocks` | List all flocks  | JWT Required   | `?status=active`                       |
| `POST` | `/api/flocks` | Create new flock | JWT Required   | `{ startDate, poultryType, quantity }` |
```

### Usage Notes:

1. **Authentication**: Include JWT in `Authorization` header as `Bearer <token>`
2. **Base URL**: `https://api.aviculture-app.com/v1` (development: `http://localhost:3000`)
3. **Error Codes**:
   - `401 Unauthorized` - Invalid/missing token
   - `403 Forbidden` - Insufficient permissions
   - `404 Not Found` - Resource doesn't exist

📌 **Tip**: Use our [Postman Collection](link-to-postman-collection) for interactive testing.

🔗 [View Full API Documentation](/docs/api.md) | [OpenAPI Spec](/docs/openapi.yaml)

Améliorations apportées :

1. Organisation par catégories thématiques
2. Ajout des colonnes "Request Body" et "Parameters"
3. Informations supplémentaires sur l'utilisation
4. Style GitHub Flavored Markdown compatible
5. Liens vers la documentation complète
6. Notes utiles pour les développeurs

Vous pouvez adapter :

- Les endpoints spécifiques
- Les paramètres attendus
- Les exemples de corps de requête
- Les codes d'erreur personnalisés
- Les URL de base selon l'environnement

<!-- CONTRIBUTING -->

## Contributing

Contribuer
Les contributions sont ce qui rend la communauté open source un endroit incroyable pour apprendre, inspirer et créer. Toutes les contributions que vous apportez sont grandement appréciées.

Si vous avez une suggestion qui pourrait améliorer ce projet, veuillez forker le dépôt et créer une pull request. Vous pouvez également simplement ouvrir un problème avec le tag "amélioration". N'oubliez pas de donner une étoile au projet ! Merci encore !

1. Forkez le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Validez vos modifications (`git commit -m 'Ajouter une fonctionnalité AmazingFeature'`)
4. Poussez la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une pull request
