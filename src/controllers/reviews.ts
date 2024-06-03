import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { getDb } from "../db/connect";

const getAllReviews = async (req: Request, res: Response) => {
  try {
    const result = await getDb().collection("reviews").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    console.error("Error retrieving all reviews:", error);
    res
      .status(500)
      .json({ error: "An error occured while retrieving all reviews" });
  }
};

const getSingleReview = async (req: Request, res: Response) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await getDb().collection("reviews").find({ _id: userId });
    const lists = await result.toArray();
    if (lists.length === 0) {
      res.status(404).json({ error: "Review not found" });
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    }
  } catch (error) {
    console.error("Error retrieving review by ID:", error);
    res
      .status(500)
      .json({ error: "An error occured while retrieving the review" });
  }
};

const createReview = async (req: Request, res: Response) => {
  try {
    const { movieId, userId } = req.body;
    const review = {
      movieId: new ObjectId(movieId),
      userId: new ObjectId(userId),
      score: req.body.score,
      comment: req.body.comment,
    };
    const response = await getDb().collection("reviews").insertOne(review);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({
        error: "An error occured while creating the review",
      });
    }
  } catch (error) {
    console.error("Error creating review:", error);
    res
      .status(500)
      .json({ error: "An error occured while creating the review" });
  }
};

const updateReview = async (req: Request, res: Response) => {
  try {
    const user = new ObjectId(req.params.id);
    const { movieId, userId } = req.body;
    const review = {
      movieId: new ObjectId(movieId),
      userId: new ObjectId(userId),
      score: req.body.score,
      comment: req.body.comment,
    };
    const response = await getDb()
      .collection("reviews")
      .replaceOne({ _id: user }, review);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json("Review not found");
    }
  } catch (error) {
    console.error("Error updating review:", error);
    res
      .status(500)
      .json({ error: "An error occured while updating the review" });
  }
};

const deleteReview = async (req: Request, res: Response) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await getDb()
      .collection("reviews")
      .deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json("Review not found");
    }
  } catch (error) {
    console.error("Error deleting review:", error);
    res
      .status(500)
      .json({ error: "An error occured while deleting the review" });
  }
};

export {
  getAllReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview,
};
