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
exports.createAssociation = exports.getSingleAssociation = exports.getAllAssociations = void 0;
const mongodb_1 = require("mongodb");
const connect_1 = require("../db/connect");
const getAllAssociations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, connect_1.getDb)().collection("movieActors").find();
        const lists = yield result.toArray();
        res.status(200).json(lists);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: "A unknown error occurred" });
        }
    }
});
exports.getAllAssociations = getAllAssociations;
const getSingleAssociation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, connect_1.getDb)()
            .collection("movieActors")
            .findOne({ _id: new mongodb_1.ObjectId(req.params.id) });
        res.status(200).json(result);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: "A unknown error occurred" });
        }
    }
});
exports.getSingleAssociation = getSingleAssociation;
const createAssociation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieId, actorId } = req.body;
        const association = {
            movieId: new mongodb_1.ObjectId(movieId),
            actorId: new mongodb_1.ObjectId(actorId),
        };
        const result = yield (0, connect_1.getDb)()
            .collection("movieActors")
            .insertOne(association);
        if (result.acknowledged) {
            res.status(201).json(result);
        }
        else {
            res.status(500).json({ message: "Failed to create assocation" });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: "A unknown error occurred" });
        }
    }
});
exports.createAssociation = createAssociation;
