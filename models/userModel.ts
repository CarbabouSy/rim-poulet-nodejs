import bcrypt from "bcrypt";
import mongoose, { Document, Schema } from "mongoose";
import { config } from "../config";
import { IUser } from "../types";

const userSchema = new Schema<IUser & Document>(
  {
    username: {
      type: String,
      required: [true, "Le username est requis"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    accountNumber: {
      type: Number,
      required: [true, "Le numéro de compte est requis"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Le mot de passe est requis"],
      minlength: [6, "Le mot de passe doit contenir au moins 6 caractères"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(config.bcryptSaltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser & Document>("User", userSchema);
