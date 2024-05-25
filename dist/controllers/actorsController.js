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
exports.createActor = exports.getSingleActor = exports.getAllActors = void 0;
const mongodb_1 = require("mongodb");
const connect_1 = require("../db/connect");
const getAllActors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, connect_1.getDb)().collection("actors").find();
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
exports.getAllActors = getAllActors;
const getSingleActor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, connect_1.getDb)()
            .collection("actors")
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
exports.getSingleActor = getSingleActor;
const createActor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const actor = {
            name: req.body.name,
            birthDate: req.body.birthDate,
            deathDate: req.body.deathDate,
            nationality: req.body.nationality,
            movies: req.body.movies
        };
        const result = yield (0, connect_1.getDb)().collection("actors").insertOne(actor);
        if (result.acknowledged) {
            res.status(201).json(result);
        }
        else {
            res.status(500).json({ message: "Failed to create actor" });
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
exports.createActor = createActor;
