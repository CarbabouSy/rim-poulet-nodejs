"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const monitoringController_1 = require("../controllers/monitoringController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const router = express_1.default.Router();
// Joi schema correct pour un objet `timeSlots`
const monitoringSchema = joi_1.default.object({
    poultryId: joi_1.default.string().required(),
    date: joi_1.default.date().required(),
    weight: joi_1.default.number().required().min(0),
    temperature: joi_1.default.string().required().min(0),
    notes: joi_1.default.string().allow("", null),
    timeSlots: joi_1.default.object({
        "8h": joi_1.default.number().min(0),
        "12h": joi_1.default.number().min(0),
        "18h": joi_1.default.number().min(0),
        "22h": joi_1.default.number().min(0),
    }).required(),
    vaccineAdministered: joi_1.default.string().allow("", null),
    hangar: joi_1.default.string().required(),
    mortality: joi_1.default.number().required().min(0),
    waterAdministered: joi_1.default.number().required().min(0),
});
router.use(authMiddleware_1.authenticateJWT);
router.post("/", (0, validationMiddleware_1.validate)(monitoringSchema), monitoringController_1.createMonitoring);
router.get("/", monitoringController_1.getMonitorings);
router.get("/:id", monitoringController_1.getMonitoringById);
router.put("/:id", (0, validationMiddleware_1.validate)(monitoringSchema), monitoringController_1.updateMonitoring);
router.delete("/:id", monitoringController_1.deleteMonitoring);
exports.default = router;
