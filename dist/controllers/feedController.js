"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFeed = exports.updateFeed = exports.getFeedById = exports.getFeeds = exports.getFeedss = exports.createFeed = void 0;
const feedModel_1 = require("../models/feedModel");
const createFeed = async (req, res) => {
    try {
        const feed = new feedModel_1.Feed({
            ...req.body,
            userId: req.user?._id,
        });
        await feed.save();
        res.status(201).json({
            message: "Feed record created successfully",
            data: feed,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error creating feed record",
            error: error.message,
        });
    }
    0;
};
exports.createFeed = createFeed;
const getFeedss = async (req, res) => {
    try {
        const feeds = await feedModel_1.Feed.find({ userId: req.user?._id })
            .populate("poultryId", "batchNumber")
            .sort({
            createdAt: -1,
        });
        res.json({
            data: feeds,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching feed records",
            error: error.message,
        });
    }
};
exports.getFeedss = getFeedss;
const getFeeds = async (req, res) => {
    try {
        // // On récupère tous les poulaillers de l'utilisateur, triés du plus récent au plus ancien
        // const Alimentations = await Feed.find({ userId: req.user?._id }).sort({
        //   createdAt: -1,
        // });
        // Vérifie si l'utilisateur est admin
        const isAdmin = req.user?.role === "admin";
        let Alimentations;
        if (isAdmin) {
            // Si admin, récupérer tous les enregistrements
            Alimentations = await feedModel_1.Feed.find()
                .populate("poultryId", "batchNumber")
                .sort({ createdAt: -1 });
        }
        else {
            // Sinon, récupérer uniquement ceux de l'utilisateur connecté
            Alimentations = await feedModel_1.Feed.find({ userId: req.user?._id })
                .populate("poultryId", "batchNumber")
                .sort({
                createdAt: -1,
            });
        }
        // // On groupe les poulaillers par type
        // const grouped: Record<string, any[]> = {};
        // Alimentations.forEach((feed) => {
        //   const type = feed.type || "Inconnu";
        //   if (!grouped[type]) {
        //     grouped[type] = [];
        //   }
        //   grouped[type].push(feed);
        // });
        // res.json({
        //   data: grouped,
        //   Alimentations,
        // });
        // ✅ Formatage personnalisé
        const formattedAlimentations = Alimentations.map((feed) => {
            const poultry = feed.poultryId;
            return {
                ...feed.toObject(),
                poultryId: poultry._id,
                batchNumber: poultry.batchNumber,
            };
        });
        // ✅ Groupement
        const grouped = {};
        formattedAlimentations.forEach((feed) => {
            const type = feed.type || "Inconnu";
            if (!grouped[type])
                grouped[type] = [];
            grouped[type].push(feed);
        });
        res.json({
            data: grouped,
            Alimentations: formattedAlimentations,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching feed batches",
            error: error.message,
        });
    }
};
exports.getFeeds = getFeeds;
const getFeedById = async (req, res) => {
    try {
        const feed = await feedModel_1.Feed.findOne({
            _id: req.params.id,
            userId: req.user?._id,
        }).populate("poultryId", "batchNumber");
        if (!feed) {
            return res.status(404).json({
                message: "Feed introuvable ou non autorisé",
            });
        }
        res.json({
            data: feed,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching feed record",
            error: error.message,
        });
    }
};
exports.getFeedById = getFeedById;
const updateFeed = async (req, res) => {
    try {
        const isAdmin = req.user?.role === "admin";
        const feedId = req.params.id;
        if (!feedId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "ID invalide" });
        }
        const filter = isAdmin
            ? { _id: feedId } // admin peut tout modifier
            : { _id: feedId, userId: req.user?._id };
        const updatedFeed = await feedModel_1.Feed.findOneAndUpdate(filter, req.body, {
            new: true,
        });
        if (!updatedFeed) {
            return res.status(404).json({
                message: "Feed introuvable ou non autorisé",
            });
        }
        res.json({
            message: "Lot mis à jour avec succès",
            data: updatedFeed,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur lors de la mise à jour du feed record",
            error: error.message,
        });
    }
};
exports.updateFeed = updateFeed;
const deleteFeed = async (req, res) => {
    try {
        const feed = await feedModel_1.Feed.findOneAndDelete({
            _id: req.params.id,
            userId: req.user?._id,
        });
        if (!feed) {
            return res.status(404).json({
                message: "Feed introuvable ou non autorisé",
            });
        }
        res.json({
            message: "Feed record deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting feed record",
            error: error.message,
        });
    }
};
exports.deleteFeed = deleteFeed;
