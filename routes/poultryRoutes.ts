import express from "express";
import Joi from "joi";
import {
  countPoultriesByCategory,
  countTotalPoultries,
  createPoultry,
  deletePoultry,
  getPoultries,
  getPoultryById,
  updatePoultry,
} from "../controllers/poultryController";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validationMiddleware";

const router = express.Router();

// const poultrySchema = Joi.object({
//   batchNumber: Joi.string().required(),
//   quantity: Joi.number().required().min(0),
//   arrivalDate: Joi.date().required(),
//   breed: Joi.string().required(),
//   source: Joi.string().required(),
//   initialWeight: Joi.number().required().min(0)
// });

// const poultrySchema = Joi.object({
//   quantity: Joi.number().required().min(0),
//   date: Joi.date().required(),
//   type: Joi.string().required(),
//   notes: Joi.string().required(),
// });

const poultrySchema = Joi.object({
  quantity: Joi.number().required().min(0),
  date: Joi.date().required(),
  type: Joi.string()
    .valid("Poulet de Chair", "Pondeuse", "Coq", "Poussin")
    .required()
    .messages({
      "any.only":
        "Le type doit être soit Poulet de Chair, Pondeuse, Coq ou Poussin",
      "string.empty": "Le type est requis",
    }),
  notes: Joi.string().allow("").required(),
});

router.use(authenticateJWT);

router.post("/", validate(poultrySchema), createPoultry);
router.get("/", getPoultries);
router.get("/count", countTotalPoultries);
router.get("/:id", getPoultryById);
router.put("/:id", validate(poultrySchema), updatePoultry);
router.delete("/:id", deletePoultry);

export default router;
