import mongoose, { Document, Schema } from "mongoose";
import { IPoultry } from "../types";

const poultrySchema = new Schema<IPoultry & Document>(
  {
    batchNumber: {
      type: String,
      required: true,
      unique: true,
    },
    arrivalDate: {
      type: Date,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    initialWeight: {
      type: Number,
      required: true,
      min: 0,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["Démarrage", "Croissance", "Finition"],
      required: [true, "Le type d'aliment est requis"],
    },
    quantity: {
      type: Number,
      required: [true, "La quantité est requise"],
      min: [0, "La quantité ne peut pas être négative"],
    },
  },
  {
    timestamps: true,
  }
);

export const Poultry = mongoose.model<IPoultry & Document>(
  "Poultry",
  poultrySchema
);
