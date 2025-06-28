// import { Response } from "express";
// import { AuthRequest } from "../middlewares/authMiddleware";
// import { Poultry } from "../models/poultryModel";

// // export const createPoultry = async (req: AuthRequest, res: Response) => {
// //   try {
// //     const poultry = new Poultry({
// //       ...req.body,
// //       userId: req.user?._id
// //     });

// //     await poultry.save();

// //     res.status(201).json({
// //       message: 'Poultry batch created successfully',
// //       data: poultry
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       message: 'Error creating poultry batch',
// //       error: (error as Error).message
// //     });
// //   }
// // };

// export const createPoultry = async (req: AuthRequest, res: Response) => {
//   try {
//     // Count existing poultry records to generate the next batch number
//     const count = await Poultry.countDocuments();
//     // const batchNumber = `BATCH-${String(count + 1).padStart(3, "0")}`; // e.g., BATCH-003
//     const batchNumber = `${req.body.type}-${String(count + 1).padStart(3, "0")}`; // e.g., BATCH-003
//     const poultry = new Poultry({
//       ...req.body,
//       batchNumber, // Auto-generated batchNumber
//       userId: req.user?._id,
//     });

//     await poultry.save();

//     res.status(201).json({
//       message: "Poultry batch created successfully",
//       data: poultry,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error creating poultry batch",
//       error: (error as Error).message,
//     });
//   }
// };

// export const getPoultriessss = async (req: AuthRequest, res: Response) => {
//   try {
//     const poultries = await Poultry.find({ userId: req.user?._id });

//     res.json({
//       data: poultries,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error fetching poultry batches",
//       error: (error as Error).message,
//     });
//   }
// };

// export const getPoultries = async (req: AuthRequest, res: Response) => {
//   try {
//     // Vérifie si l'utilisateur est admin
//     const isAdmin = req.user?.role === "admin";

//     let poultries;

//     if (isAdmin) {
//       // Si admin, récupérer tous les enregistrements
//       poultries = await Poultry.find().sort({ createdAt: -1 });
//     } else {
//       // Sinon, récupérer uniquement ceux de l'utilisateur connecté
//       poultries = await Poultry.find({ userId: req.user?._id }).sort({
//         createdAt: -1,
//       });
//     }

//     // On récupère tous les poulaillers de l'utilisateur, triés du plus récent au plus ancien
//     // const poultries = await Poultry.find({ userId: req.user?._id }).sort({
//     //   createdAt: -1,
//     // });
//     // On groupe les poulaillers par type
//     const grouped: Record<string, any[]> = {};

//     poultries.forEach((poultry) => {
//       const type = poultry.type || "Inconnu";
//       if (!grouped[type]) {
//         grouped[type] = [];
//       }
//       grouped[type].push(poultry);
//     });

//     res.json({
//       data: grouped,
//       poultries,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error fetching poultry batches",
//       error: (error as Error).message,
//     });
//   }
// };

// export const getPoultriesw = async (req: AuthRequest, res: Response) => {
//   try {
//     const poultries = await Poultry.find({ userId: req.user?._id }).sort({
//       createdAt: -1,
//     }); // Trie du plus récent au plus ancien

//     res.json({
//       data: poultries,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error fetching poultry batches",
//       error: (error as Error).message,
//     });
//   }
// };

// export const getPoultryById = async (req: AuthRequest, res: Response) => {
//   try {
//     const poultry = await Poultry.findOne({
//       _id: req.params.id,
//       userId: req.user?._id,
//     });

//     if (!poultry) {
//       return res.status(404).json({
//         message: "Poultry batch not found",
//       });
//     }

//     res.json({
//       data: poultry,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error fetching poultry batch",
//       error: (error as Error).message,
//     });
//   }
// };

// // export const updatePoultry = async (req: AuthRequest, res: Response) => {
// //   try {
// //     // Vérifie si l'utilisateur est admin
// //     const isAdmin = req.user?.role === "admin";

// //     let poultries;

