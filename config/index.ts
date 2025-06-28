import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/rim_poulets",
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",
  nodeEnv: process.env.NODE_ENV || "development",
  bcryptSaltRounds: 10,
  corsOrigin: process.env.CORS_ORIGIN || "*",
  uploadDir: process.env.UPLOAD_DIR || "uploads",
  maxFileSize: process.env.MAX_FILE_SIZE || "5mb",
};
