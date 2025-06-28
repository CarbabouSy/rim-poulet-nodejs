"use strict";
// import { Response } from "express";
// import { AuthRequest } from "../middlewares/authMiddleware";
// import { Poultry } from "../models/poultryModel";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countTotalPoultries = exports.countTotalPoultriess = exports.countPoultriesByCategory = exports.getPoultriesGroupedByCategory = exports.deletePoultry = exports.deletePoultrys = exports.updatePoultry = exports.getPoultryById = exports.getPoultries = exports.createPoultry = void 0;
const feedModel_1 = require("../models/feedModel");
const monitoringModel_1 = require("../models/monitoringModel");
const mortalityModel_1 = require("../models/mortalityModel");
const poultryModel_1 = require("../models/poultryModel");
const waterModel_1 = require("../models/waterModel");
/**
 * Crée un nouveau lot de volailles
 */
const createPoultry = async (req, res) => {
    try {
        const count = await poultryModel_1.Poultry.countDocuments();
        const batchNumber = `${req.body.type}-${String(count + 1).padStart(3, "0")}`;
        const poultry = new poultryModel_1.Poultry({
            ...req.body,
            batchNumber,
            userId: req.user?._id,
        });
        await poultry.save();
        res.status(201).json({
            message: "Lot de volaille créé avec succès",
            data: poultry,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur lors de la création du lot",
            error: error.message,
        });
    }
};
exports.createPoultry = createPoultry;
/**
 * Récupère tous les lots, groupés par type
 */
const getPoultries = async (req, res) => {
    try {
        const isAdmin = req.user?.role === "admin";
        const poultries = isAdmin
            ? await poultryModel_1.Poultry.find().sort({ createdAt: -1 })
            : await poultryModel_1.Poultry.find({ userId: req.user?._id }).sort({ createdAt: -1 });
        const grouped = {};
        poultries.forEach((p) => {
            const type = p.type || "Inconnu";
            if (!grouped[type])
                grouped[type] = [];
            grouped[type].push(p);
        });
        res.json({ data: grouped, poultries });
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération des lots",
            error: error.message,
        });
    }
};
exports.getPoultries = getPoultries;
// export const deletePoultry = async (req: AuthRequest, res: Response) => {
//   try {
//     const poultry = await Poultry.findOneAndDelete({
//       _id: req.params.id,
//       userId: req.user?._id,
//     });
//     if (!poultry) {
//       return res.status(404).json({
//         message: "Poultry batch not found",
//       });
//     }
//     res.json({
//       message: "Poultry batch deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error deleting poultry batch",
//       error: (error as Error).message,
//     });
//   }
// };
/**
 * Récupère un lot spécifique par ID
 */
const getPoultryById = async (req, res) => {
    try {
        const poultry = await poultryModel_1.Poultry.findOne({
            _id: req.params.id,
            userId: req.user?._id,
        });
        if (!poultry) {
            return res.status(404).json({ message: "Lot introuvable" });
        }
        res.json({ data: poultry });
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération du lot",
            error: error.message,
        });
    }
};
exports.getPoultryById = getPoultryById;
/**
 * Mise à jour d’un lot existant
 */
const updatePoultry = async (req, res) => {
    try {
        const isAdmin = req.user?.role === "admin";
        const poultryId = req.params.id;
        if (!poultryId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "ID invalide" });
        }
        const filter = isAdmin
            ? { _id: poultryId }
            : { _id: poultryId, userId: req.user?._id };
        const updated = await poultryModel_1.Poultry.findOneAndUpdate(filter, req.body, {
            new: true,
        });
        if (!updated) {
            return res
                .status(404)
                .json({ message: "Lot introuvable ou non autorisé" });
        }
        res.json({
            message: "Lot mis à jour avec succès",
            data: updated,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur lors de la mise à jour",
            error: error.message,
        });
    }
};
exports.updatePoultry = updatePoultry;
/**
 * Suppression d’un lot
 */
