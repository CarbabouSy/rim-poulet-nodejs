"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monitoring = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const monitoringSchema = new mongoose_1.Schema({
    hangar: {
        type: String,
        required: [true, "Le hangar est requis."],
        trim: true,
    },
    poultryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Poultry",
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true, // ✅ Ajoute createdAt / updatedAt
});
exports.Monitoring = mongoose_1.default.model("Monitoring", monitoringSchema);
