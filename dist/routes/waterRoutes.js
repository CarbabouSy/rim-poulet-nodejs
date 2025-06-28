"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const waterController_1 = require("../controllers/waterController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const router = express_1.default.Router();
const waterSchema = joi_1.default.object({
    poultryId: joi_1.default.string().required(),
    type: joi_1.default.string().required(),
    date: joi_1.default.date().required(),
    quantity: joi_1.default.number().required().min(0),
    notes: joi_1.default.string(),
});
router.use(authMiddleware_1.authenticateJWT);
router.post("/", (0, validationMiddleware_1.validate)(waterSchema), waterController_1.createWater);
router.get("/", waterController_1.getWaters);
router.get("/:id", waterController_1.getWaterById);
router.put("/:id", (0, validationMiddleware_1.validate)(waterSchema), waterController_1.updateWater);
router.delete("/:id", waterController_1.deleteWater);
exports.default = router;
