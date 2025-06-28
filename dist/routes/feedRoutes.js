"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const feedController_1 = require("../controllers/feedController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const router = express_1.default.Router();
const feedSchema = joi_1.default.object({
    poultryId: joi_1.default.string().required(),
    date: joi_1.default.date().required(),
    quantity: joi_1.default.number().required().min(0),
    type: joi_1.default.string().required(),
    // cost: Joi.number().required().min(0),
    notes: joi_1.default.string(),
});
router.use(authMiddleware_1.authenticateJWT);
router.post("/", (0, validationMiddleware_1.validate)(feedSchema), feedController_1.createFeed);
router.get("/", feedController_1.getFeeds);
router.get("/:id", feedController_1.getFeedById);
router.put("/:id", (0, validationMiddleware_1.validate)(feedSchema), feedController_1.updateFeed);
router.delete("/:id", feedController_1.deleteFeed);
exports.default = router;
