import { IActivation } from "@/types";
import mongoose, { Document, Schema } from "mongoose";

const activationSchema = new Schema<IActivation & Document>(
  {
    deviceId: { type: String, required: true, unique: true },
    isActive: { type: Boolean, required: true, default: true },
    expiresAt: { type: Date, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

export const Activation = mongoose.model<IActivation & Document>(
  "Activation",
  activationSchema
);
