"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const activationController_1 = require("../controllers/activationController");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const router = express_1.default.Router();
// 🛡️ Schéma de validation des activations
const activationSchema = joi_1.default.object({
    deviceId: joi_1.default.string().required().label("Device ID"),
    isActive: joi_1.default.boolean().required().label("Statut d’activation"),
    expiresAt: joi_1.default.date().allow("").required().label("Date d’expiration"),
    notes: joi_1.default.string().allow("").label("Notes device"),
});
const actiUpdateSchema = joi_1.default.object({
    isActive: joi_1.default.boolean().required().label("Statut d’activation"),
    expiresAt: joi_1.default.date().allow("").label("Date d’expiration"),
    notes: joi_1.default.string().allow("").label("Notes device"),
});
// 🔐 Middleware de sécurité : JWT obligatoire
// router.use(authenticateJWT);
// 🚀 Créer une activation
router.post("/", (0, validationMiddleware_1.validate)(activationSchema), activationController_1.createActivation);
// 📄 Lire une activation par ID
router.get("/:id", activationController_1.getActivationBydeviceId);
// ♻️ Mettre à jour une activation
router.put("/:id", (0, validationMiddleware_1.validate)(actiUpdateSchema), activationController_1.updateActivation);
exports.default = router;
