"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWater = exports.updateWater = exports.getWaterById = exports.getWaters = exports.createWater = void 0;
const waterModel_1 = require("../models/waterModel");
const createWater = async (req, res) => {
    try {
        const water = new waterModel_1.Water({
            ...req.body,
            userId: req.user?._id,
        });
        await water.save();
        res.status(201).json({
            message: "Water record created successfully",
            data: water,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error creating water record",
            error: error.message,
        });
    }
};
exports.createWater = createWater;
const getWaters = async (req, res) => {
    try {
        // Vérifie si l'utilisateur est admin
        const isAdmin = req.user?.role === "admin";
        let waters;
        if (isAdmin) {
            // Si admin, récupérer tous les enregistrements
            waters = await waterModel_1.Water.find()
                .populate("poultryId", "batchNumber")
                .sort({ createdAt: -1 });
        }
        else {
            // Sinon, récupérer uniquement ceux de l'utilisateur connecté
            waters = await waterModel_1.Water.find({ userId: req.user?._id })
                .populate("poultryId", "batchNumber")
                .sort({
                createdAt: -1,
            });
        }
        // ✅ Formatage personnalisé
        const formattedwaters = waters.map((water) => {
            const poultry = water.poultryId;
            return {
                ...water.toObject(),
                poultryId: poultry._id,
                batchNumber: poultry.batchNumber,
            };
        });
        // // ✅ Groupement
        // const grouped: Record<string, any[]> = {};
        // formattedwaters.forEach((water) => {
        //   const type = water.type || "water";
        //   if (!grouped[type]) grouped[type] = [];
        //   grouped[type].push(water);
        // });
        res.json({
            // data: grouped,
            waters: formattedwaters,
        }); // res.json({
        //   data: waters,
        // });
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching water records",
            error: error.message,
        });
    }
};
exports.getWaters = getWaters;
const getWaterById = async (req, res) => {
    try {
        const water = await waterModel_1.Water.findOne({
            _id: req.params.id,
            userId: req.user?._id,
        }).populate("poultryId", "batchNumber");
        if (!water) {
            return res.status(404).json({
                message: "Water introuvable ou non autorisé",
            });
        }
        res.json({
            data: water,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching water record",
            error: error.message,
        });
    }
};
exports.getWaterById = getWaterById;
const updateWater = async (req, res) => {
    try {
        const isAdmin = req.user?.role === "admin";
        const waterId = req.params.id;
        if (!waterId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "ID invalide" });
        }
        const filter = isAdmin
            ? { _id: waterId } // admin peut tout modifier
            : { _id: waterId, userId: req.user?._id };
        const updatedWater = await waterModel_1.Water.findOneAndUpdate(filter, req.body, {
            new: true,
        });
        if (!updatedWater) {
            return res.status(404).json({
                message: "Water introuvable ou non autorisé",
            });
        }
        res.json({
            message: "Water record updated successfully",
            data: updatedWater,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur lors de la mise à jour du water record",
            error: error.message,
        });
    }
};
exports.updateWater = updateWater;
const deleteWater = async (req, res) => {
    try {
        const water = await waterModel_1.Water.findOneAndDelete({
            _id: req.params.id,
            userId: req.user?._id,
        });
        if (!water) {
            return res.status(404).json({
                message: "Water introuvable ou non autorisé",
            });
        }
        res.json({
            message: "Water record deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting water record",
            error: error.message,
        });
    }
};
exports.deleteWater = deleteWater;
