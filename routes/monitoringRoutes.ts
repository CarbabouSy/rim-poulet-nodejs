import express from "express";
import Joi from "joi";
import {
  createMonitoring,
  deleteMonitoring,
  getMonitoringById,
  getMonitorings,
  updateMonitoring,
} from "../controllers/monitoringController";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validationMiddleware";

const router = express.Router();

// Joi schema correct pour un objet `timeSlots`
const monitoringSchema = Joi.object({
  poultryId: Joi.string().required(),
  date: Joi.date().required(),
  weight: Joi.number().required().min(0),
  temperature: Joi.string().required().min(0),
  notes: Joi.string().allow("", null),
  timeSlots: Joi.object({
    "8h": Joi.number().min(0),
    "12h": Joi.number().min(0),
    "18h": Joi.number().min(0),
    "22h": Joi.number().min(0),
  }).required(),
  vaccineAdministered: Joi.string().allow("", null),
  hangar: Joi.string().required(),
  mortality: Joi.number().required().min(0),
  waterAdministered: Joi.number().required().min(0),
});

router.use(authenticateJWT);

router.post("/", validate(monitoringSchema), createMonitoring);
router.get("/", getMonitorings);
router.get("/:id", getMonitoringById);
router.put("/:id", validate(monitoringSchema), updateMonitoring);
router.delete("/:id", deleteMonitoring);

export default router;
