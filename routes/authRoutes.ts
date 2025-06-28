import express from "express";
import Joi from "joi";
import {
  getUser,
  login,
  register,
  updateUser,
} from "../controllers/authController";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validationMiddleware";

const router = express.Router();

const registerSchema = Joi.object({
  username: Joi.string().required().min(3),
  email: Joi.string(),
  role: Joi.string(),
  password: Joi.string().required().min(6),
  accountNumber: Joi.number().required().min(6),
});

const loginSchema = Joi.object({
  // email: Joi.string().required().email(),
  password: Joi.string().required(),
  accountNumber: Joi.number().required(),
});

router.post("/register", validate(registerSchema), register);
router.put("/user/:id", validate(registerSchema), updateUser);
router.post("/login", validate(loginSchema), login);
router.get("/user", authenticateJWT, getUser);

export default router;
