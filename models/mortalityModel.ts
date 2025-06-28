import mongoose, { Document, Schema } from "mongoose";
import { IMortality } from "../types";

const mortalitySchema = new Schema<IMortality & Document>(
  {
    poultryId: {
      type: Schema.Types.ObjectId,
      ref: "Poultry",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    cause: {
      type: String,
      required: true,
    },
    notes: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Mortality = mongoose.model<IMortality & Document>(
  "Mortality",
  mortalitySchema
);
