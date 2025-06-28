// import { Request } from "@/middlewares/authMiddleware";
import { Request, Response } from "express";
import { Activation } from "../models/activationModel";

// ➕ Créer une activation

export const createActivation = async (req: Request, res: Response) => {
  try {
    const { deviceId, isActive, expiresAt, notes } = req.body;

    const existing = await Activation.findOne({ deviceId });
    if (existing) {
      return res.status(409).json({ message: "Cette activation existe déjà." });
    }

    const activation = await Activation.create({
      deviceId,
      isActive,
      expiresAt,
      notes,
    });

    return res.status(201).json(activation);
  } catch (error) {
    console.error("Erreur création activation:", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};
// 🔍 Récupérer une activation par deviceId
export const getActivationBydeviceId = async (req: Request, res: Response) => {
  try {
    const deviceId = req.params.id;

    if (!deviceId || deviceId.trim() === "") {
      return res
        .status(400)
        .json({ message: "Device ID manquant ou invalide." });
    }

    const activation = await Activation.findOne({ deviceId });

    if (!activation) {
      return res.status(404).json({ message: "Activation non trouvée." });
    }

    return res.status(200).json(activation);
  } catch (error) {
    console.error("❌ Erreur récupération activation:", error);
    return res
      .status(500)
      .json({ message: "Erreur serveur lors de la récupération." });
  }
};

export const updateActivation = async (req: Request, res: Response) => {
  try {
    const poultryId = req.params.id;

    // if (!poultryId.match(/^[0-9a-fA-F]{24}$/)) {

    if (!poultryId) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const filter = {
      deviceId: poultryId,
    };
    const updated = await Activation.findOneAndUpdate(filter, req.body, {
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
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour",
      error: (error as Error).message,
    });
  }
};
