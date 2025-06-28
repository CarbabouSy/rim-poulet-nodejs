"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const poultryController_1 = require("../controllers/poultryController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const router = express_1.default.Router();
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
const poultrySchema = joi_1.default.object({
    quantity: joi_1.default.number().required().min(0),
    date: joi_1.default.date().required(),
    type: joi_1.default.string()
        .valid("Poulet de Chair", "Pondeuse", "Coq", "Poussin")
        .required()
        .messages({
        "any.only": "Le type doit être soit Poulet de Chair, Pondeuse, Coq ou Poussin",
        "string.empty": "Le type est requis",
    }),
    notes: joi_1.default.string().allow("").required(),
});
router.use(authMiddleware_1.authenticateJWT);
router.post("/", (0, validationMiddleware_1.validate)(poultrySchema), poultryController_1.createPoultry);
router.get("/", poultryController_1.getPoultries);
router.get("/count", poultryController_1.countTotalPoultries);
router.get("/:id", poultryController_1.getPoultryById);
router.put("/:id", (0, validationMiddleware_1.validate)(poultrySchema), poultryController_1.updatePoultry);
router.delete("/:id", poultryController_1.deletePoultry);
exports.default = router;
