"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const router = express_1.default.Router();
const registerSchema = joi_1.default.object({
    username: joi_1.default.string().required().min(3),
    email: joi_1.default.string(),
    role: joi_1.default.string(),
    password: joi_1.default.string().required().min(6),
    accountNumber: joi_1.default.number().required().min(6),
});
const loginSchema = joi_1.default.object({
    // email: Joi.string().required().email(),
    password: joi_1.default.string().required(),
    accountNumber: joi_1.default.number().required(),
});
router.post("/register", (0, validationMiddleware_1.validate)(registerSchema), authController_1.register);
router.put("/user/:id", (0, validationMiddleware_1.validate)(registerSchema), authController_1.updateUser);
router.post("/login", (0, validationMiddleware_1.validate)(loginSchema), authController_1.login);
router.get("/user", authMiddleware_1.authenticateJWT, authController_1.getUser);
exports.default = router;
