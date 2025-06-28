import express from "express";
import Joi from "joi";
import {
  createActivation,
  getActivationBydeviceId,
  updateActivation,
} from "../controllers/activationController";
import { validate } from "../middlewares/validationMiddleware";

const router = express.Router();

// 🛡️ Schéma de validation des activations
const activationSchema = Joi.object({
  deviceId: Joi.string().required().label("Device ID"),
  isActive: Joi.boolean().required().label("Statut d’activation"),
  expiresAt: Joi.date().allow("").required().label("Date d’expiration"),
  notes: Joi.string().allow("").label("Notes device"),
});
const actiUpdateSchema = Joi.object({
  isActive: Joi.boolean().required().label("Statut d’activation"),
  expiresAt: Joi.date().allow("").label("Date d’expiration"),
  notes: Joi.string().allow("").label("Notes device"),
});

// 🔐 Middleware de sécurité : JWT obligatoire
// router.use(authenticateJWT);

// 🚀 Créer une activation
router.post("/", validate(activationSchema), createActivation);

// 📄 Lire une activation par ID
router.get("/:id", getActivationBydeviceId);

// ♻️ Mettre à jour une activation
router.put("/:id", validate(actiUpdateSchema), updateActivation);

export default router;
