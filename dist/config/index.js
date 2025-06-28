"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/rim_poulets",
    jwtSecret: process.env.JWT_SECRET || "your-secret-key",
    nodeEnv: process.env.NODE_ENV || "development",
    bcryptSaltRounds: 10,
    corsOrigin: process.env.CORS_ORIGIN || "*",
    uploadDir: process.env.UPLOAD_DIR || "uploads",
    maxFileSize: process.env.MAX_FILE_SIZE || "5mb",
};
