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
exports.deleteMovie = exports.updateMovie = exports.createMovie = exports.getSingleMovie = exports.getAllMovies = void 0;
const mongodb_1 = require("mongodb");
const connect_1 = require("../db/connect");
const getAllMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, connect_1.getDb)().collection("movies").find();
    result.toArray().then((lists) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(lists);
    });
});
exports.getAllMovies = getAllMovies;
const getSingleMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = new mongodb_1.ObjectId(req.params.id);
    const result = yield (0, connect_1.getDb)().collection("movies").find({ _id: userId });
    result.toArray().then((lists) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(lists[0]);
    });
});
exports.getSingleMovie = getSingleMovie;
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movie = {
        title: req.body.title,
        releaseYear: req.body.releaseYear,
        director: req.body.director,
        rated: req.body.rated,
        runtime: req.body.runtime,
        description: req.body.description,
        cast: req.body.cast,
        genres: req.body.genres
    };
    const response = yield (0, connect_1.getDb)().collection("movies").insertOne(movie);
    if (response.acknowledged) {
        res.status(201).json(response);
    }
    else {
        res.status(500).json("Some error occured while creating the movie");
    }
});
exports.createMovie = createMovie;
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = new mongodb_1.ObjectId(req.params.id);
    const movie = {
        title: req.body.title,
        releaseYear: req.body.releaseYear,
        director: req.body.director,
        rated: req.body.rated,
        runtime: req.body.runtime,
        description: req.body.description,
        cast: req.body.cast,
        genres: req.body.genres
    };
    const response = yield (0, connect_1.getDb)()
        .collection("movies")
        .replaceOne({ _id: userId }, movie);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json("Some error occured while updating the movie");
    }
});
exports.updateMovie = updateMovie;
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = new mongodb_1.ObjectId(req.params.id);
    const response = yield (0, connect_1.getDb)().collection("movies").deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json("Some error occured while deleting the movie");
    }
});
exports.deleteMovie = deleteMovie;