const deletePoultrys = async (req, res) => {
    try {
        const deleted = await poultryModel_1.Poultry.findOneAndDelete({
            _id: req.params.id,
            userId: req.user?._id,
        });
        if (!deleted) {
            return res.status(404).json({ message: "Lot introuvable" });
        }
        res.json({ message: "Lot supprimé avec succès" });
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur lors de la suppression",
            error: error.message,
        });
    }
};
exports.deletePoultrys = deletePoultrys;
const deletePoultry = async (req, res) => {
    try {
        const poultryId = req.params.id;
        const deleted = await poultryModel_1.Poultry.findOneAndDelete({
            _id: poultryId,
            userId: req.user?._id,
        });
        if (!deleted) {
            return res.status(404).json({ message: "Lot introuvable" });
        }
        // Supprimer les enregistrements liés (suivis, mortalités, etc.)
        await feedModel_1.Feed.deleteMany({ poultryId });
        await waterModel_1.Water.deleteMany({ poultryId });
        await monitoringModel_1.Monitoring.deleteMany({ poultryId });
        await mortalityModel_1.Mortality.deleteMany({ poultryId }); // Optionnel, selon ton modèle
        res.json({ message: "Lot et données associées supprimés avec succès" });
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur lors de la suppression",
            error: error.message,
        });
    }
};
exports.deletePoultry = deletePoultry;
/**
 * Récupération groupée par catégorie
 */
const getPoultriesGroupedByCategory = async (req, res) => {
    try {
        const userId = req.user?._id;
        const categories = ["Poulet de Chair", "Pondeuse", "Coq", "Poussin"];
        const grouped = {};
        for (const category of categories) {
            const items = await poultryModel_1.Poultry.find({ userId, category });
            grouped[category] = items;
        }
        res.json({ data: grouped });
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération des catégories",
            error: error.message,
        });
    }
};
exports.getPoultriesGroupedByCategory = getPoultriesGroupedByCategory;
/**
 * Comptage par catégorie
 */
const countPoultriesByCategory = async (req, res) => {
    try {
        const userId = req.user?._id;
        const categories = ["Poulet de Chair", "Pondeuse", "Coq", "Poussin"];
        const counts = {};
        for (const category of categories) {
            counts[category] = await poultryModel_1.Poultry.countDocuments({ userId, category });
        }
        res.json({ data: counts });
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur lors du comptage des catégories",
            error: error.message,
        });
    }
};
exports.countPoultriesByCategory = countPoultriesByCategory;
const countTotalPoultriess = async (req, res) => {
    try {
        const isAdmin = req.user?.role === "admin";
        const filter = isAdmin ? {} : { userId: req.user?._id };
        const total = await poultryModel_1.Poultry.countDocuments(filter);
        // Compter aussi par type
        const categories = ["Poulet de Chair", "Pondeuse", "Coq", "Poussin"];
        const countsByCategory = {};
        for (const category of categories) {
            countsByCategory[category] = await poultryModel_1.Poultry.countDocuments({
                ...filter,
                category,
            });
        }
        res.json({
            total,
            categories: countsByCategory,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur lors du comptage global",
            error: error.message,
        });
    }
};
exports.countTotalPoultriess = countTotalPoultriess;
const countTotalPoultries = async (req, res) => {
    try {
        const isAdmin = req.user?.role === "admin";
        const filter = isAdmin ? {} : { userId: req.user?._id };
        const total = await poultryModel_1.Poultry.countDocuments(filter);
        const types = ["Poulet de Chair", "Pondeuse", "Coq", "Poussin"];
        const countsByType = {};
        for (const type of types) {
            const count = await poultryModel_1.Poultry.countDocuments({
                ...filter,
                type, // <<== ici le correctif
            });
            countsByType[type] = count;
        }
        res.json({
            total,
            categories: countsByType,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur lors du comptage global",
            error: error.message,
        });
    }
};
exports.countTotalPoultries = countTotalPoultries;
