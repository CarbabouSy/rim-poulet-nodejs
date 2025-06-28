"use strict";
// import { Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import { config } from "../config";
// import { AuthRequest } from "../middlewares/authMiddleware";
// import { User } from "../models/userModel";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUser = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const userModel_1 = require("../models/userModel");
// Génère un JWT
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, config_1.config.jwtSecret, { expiresIn: "1d" });
};
// Inscription d'un utilisateur
const register = async (req, res) => {
    try {
        const { username, email, accountNumber, password } = req.body;
        const existingUser = await userModel_1.User.findOne({
            $or: [{ accountNumber }, { username }],
        });
        if (existingUser) {
            return res.status(400).json({ message: "Utilisateur déjà existant." });
        }
        const newUser = new userModel_1.User({
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
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur lors de l'enregistrement.",
            error: error.message,
        });
    }
};
exports.register = register;
// Connexion d'un utilisateur
const login = async (req, res) => {
    try {
        const { accountNumber, password } = req.body;
        const user = await userModel_1.User.findOne({ accountNumber });
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
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur lors de la connexion.",
            error: error.message,
        });
    }
};
exports.login = login;
// Récupération des infos d'un utilisateur
const getUser = async (req, res) => {
    try {
        const user = await userModel_1.User.findById(req.user).select("-password");
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
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération de l'utilisateur.",
            error: error.message,
        });
    }
};
exports.getUser = getUser;
const updateUser = async (req, res) => {
    try {
        // Vérifie si l'utilisateur est admin
        const isAdmin = req.user?.role === "admin";
        let users;
        if (isAdmin) {
            // Si admin, récupérer tous les enregistrements
            users = await userModel_1.User.find().sort({ createdAt: -1 });
        }
        else {
            // Sinon, récupérer uniquement ceux de l'utilisateur connecté
            users = await userModel_1.User.find({ userId: req.user?._id }).sort({
                createdAt: -1,
            });
        }
        const user = await userModel_1.User.findOneAndUpdate({
            _id: req.params.id,
            userId: req.user?._id,
        }, req.body, { new: true });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.json({
            message: "User  updated successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error updating user ",
            error: error.message,
        });
    }
};
exports.updateUser = updateUser;
