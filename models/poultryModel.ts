import mongoose, { Document, Schema } from "mongoose";
import { IPoultry } from "../types";

const poultrySchema = new Schema<IPoultry & Document>(
  {
    batchNumber: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      required: [true, "La date est requise"],
    },
    quantity: {
      type: Number,
      required: [true, "Le nombre est requis"],
      min: [0, "Le nombre ne peut pas être négatif"],
    },
    type: {
      type: String,
      enum: {
        values: ["Poulet de Chair", "Pondeuse", "Coq", "Poussin"],
        message: "Le type doit être l'un de : h, Pondeuse, Coq, Poussin",
      },
      required: [true, "Le type est requis"],
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
  },
  {
    timestamps: true,
  }
);

// const poultrySchema = new Schema<IPoultry & Document>(
//   {
//     batchNumber: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     // quantity: {
//     //   type: Number,
//     //   required: true,
//     //   min: 0,
//     // },
//     // arrivalDate: {
//     //   type: Date,
//     //   required: true,
//     // },
//     // breed: {
//     //   type: String,
//     //   required: true,
//     // },
//     // source: {
//     //   type: String,
//     //   required: true,
//     // },
//     // initialWeight: {
//     //   type: Number,
//     //   required: true,
//     //   min: 0,
//     // },
//     // userId: {
//     //   type: Schema.Types.ObjectId,
//     //   ref: "User",
//     //   required: true,
//     // },

//     date: {
//       type: Date,
//       required: [true, "La date est requise"],
//     },
//     quantity: {
//       type: Number,
//       required: [true, "Le nombre est requise"],
//       min: [0, "La nombre ne peut pas être négative"],
//     },
//     type: {
//       type: String,
//       enum: ["Poulet de Chair", "Pondeuse", "Coq", "Poussin"],
//       required: [true, "Le type d'aliment est requis"],
//     },
//     notes: {
//       type: String,
//       trim: true,
//     },
//     userId: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

export const Poultry = mongoose.model<IPoultry & Document>(
  "Poultry",
  poultrySchema
);
