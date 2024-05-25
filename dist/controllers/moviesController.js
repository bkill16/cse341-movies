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
exports.createMovie = exports.getSingleMovie = exports.getAllMovies = void 0;
const mongodb_1 = require("mongodb");
const connect_1 = require("../db/connect");
const getAllMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, connect_1.getDb)().collection("movies").find();
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
exports.getAllMovies = getAllMovies;
const getSingleMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, connect_1.getDb)()
            .collection("movies")
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
exports.getSingleMovie = getSingleMovie;
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = {
            title: req.body.title,
            director: req.body.director,
            releaseYear: req.body.releaseYear,
            rating: req.body.rating,
            runtime: req.body.runtime,
            genre: req.body.genre,
            cast: req.body.cast,
            score: req.body.score,
            description: req.body.description,
        };
        const result = yield (0, connect_1.getDb)().collection("movies").insertOne(movie);
        if (result.acknowledged) {
            res.status(201).json(result);
        }
        else {
            res.status(500).json({ message: "Failed to create movie" });
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
exports.createMovie = createMovie;