// //     if (isAdmin) {
// //       // Si admin, récupérer tous les enregistrements
// //       poultries = await Poultry.find().sort({ createdAt: -1 });
// //     } else {
// //       // Sinon, récupérer uniquement ceux de l'utilisateur connecté
// //       poultries = await Poultry.find({ userId: req.user?._id }).sort({
// //         createdAt: -1,
// //       });
// //     }
// //     const poultry = await Poultry.findOneAndUpdate(
// //       {
// //         _id: req.params.id,
// //         userId: req.user?._id,
// //       },
// //       req.body,
// //       { new: true }
// //     );

// //     if (!poultry) {
// //       return res.status(404).json({
// //         message: "Poultry batch not found",
// //       });
// //     }

// //     res.json({
// //       message: "Poultry batch updated successfully",
// //       data: poultry,
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       message: "Erreur lors de la mise à jour du poultry batch",
// //       error: (error as Error).message,
// //     });
// //   }
// // };

// export const updatePoultry = async (req: AuthRequest, res: Response) => {
//   try {
//     const isAdmin = req.user?.role === "admin";
//     const poultryId = req.params.id;

//     if (!poultryId.match(/^[0-9a-fA-F]{24}$/)) {
//       return res.status(400).json({ message: "ID invalide" });
//     }

//     const filter = isAdmin
//       ? { _id: poultryId } // admin peut tout modifier
//       : { _id: poultryId, userId: req.user?._id };

//     const updatedPoultry = await Poultry.findOneAndUpdate(filter, req.body, {
//       new: true,
//     });

//     if (!updatedPoultry) {
//       return res.status(404).json({
//         message: "Lot introuvable ou non autorisé",
//       });
//     }

//     res.json({
//       message: "Lot mis à jour avec succès",
//       data: updatedPoultry,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Erreur lors de la mise à jour du lot",
//       error: (error as Error).message,
//     });
//   }
// };

// export const getPoultriesss = async (req: AuthRequest, res: Response) => {
//   try {
//     const userId = req.user?._id;
//     const categories = ["Poulet de Chair", "Pondeuse", "Coq", "Poussin"];

//     const groupedPoultries: Record<string, any[]> = {};

//     for (const category of categories) {
//       const items = await Poultry.find({ userId, category });
//       groupedPoultries[category] = items;
//     }

//     res.json({ data: groupedPoultries });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error fetching poultry batches",
//       error: (error as Error).message,
//     });
//   }
// };

// export const countPoultriesByCategory = async (
//   req: AuthRequest,
//   res: Response
// ) => {
//   try {
//     const userId = req.user?._id;

//     const categories = ["Poulet de Chair", "Pondeuse", "Coq", "Poussin"];

//     const counts: Record<string, number> = {};

//     for (const category of categories) {
//       const count = await Poultry.countDocuments({ userId, category });
//       counts[category] = count;
//     }

//     res.json({ data: counts });
//   } catch (error) {
//     res.status(500).json({
//       message: "Erreur lors du comptage des catégories",
//       error: (error as Error).message,
//     });
//   }
// };

import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { Feed } from "../models/feedModel";
import { Monitoring } from "../models/monitoringModel";
import { Mortality } from "../models/mortalityModel";
import { Poultry } from "../models/poultryModel";
import { Water } from "../models/waterModel";

/**
 * Crée un nouveau lot de volailles
 */
export const createPoultry = async (req: AuthRequest, res: Response) => {
  try {
    const count = await Poultry.countDocuments();
    const batchNumber = `${req.body.type}-${String(count + 1).padStart(3, "0")}`;

    const poultry = new Poultry({
      ...req.body,
      batchNumber,
      userId: req.user?._id,
    });

    await poultry.save();

    res.status(201).json({
      message: "Lot de volaille créé avec succès",
      data: poultry,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création du lot",
      error: (error as Error).message,
    });
  }
};

/**
 * Récupère tous les lots, groupés par type
 */
export const getPoultries = async (req: AuthRequest, res: Response) => {
  try {
    const isAdmin = req.user?.role === "admin";

    const poultries = isAdmin
      ? await Poultry.find().sort({ createdAt: -1 })
      : await Poultry.find({ userId: req.user?._id }).sort({ createdAt: -1 });

    const grouped: Record<string, any[]> = {};

    poultries.forEach((p) => {
      const type = p.type || "Inconnu";
      if (!grouped[type]) grouped[type] = [];
      grouped[type].push(p);
    });

    res.json({ data: grouped, poultries });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des lots",
      error: (error as Error).message,
    });
  }
};

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
export const getPoultryById = async (req: AuthRequest, res: Response) => {
  try {
    const poultry = await Poultry.findOne({
      _id: req.params.id,
      userId: req.user?._id,
    });

    if (!poultry) {
      return res.status(404).json({ message: "Lot introuvable" });
    }

    res.json({ data: poultry });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération du lot",
      error: (error as Error).message,
    });
  }
};

