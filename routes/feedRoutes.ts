import express from "express";
import Joi from "joi";
import {
  createFeed,
  deleteFeed,
  getFeedById,
  getFeeds,
  updateFeed,
} from "../controllers/feedController";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validationMiddleware";

const router = express.Router();

const feedSchema = Joi.object({
  poultryId: Joi.string().required(),
  date: Joi.date().required(),
  quantity: Joi.number().required().min(0),
  type: Joi.string().required(),
  // cost: Joi.number().required().min(0),
  notes: Joi.string(),
});

router.use(authenticateJWT);

router.post("/", validate(feedSchema), createFeed);
router.get("/", getFeeds);
router.get("/:id", getFeedById);
router.put("/:id", validate(feedSchema), updateFeed);
router.delete("/:id", deleteFeed);

export default router;
