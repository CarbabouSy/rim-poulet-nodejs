import mongoose, { Document, Schema } from "mongoose";
import { IWater } from "../types";

const waterSchema = new Schema<IWater & Document>(
  {
    poultryId: {
      type: Schema.Types.ObjectId,
      ref: "Poultry",
      required: true,
    },
    date: {
      type: Date,
      required: [true, "La date est requise"],
    },
    quantity: {
      type: Number,
      required: [true, "La quantité deau est requise"],
      min: [0, "La quantité ne peut pas être négative"],
    },
    notes: {
      type: String,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: {
        values: [
          "Eau potable",
          "Eau de puits",
          "Eau de forage",
          "Eau de pluie",
          "Eau traitée",
          "Eau minérale",
          "Eau de surface (rivière/lac)",
          "Eau recyclée",
        ],
        message:
          "Eau potable,Eau de puits,Eau de forage,Eau de pluie,Eau traitée,Eau minérale,Eau de surface (rivière/lac),Eau recyclée,",
      },
      required: [true, "Le type est requis"],
    },
  },
  {
    timestamps: true,
  }
);

export const Water = mongoose.model<IWater & Document>("Water", waterSchema);
