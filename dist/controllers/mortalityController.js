"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMortality = exports.updateMortality = exports.getMortalityById = exports.getMortalities = exports.createMortality = void 0;
const mortalityModel_1 = require("../models/mortalityModel");
const createMortality = async (req, res) => {
    try {
        const mortality = new mortalityModel_1.Mortality({
            ...req.body,
            userId: req.user?._id,
        });
        await mortality.save();
        res.status(201).json({
            message: "Mortality record created successfully",
            data: mortality,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error creating mortality record",
            error: error.message,
        });
    }
};
exports.createMortality = createMortality;
const getMortalities = async (req, res) => {
    try {
        const isAdmin = req.user?.role === "admin";
        let Mortalities;
        if (isAdmin) {
            // Si admin, récupérer tous les enregistrements
            Mortalities = await mortalityModel_1.Mortality.find()
                .sort({ createdAt: -1 })
                .populate("poultryId", "batchNumber");
        }
        else {
            // Sinon, récupérer uniquement ceux de l'utilisateur connecté
            Mortalities = await mortalityModel_1.Mortality.find({ userId: req.user?._id })
                .populate("poultryId", "batchNumber")
                .sort({
                createdAt: -1,
            });
        }
        // ✅ Formatage personnalisé
        const formattedMortalities = Mortalities.map((mortalities) => {
            const poultry = mortalities.poultryId;
            return {
                ...mortalities.toObject(),
                poultryId: poultry._id,
                batchNumber: poultry.batchNumber,
            };
        });
        // ✅ Groupement
        const grouped = {};
        formattedMortalities.forEach((mortalities) => {
            const type = mortalities.cause || "Inconnu";
            if (!grouped[type])
                grouped[type] = [];
            grouped[type].push(mortalities);
        });
        res.json({
            data: grouped,
            Mortalities: formattedMortalities,
        });
        // res.json({
        //   data: Mortalities,
        // });
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching mortality records",
            error: error.message,
        });
    }
};
exports.getMortalities = getMortalities;
const getMortalityById = async (req, res) => {
    try {
        const mortality = await mortalityModel_1.Mortality.findOne({
            _id: req.params.id,
            userId: req.user?._id,
        }).populate("poultryId", "batchNumber");
        if (!mortality) {
            return res.status(404).json({
                message: "Mortality introuvable ou non autorisé",
            });
        }
        res.json({
            data: mortality,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching mortality record",
            error: error.message,
        });
    }
};
exports.getMortalityById = getMortalityById;
const updateMortality = async (req, res) => {
    try {
        const isAdmin = req.user?.role === "admin";
        const mortalityId = req.params.id;
        if (!mortalityId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "ID invalide" });
        }
        const filter = isAdmin
            ? { _id: mortalityId } // admin peut tout modifier
            : { _id: mortalityId, userId: req.user?._id };
        const updatedMortality = await mortalityModel_1.Mortality.findOneAndUpdate(filter, req.body, {
            new: true,
        });
        if (!updatedMortality) {
            return res.status(404).json({
                message: "Mortality introuvable ou non autorisé",
            });
        }
        res.json({
            message: "Mortality record updated successfully",
            data: updatedMortality,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur lors de la mise à jour du mortality record",
            error: error.message,
        });
    }
};
exports.updateMortality = updateMortality;
const deleteMortality = async (req, res) => {
    try {
        const mortality = await mortalityModel_1.Mortality.findOneAndDelete({
            _id: req.params.id,
            userId: req.user?._id,
        });
        if (!mortality) {
            return res.status(404).json({
                message: "Mortality introuvable ou non autorisé",
            });
        }
        res.json({
            message: "Mortality record deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting mortality record",
            error: error.message,
        });
    }
};
exports.deleteMortality = deleteMortality;
