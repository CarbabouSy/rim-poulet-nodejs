"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("./config");
// Import routes
const activationsRoutes_1 = __importDefault(require("./routes/activationsRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const feedRoutes_1 = __importDefault(require("./routes/feedRoutes"));
const monitoringRoutes_1 = __importDefault(require("./routes/monitoringRoutes"));
const mortalityRoutes_1 = __importDefault(require("./routes/mortalityRoutes"));
const poultryRoutes_1 = __importDefault(require("./routes/poultryRoutes"));
const waterRoutes_1 = __importDefault(require("./routes/waterRoutes"));
const welcomeRoutes_1 = __importDefault(require("./routes/welcomeRoutes"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: config_1.config.corsOrigin,
    credentials: true,
}));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
// Routes
app.get("/", welcomeRoutes_1.default);
app.use("/api/activations", activationsRoutes_1.default);
app.use("/api/auth", authRoutes_1.default);
app.use("/api/poultry", poultryRoutes_1.default);
app.use("/api/feed", feedRoutes_1.default);
app.use("/api/water", waterRoutes_1.default);
app.use("/api/mortality", mortalityRoutes_1.default);
app.use("/api/monitoring", monitoringRoutes_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
});
exports.default = app;
