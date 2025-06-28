import cors from "cors";
import express, { Express, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config";

// Import routes
import activationRoutes from "./routes/activationsRoutes";
import authRoutes from "./routes/authRoutes";
import feedRoutes from "./routes/feedRoutes";
import monitoringRoutes from "./routes/monitoringRoutes";
import mortalityRoutes from "./routes/mortalityRoutes";
import poultryRoutes from "./routes/poultryRoutes";
import waterRoutes from "./routes/waterRoutes";
import welcomeRoutes from "./routes/welcomeRoutes";

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.get("/", welcomeRoutes);
app.use("/api/activations", activationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/poultry", poultryRoutes);
app.use("/api/feed", feedRoutes);
app.use("/api/water", waterRoutes);
app.use("/api/mortality", mortalityRoutes);
app.use("/api/monitoring", monitoringRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

export default app;
