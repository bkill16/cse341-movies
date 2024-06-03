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
exports.deleteReview = exports.updateReview = exports.createReview = exports.getSingleReview = exports.getAllReviews = void 0;
const mongodb_1 = require("mongodb");
const connect_1 = require("../db/connect");
const getAllReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, connect_1.getDb)().collection("reviews").find();
        result.toArray().then((lists) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(lists);
        });
    }
    catch (error) {
        console.error("Error retrieving all reviews:", error);
        res
            .status(500)
            .json({ error: "An error occured while retrieving all reviews" });
    }
});
exports.getAllReviews = getAllReviews;
const getSingleReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = new mongodb_1.ObjectId(req.params.id);
        const result = yield (0, connect_1.getDb)().collection("reviews").find({ _id: userId });
        const lists = yield result.toArray();
        if (lists.length === 0) {
            res.status(404).json({ error: "Review not found" });
        }
        else {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(lists[0]);
        }
    }
    catch (error) {
        console.error("Error retrieving review by ID:", error);
        res
            .status(500)
            .json({ error: "An error occured while retrieving the review" });
    }
});
exports.getSingleReview = getSingleReview;
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieId, userId } = req.body;
        const review = {
            movieId: new mongodb_1.ObjectId(movieId),
            userId: new mongodb_1.ObjectId(userId),
            score: req.body.score,
            comment: req.body.comment,
        };
        const response = yield (0, connect_1.getDb)().collection("reviews").insertOne(review);
        if (response.acknowledged) {
            res.status(201).json(response);
        }
        else {
            res.status(500).json({
                error: "An error occured while creating the review",
            });
        }
    }
    catch (error) {
        console.error("Error creating review:", error);
        res
            .status(500)
            .json({ error: "An error occured while creating the review" });
    }
});
exports.createReview = createReview;
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new mongodb_1.ObjectId(req.params.id);
        const { movieId, userId } = req.body;
        const review = {
            movieId: new mongodb_1.ObjectId(movieId),
            userId: new mongodb_1.ObjectId(userId),
            score: req.body.score,
            comment: req.body.comment,
        };
        const response = yield (0, connect_1.getDb)()
            .collection("reviews")
            .replaceOne({ _id: user }, review);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        }
        else {
            res.status(404).json("Review not found");
        }
    }
    catch (error) {
        console.error("Error updating review:", error);
        res
            .status(500)
            .json({ error: "An error occured while updating the review" });
    }
});
exports.updateReview = updateReview;
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = new mongodb_1.ObjectId(req.params.id);
        const response = yield (0, connect_1.getDb)()
            .collection("reviews")
            .deleteOne({ _id: userId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        }
        else {
            res.status(404).json("Review not found");
        }
    }
    catch (error) {
        console.error("Error deleting review:", error);
        res
            .status(500)
            .json({ error: "An error occured while deleting the review" });
    }
});
exports.deleteReview = deleteReview;
