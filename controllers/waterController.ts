import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { Water } from "../models/waterModel";

export const createWater = async (req: AuthRequest, res: Response) => {
  try {
    const water = new Water({
      ...req.body,
      userId: req.user?._id,
    });

    await water.save();

    res.status(201).json({
      message: "Water record created successfully",
      data: water,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating water record",
      error: (error as Error).message,
    });
  }
};

export const getWaters = async (req: AuthRequest, res: Response) => {
  try {
    // Vérifie si l'utilisateur est admin
    const isAdmin = req.user?.role === "admin";

    let waters;

    if (isAdmin) {
      // Si admin, récupérer tous les enregistrements
      waters = await Water.find()
        .populate("poultryId", "batchNumber")
        .sort({ createdAt: -1 });
    } else {
      // Sinon, récupérer uniquement ceux de l'utilisateur connecté
      waters = await Water.find({ userId: req.user?._id })
        .populate("poultryId", "batchNumber")
        .sort({
          createdAt: -1,
        });
    }

    // ✅ Formatage personnalisé
    const formattedwaters = waters.map((water) => {
      const poultry = water.poultryId as {
        _id: string;
        batchNumber: string;
      };

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
  } catch (error) {
    res.status(500).json({
      message: "Error fetching water records",
      error: (error as Error).message,
    });
  }
};

export const getWaterById = async (req: AuthRequest, res: Response) => {
  try {
    const water = await Water.findOne({
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
  } catch (error) {
    res.status(500).json({
      message: "Error fetching water record",
      error: (error as Error).message,
    });
  }
};

export const updateWater = async (req: AuthRequest, res: Response) => {
  try {
    const isAdmin = req.user?.role === "admin";
    const waterId = req.params.id;

    if (!waterId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const filter = isAdmin
      ? { _id: waterId } // admin peut tout modifier
      : { _id: waterId, userId: req.user?._id };

    const updatedWater = await Water.findOneAndUpdate(filter, req.body, {
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
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour du water record",
      error: (error as Error).message,
    });
  }
};

export const deleteWater = async (req: AuthRequest, res: Response) => {
  try {
    const water = await Water.findOneAndDelete({
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
  } catch (error) {
    res.status(500).json({
      message: "Error deleting water record",
      error: (error as Error).message,
    });
  }
};
