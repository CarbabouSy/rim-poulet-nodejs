import mongoose, { Document, Schema } from "mongoose";
import { IFeed } from "../types";

const feedSchema = new Schema<IFeed & Document>(
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
      required: [true, "La quantité est requise"],
      min: [0, "La quantité ne peut pas être négative"],
    },
    type: {
      type: String,
      enum: ["Démarrage", "Croissance", "Finition"],
      required: [true, "Le type d'aliment est requis"],
    },
    // cost: {
    //   type: Number,
    //   required: [true, "Le nombre est requis"],
    //   min: [0, "Le nombre ne peut pas être négatif"],
    // },
    notes: {
      type: String,
      trim: true,
    },
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

export const Feed = mongoose.model<IFeed & Document>("Feed", feedSchema);
