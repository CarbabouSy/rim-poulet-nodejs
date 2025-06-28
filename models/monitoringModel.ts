import mongoose, { Document, Schema } from "mongoose";
import { IMonitoring } from "../types";

const monitoringSchema = new Schema<IMonitoring & Document>(
  {
    hangar: {
      type: String,
      required: [true, "Le hangar est requis."],
      trim: true,
    },
    poultryId: {
      type: Schema.Types.ObjectId,
      ref: "Poultry",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // health: {
    //   type: String,
    //   enum: ["good", "fair", "poor"],
    //   required: true,
    // },
    // behavior: {
    //   type: String,
    //   required: true,
    // },

    temperature: {
      type: String,
      required: true,
      min: [0, "La température ne peut pas être négative."],
    },
    notes: {
      type: String,
      trim: true,
    },

    mortality: {
      type: Number,
      min: [0, "La mortalité ne peut pas être négative."],
    },
    waterAdministered: {
      type: Number,
      min: [0, "La quantité d'eau ne peut pas être négative."],
    },
    weight: {
      type: Number,
      required: true,
      min: [0, "Le poids ne peut pas être négatif."],
    },
    vaccineAdministered: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "La date est requise."],
    },
    timeSlots: {
      "8h": { type: Number, min: [0, "Valeur invalide pour 8h."] },
      "12h": { type: Number, min: [0, "Valeur invalide pour 12h."] },
      "18h": { type: Number, min: [0, "Valeur invalide pour 18h."] },
      "22h": { type: Number, min: [0, "Valeur invalide pour 22h."] },
    },
    // feedQuantity: {
    //   min: [0, "La quantité d'aliment ne peut pas être négative"],
    // },
  },

  {
    timestamps: true, // ✅ Ajoute createdAt / updatedAt
  }
);

export const Monitoring = mongoose.model<IMonitoring & Document>(
  "Monitoring",
  monitoringSchema
);
