"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getSingleUser = exports.getAllUsers = void 0;
const mongodb_1 = require("mongodb");
const connect_1 = require("../db/connect");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, connect_1.getDb)().collection("users").find();
        result.toArray().then((lists) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(lists);
        });
    }
    catch (error) {
        console.error("Error retrieving all users:", error);
        res
            .status(500)
            .json({ error: "An error occured while retrieving all users" });
    }
});
exports.getAllUsers = getAllUsers;
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = new mongodb_1.ObjectId(req.params.id);
        const result = yield (0, connect_1.getDb)().collection("users").find({ _id: userId });
        const lists = yield result.toArray();
        if (lists.length === 0) {
            res.status(404).json({ error: "User not found" });
        }
        else {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(lists[0]);
        }
    }
    catch (error) {
        console.error("Error retrieving user by ID:", error);
        res
            .status(500)
            .json({ error: "An error occured while retrieving the user" });
    }
});
exports.getSingleUser = getSingleUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
        };
        const response = yield (0, connect_1.getDb)().collection("users").insertOne(user);
        if (response.acknowledged) {
            res.status(201).json(response);
        }
        else {
            res.status(500).json({
                error: "An error occured while creating the user",
            });
        }
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "An error occured while creating the user" });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = new mongodb_1.ObjectId(req.params.id);
        const user = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
        };
        const response = yield (0, connect_1.getDb)()
            .collection("users")
            .replaceOne({ _id: userId }, user);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        }
        else {
            res.status(404).json("User not found");
        }
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "An error occured while updating the user" });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = new mongodb_1.ObjectId(req.params.id);
        const response = yield (0, connect_1.getDb)()
            .collection("users")
            .deleteOne({ _id: userId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        }
        else {
            res.status(404).json("User not found");
        }
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "An error occured while deleting the user" });
    }
});
exports.deleteUser = deleteUser;