/**
 * Mise à jour d’un lot existant
 */
export const updatePoultry = async (req: AuthRequest, res: Response) => {
  try {
    const isAdmin = req.user?.role === "admin";
    const poultryId = req.params.id;

    if (!poultryId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const filter = isAdmin
      ? { _id: poultryId }
      : { _id: poultryId, userId: req.user?._id };

    const updated = await Poultry.findOneAndUpdate(filter, req.body, {
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

/**
 * Suppression d’un lot
 */
export const deletePoultrys = async (req: AuthRequest, res: Response) => {
  try {
    const deleted = await Poultry.findOneAndDelete({
      _id: req.params.id,
      userId: req.user?._id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Lot introuvable" });
    }

    res.json({ message: "Lot supprimé avec succès" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression",
      error: (error as Error).message,
    });
  }
};

export const deletePoultry = async (req: AuthRequest, res: Response) => {
  try {
    const poultryId = req.params.id;

    const deleted = await Poultry.findOneAndDelete({
      _id: poultryId,
      userId: req.user?._id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Lot introuvable" });
    }

    // Supprimer les enregistrements liés (suivis, mortalités, etc.)
    await Feed.deleteMany({ poultryId });
    await Water.deleteMany({ poultryId });
    await Monitoring.deleteMany({ poultryId });
    await Mortality.deleteMany({ poultryId }); // Optionnel, selon ton modèle

    res.json({ message: "Lot et données associées supprimés avec succès" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression",
      error: (error as Error).message,
    });
  }
};

/**
 * Récupération groupée par catégorie
 */
export const getPoultriesGroupedByCategory = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?._id;
    const categories = ["Poulet de Chair", "Pondeuse", "Coq", "Poussin"];

    const grouped: Record<string, any[]> = {};

    for (const category of categories) {
      const items = await Poultry.find({ userId, category });
      grouped[category] = items;
    }

    res.json({ data: grouped });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des catégories",
      error: (error as Error).message,
    });
  }
};

/**
 * Comptage par catégorie
 */
export const countPoultriesByCategory = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?._id;
    const categories = ["Poulet de Chair", "Pondeuse", "Coq", "Poussin"];

    const counts: Record<string, number> = {};

    for (const category of categories) {
      counts[category] = await Poultry.countDocuments({ userId, category });
    }

    res.json({ data: counts });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors du comptage des catégories",
      error: (error as Error).message,
    });
  }
};

export const countTotalPoultriess = async (req: AuthRequest, res: Response) => {
  try {
    const isAdmin = req.user?.role === "admin";

    const filter = isAdmin ? {} : { userId: req.user?._id };

    const total = await Poultry.countDocuments(filter);

    // Compter aussi par type
    const categories = ["Poulet de Chair", "Pondeuse", "Coq", "Poussin"];
    const countsByCategory: Record<string, number> = {};

    for (const category of categories) {
      countsByCategory[category] = await Poultry.countDocuments({
        ...filter,
        category,
      });
    }

    res.json({
      total,
      categories: countsByCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors du comptage global",
      error: (error as Error).message,
    });
  }
};

export const countTotalPoultries = async (req: AuthRequest, res: Response) => {
  try {
    const isAdmin = req.user?.role === "admin";
    const filter = isAdmin ? {} : { userId: req.user?._id };

    const total = await Poultry.countDocuments(filter);

    const types = ["Poulet de Chair", "Pondeuse", "Coq", "Poussin"];
    const countsByType: Record<string, number> = {};

    for (const type of types) {
      const count = await Poultry.countDocuments({
        ...filter,
        type, // <<== ici le correctif
      });
      countsByType[type] = count;
    }

    res.json({
      total,
      categories: countsByType,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors du comptage global",
      error: (error as Error).message,
    });
  }
};
