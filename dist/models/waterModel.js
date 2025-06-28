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
exports.Water = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const waterSchema = new mongoose_1.Schema({
    poultryId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
        type: mongoose_1.Schema.Types.ObjectId,
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
            message: "Eau potable,Eau de puits,Eau de forage,Eau de pluie,Eau traitée,Eau minérale,Eau de surface (rivière/lac),Eau recyclée,",
        },
        required: [true, "Le type est requis"],
    },
}, {
    timestamps: true,
});
exports.Water = mongoose_1.default.model("Water", waterSchema);
