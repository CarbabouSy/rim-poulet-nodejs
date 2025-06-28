import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { Feed } from "../models/feedModel";

export const createFeed = async (req: AuthRequest, res: Response) => {
  try {
    const feed = new Feed({
      ...req.body,
      userId: req.user?._id,
    });

    await feed.save();

    res.status(201).json({
      message: "Feed record created successfully",
      data: feed,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating feed record",
      error: (error as Error).message,
    });
  }
  0;
};

export const getFeedss = async (req: AuthRequest, res: Response) => {
  try {
    const feeds = await Feed.find({ userId: req.user?._id })
      .populate("poultryId", "batchNumber")
      .sort({
        createdAt: -1,
      });

    res.json({
      data: feeds,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching feed records",
      error: (error as Error).message,
    });
  }
};
export const getFeeds = async (req: AuthRequest, res: Response) => {
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
      Alimentations = await Feed.find()
        .populate("poultryId", "batchNumber")
        .sort({ createdAt: -1 });
    } else {
      // Sinon, récupérer uniquement ceux de l'utilisateur connecté
      Alimentations = await Feed.find({ userId: req.user?._id })
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
      const poultry = feed.poultryId as { _id: string; batchNumber: string };

      return {
        ...feed.toObject(),
        poultryId: poultry._id,
        batchNumber: poultry.batchNumber,
      };
    });

    // ✅ Groupement
    const grouped: Record<string, any[]> = {};
    formattedAlimentations.forEach((feed) => {
      const type = feed.type || "Inconnu";
      if (!grouped[type]) grouped[type] = [];
      grouped[type].push(feed);
    });

    res.json({
      data: grouped,
      Alimentations: formattedAlimentations,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching feed batches",
      error: (error as Error).message,
    });
  }
};

export const getFeedById = async (req: AuthRequest, res: Response) => {
  try {
    const feed = await Feed.findOne({
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
  } catch (error) {
    res.status(500).json({
      message: "Error fetching feed record",
      error: (error as Error).message,
    });
  }
};

export const updateFeed = async (req: AuthRequest, res: Response) => {
  try {
    const isAdmin = req.user?.role === "admin";
    const feedId = req.params.id;

    if (!feedId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const filter = isAdmin
      ? { _id: feedId } // admin peut tout modifier
      : { _id: feedId, userId: req.user?._id };

    const updatedFeed = await Feed.findOneAndUpdate(filter, req.body, {
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
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour du feed record",
      error: (error as Error).message,
    });
  }
};

export const deleteFeed = async (req: AuthRequest, res: Response) => {
  try {
    const feed = await Feed.findOneAndDelete({
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
  } catch (error) {
    res.status(500).json({
      message: "Error deleting feed record",
      error: (error as Error).message,
    });
  }
};
