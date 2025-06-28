// import { Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import { config } from "../config";
// import { AuthRequest } from "../middlewares/authMiddleware";
// import { User } from "../models/userModel";

// export const register = async (req: Request, res: Response) => {
//   try {
//     const { username, email, accountNumber, password } = req.body;

//     const existingUser = await User.findOne({
//       $or: [{ accountNumber }, { username }],
//     });

//     if (existingUser) {
//       return res.status(400).json({
//         message: "User already exists",
//       });
//     }

//     const user = new User({
//       username,
//       accountNumber,
//       email,
//       password,
//     });

//     await user.save();

//     const token = jwt.sign({ id: user._id }, config.jwtSecret, {
//       expiresIn: "1d",
//     });

//     res.status(201).json({
//       message: "User registered successfully",
//       token,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error registering user",
//       error: (error as Error).message,
//     });
//   }
// };

// export const login = async (req: Request, res: Response) => {
//   try {
//     const { accountNumber, password } = req.body;

//     const user = await User.findOne({ accountNumber });
//     if (!user) {
//       return res.status(401).json({
//         message: "Invalid credentials",
//       });
//     }

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(401).json({
//         message: "Invalid credentials",
//       });
//     }

//     const token = jwt.sign({ id: user._id }, config.jwtSecret, {
//       expiresIn: "1d",
//     });

//     res.json({
//       message: "Login successful",
//       token,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error logging in",
//       error: (error as Error).message,
//     });
//   }
// };

// export const getUser = async (req: AuthRequest, res: Response) => {
//   try {
//     const user = await User.findById(req.user).select("-password"); // on exclut le mot de passe
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const users = {
//       _id: user.id,
//       username: user.username,
//       email: user.email,
//       accountNumber: user.accountNumber.toString(),
//       // Le mot de passe serait ici s'il n'était pas exclu par .select("-password")
//       password: user.password,
//       role: user.role,
//       createdAt: user.createdAt, // Convertir en objet Date si possible
//       updatedAt: user.updatedAt,
//     };

//     res.json(users);

//     // res.json({
//     //   message: "Loggecd data successful",
//     //   user,
//     // });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error fetching user",
//       error: (error as Error).message,
//     });
//   }
// };

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { AuthRequest } from "../middlewares/authMiddleware";
import { User } from "../models/userModel";

// Génère un JWT
const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, config.jwtSecret, { expiresIn: "1d" });
};

// Inscription d'un utilisateur
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, accountNumber, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ accountNumber }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "Utilisateur déjà existant." });
    }

    const newUser = new User({
      username,
      email,
      accountNumber,
      password,
    });

    await newUser.save();

    const token = generateToken(newUser._id.toString());

    res.status(201).json({
      message: "Utilisateur enregistré avec succès.",
      token,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: "Erreur lors de l'enregistrement.",
      error: (error as Error).message,
    });
  }
};

// Connexion d'un utilisateur
export const login = async (req: Request, res: Response) => {
  try {
    const { accountNumber, password } = req.body;

    const user = await User.findOne({ accountNumber });
    if (!user) {
      return res.status(401).json({ message: "Identifiants invalides." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Identifiants invalides." });
    }

    const token = generateToken(user._id.toString());

    const CurrentUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      accountNumber: user.accountNumber.toString(),
      token: token,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    res.status(200).json({
      message: "Connexion réussie.",
      token,
      CurrentUser,
    });

    // res.status(200).json({
    //   message: "Connexion réussie.",
    //   token,
    //   ...CurrentUser,
    // });
  } catch (error: unknown) {
    res.status(500).json({
      message: "Erreur lors de la connexion.",
      error: (error as Error).message,
    });
  }
};

// Récupération des infos d'un utilisateur
export const getUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      accountNumber: user.accountNumber.toString(),
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });

    //  const CurrentUser = {
    //   _id: user._id,
    //   username: user.username,
    //   email: user.email,
    //   accountNumber: user.accountNumber.toString(),
    //   role: user.role,
    //   createdAt: user.createdAt,
    //   updatedAt: user.updatedAt,
    // };

    // res.json({
    //   _id: user._id,
    //   username: user.username,
    //   email: user.email,
    //   accountNumber: user.accountNumber.toString(),
    //   role: user.role,
    //   createdAt: user.createdAt,
    //   updatedAt: user.updatedAt,
    // });
    // // res.json({
    // //   message: "Loggecd data successful",
    // //   CurrentUser,
    // // });
  } catch (error: unknown) {
    res.status(500).json({
      message: "Erreur lors de la récupération de l'utilisateur.",
      error: (error as Error).message,
    });
  }
};
export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    // Vérifie si l'utilisateur est admin
    const isAdmin = req.user?.role === "admin";

    let users;

    if (isAdmin) {
      // Si admin, récupérer tous les enregistrements
      users = await User.find().sort({ createdAt: -1 });
    } else {
      // Sinon, récupérer uniquement ceux de l'utilisateur connecté
      users = await User.find({ userId: req.user?._id }).sort({
        createdAt: -1,
      });
    }
    const user = await User.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user?._id,
      },
      req.body,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User  updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating user ",
      error: (error as Error).message,
    });
  }
};
