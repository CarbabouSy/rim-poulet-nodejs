import express from "express";
import Joi from "joi";
import {
  createMortality,
  deleteMortality,
  getMortalities,
  getMortalityById,
  updateMortality,
} from "../controllers/mortalityController";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validationMiddleware";

const router = express.Router();

const mortalitySchema = Joi.object({
  poultryId: Joi.string().required(),
  date: Joi.date().required(),
  quantity: Joi.number().required().min(0),
  cause: Joi.string().required(),
  notes: Joi.string(),
});

router.use(authenticateJWT);

router.post("/", validate(mortalitySchema), createMortality);
router.get("/", getMortalities);
router.get("/:id", getMortalityById);
router.put("/:id", validate(mortalitySchema), updateMortality);
router.delete("/:id", deleteMortality);

export default router;
