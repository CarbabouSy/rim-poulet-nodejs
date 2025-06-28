"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const mortalityController_1 = require("../controllers/mortalityController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const router = express_1.default.Router();
const mortalitySchema = joi_1.default.object({
    poultryId: joi_1.default.string().required(),
    date: joi_1.default.date().required(),
    quantity: joi_1.default.number().required().min(0),
    cause: joi_1.default.string().required(),
    notes: joi_1.default.string(),
});
router.use(authMiddleware_1.authenticateJWT);
router.post("/", (0, validationMiddleware_1.validate)(mortalitySchema), mortalityController_1.createMortality);
router.get("/", mortalityController_1.getMortalities);
router.get("/:id", mortalityController_1.getMortalityById);
router.put("/:id", (0, validationMiddleware_1.validate)(mortalitySchema), mortalityController_1.updateMortality);
router.delete("/:id", mortalityController_1.deleteMortality);
exports.default = router;
