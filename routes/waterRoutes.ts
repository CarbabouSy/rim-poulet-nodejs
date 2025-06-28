import express from "express";
import Joi from "joi";
import {
  createWater,
  deleteWater,
  getWaterById,
  getWaters,
  updateWater,
} from "../controllers/waterController";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validationMiddleware";

const router = express.Router();

const waterSchema = Joi.object({
  poultryId: Joi.string().required(),
  type: Joi.string().required(),
  date: Joi.date().required(),
  quantity: Joi.number().required().min(0),
  notes: Joi.string(),
});

router.use(authenticateJWT);

router.post("/", validate(waterSchema), createWater);
router.get("/", getWaters);
router.get("/:id", getWaterById);
router.put("/:id", validate(waterSchema), updateWater);
router.delete("/:id", deleteWater);

export default router;
