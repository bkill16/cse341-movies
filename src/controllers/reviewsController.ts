import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { getDb } from "../db/connect";
import { body, param } from "express-validator";

// Validation middleware
const validateReviewData = [
  body("movieId").isMongoId().withMessage("Invalid movie ID"),
  body("userId").isMongoId().withMessage("Invalid user ID"),
  body("score").isFloat({ min: 0, max: 5 }).withMessage("Score should be a number between 0 and 5"),
  body("comment").isString().withMessage("Comment should be a string"),
];

const validateObjectId = [
  param("id")
    .custom((value) => ObjectId.isValid(value))
    .withMessage("Invalid ID format"),
];

const validateRequest = (req: Request, res: Response, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Controller functions
const getAllReviews = async (req: Request, res: Response) => {
  try {
    const result = await getDb().collection("reviews").find().toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while fetching reviews",
      details: (error as Error).message,
    });
  }
};

const getSingleReview = async (req: Request, res: Response) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await getDb().collection("reviews").findOne({ _id: userId });
    if (!result) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while fetching the review",
      details: (error as Error).message,
    });
  }
};

const createReview = async (req: Request, res: Response) => {
  try {
    const review = {
      movieId: new ObjectId(req.body.movieId),
      userId: new ObjectId(req.body.userId),
      score: req.body.score,
      comment: req.body.comment,
    };
    const response = await getDb().collection("reviews").insertOne(review);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ error: "An error occurred while creating the review" });
    }
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while creating the review",
      details: (error as Error).message,
    });
  }
};

const updateReview = async (req: Request, res: Response) => {
  try {
    const userId = new ObjectId(req.params.id);
    const review = {
      movieId: new ObjectId(req.body.movieId),
      userId: new ObjectId(req.body.userId),
      score: req.body.score,
      comment: req.body.comment,
    };
    const response = await getDb().collection("reviews").replaceOne({ _id: userId }, review);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: "An error occurred while updating the review" });
    }
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while updating the review",
      details: (error as Error).message,
    });
  }
};

const deleteReview = async (req: Request, res: Response) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await getDb().collection("reviews").deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: "An error occurred while deleting the review" });
    }
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while deleting the review",
      details: (error as Error).message,
    });
  }
};

export {
  getAllReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview,
  validateReviewData,
  validateObjectId,
  validateRequest,
};
