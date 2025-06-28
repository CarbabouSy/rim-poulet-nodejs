import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { Monitoring } from "../models/monitoringModel";

export const createMonitoring = async (req: AuthRequest, res: Response) => {
  try {
    const monitoring = new Monitoring({
      ...req.body,
      userId: req.user?._id,
    });

    await monitoring.save();

    res.status(201).json({
      message: "Monitoring record created successfully",
      data: monitoring,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating monitoring record",
      error: (error as Error).message,
    });
  }
};

export const getMonitorings = async (req: AuthRequest, res: Response) => {
  try {
    const isAdmin = req.user?.role === "admin";

    let Monitorings;

    if (isAdmin) {
      // Si admin, récupérer tous les enregistrements
      Monitorings = await Monitoring.find()
        .populate("poultryId", "batchNumber")
        .sort({ createdAt: -1 });
    } else {
      // Sinon, récupérer uniquement ceux de l'utilisateur connecté
      Monitorings = await Monitoring.find({ userId: req.user?._id })
        .populate("poultryId", "batchNumber")
        .sort({
          createdAt: -1,
        });
    }
    // ✅ Formatage personnalisé
    const formattedMonitorings = Monitorings.map((monitoring) => {
      const poultry = monitoring.poultryId as {
        _id: string;
        batchNumber: string;
      };

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
  } catch (error) {
    res.status(500).json({
      message: "Error fetching monitoring records",
      error: (error as Error).message,
    });
  }
};

export const getMonitoringById = async (req: AuthRequest, res: Response) => {
  try {
    const monitoring = await Monitoring.findOne({
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
  } catch (error) {
    res.status(500).json({
      message: "Error fetching monitoring record",
      error: (error as Error).message,
    });
  }
};

export const updateMonitoring = async (req: AuthRequest, res: Response) => {
  try {
    const isAdmin = req.user?.role === "admin";
    const monitoringId = req.params.id;

    if (!monitoringId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const filter = isAdmin
      ? { _id: monitoringId } // admin peut tout modifier
      : { _id: monitoringId, userId: req.user?._id };

    const updatedMonitoring = await Monitoring.findOneAndUpdate(
      filter,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedMonitoring) {
      return res.status(404).json({
        message: "Monitoring introuvable ou non autorisé",
      });
    }

    res.json({
      message: "Monitoring record updated successfully",
      data: updatedMonitoring,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour du monitoring record",
      error: (error as Error).message,
    });
  }
};

export const deleteMonitoring = async (req: AuthRequest, res: Response) => {
  try {
    const monitoring = await Monitoring.findOneAndDelete({
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
  } catch (error) {
    res.status(500).json({
      message: "Error deleting monitoring record",
      error: (error as Error).message,
    });
  }
};
