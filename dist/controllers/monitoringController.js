"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMonitoring = exports.updateMonitoring = exports.getMonitoringById = exports.getMonitorings = exports.createMonitoring = void 0;
const monitoringModel_1 = require("../models/monitoringModel");
const createMonitoring = async (req, res) => {
    try {
        const monitoring = new monitoringModel_1.Monitoring({
            ...req.body,
            userId: req.user?._id,
        });
        await monitoring.save();
        res.status(201).json({
            message: "Monitoring record created successfully",
            data: monitoring,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error creating monitoring record",
            error: error.message,
        });
    }
};
exports.createMonitoring = createMonitoring;
const getMonitorings = async (req, res) => {
    try {
        const isAdmin = req.user?.role === "admin";
        let Monitorings;
        if (isAdmin) {
            // Si admin, récupérer tous les enregistrements
            Monitorings = await monitoringModel_1.Monitoring.find()
                .populate("poultryId", "batchNumber")
                .sort({ createdAt: -1 });
        }
        else {
            // Sinon, récupérer uniquement ceux de l'utilisateur connecté
            Monitorings = await monitoringModel_1.Monitoring.find({ userId: req.user?._id })
                .populate("poultryId", "batchNumber")
                .sort({
                createdAt: -1,
            });
        }
        // ✅ Formatage personnalisé
        const formattedMonitorings = Monitorings.map((monitoring) => {
            const poultry = monitoring.poultryId;
            return {
                ...monitoring.toObject(),
                poultryId: poultry._id,
                batchNumber: poultry.batchNumber,
            };
        });
        // // ✅ Groupement
        // const grouped: Record<string, any[]> = {};
        // formattedMonitorings.forEach((monitoring) => {
        //   // const type = monitoring.type || "monitoring";
        //   const type = (monitoring as any).type || "monitoring";
        //   if (!grouped[type]) grouped[type] = [];
        //   grouped[type].push(monitoring);
        // });
        res.json({
            // data: grouped,
            Monitorings: formattedMonitorings,
        });
        // res.json({
        //   data: monitorings,
        // });
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching monitoring records",
            error: error.message,
        });
    }
};
exports.getMonitorings = getMonitorings;
const getMonitoringById = async (req, res) => {
    try {
        const monitoring = await monitoringModel_1.Monitoring.findOne({
            _id: req.params.id,
            userId: req.user?._id,
        }).populate("poultryId", "batchNumber");
        if (!monitoring) {
            return res.status(404).json({
                message: "Monitoring introuvable ou non autorisé",
            });
        }
        res.json({
            data: monitoring,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching monitoring record",
            error: error.message,
        });
    }
};
exports.getMonitoringById = getMonitoringById;
const updateMonitoring = async (req, res) => {
    try {
        const isAdmin = req.user?.role === "admin";
        const monitoringId = req.params.id;
        if (!monitoringId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "ID invalide" });
        }
        const filter = isAdmin
            ? { _id: monitoringId } // admin peut tout modifier
            : { _id: monitoringId, userId: req.user?._id };
        const updatedMonitoring = await monitoringModel_1.Monitoring.findOneAndUpdate(filter, req.body, {
            new: true,
        });
        if (!updatedMonitoring) {
            return res.status(404).json({
                message: "Monitoring introuvable ou non autorisé",
            });
        }
        res.json({
            message: "Monitoring record updated successfully",
            data: updatedMonitoring,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur lors de la mise à jour du monitoring record",
            error: error.message,
        });
    }
};
exports.updateMonitoring = updateMonitoring;
const deleteMonitoring = async (req, res) => {
    try {
        const monitoring = await monitoringModel_1.Monitoring.findOneAndDelete({
            _id: req.params.id,
            userId: req.user?._id,
        });
        if (!monitoring) {
            return res.status(404).json({
                message: "Monitoring introuvable ou non autorisé",
            });
        }
        res.json({
            message: "Monitoring record deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting monitoring record",
            error: error.message,
        });
    }
};
exports.deleteMonitoring = deleteMonitoring;
