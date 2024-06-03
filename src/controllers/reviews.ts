import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { getDb } from "../db/connect";

const getAllReviews = async (req: Request, res: Response) => {
  const result = await getDb().collection("reviews").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getSingleReview = async (req: Request, res: Response) => {
  const userId = new ObjectId(req.params.id);
  const result = await getDb().collection("reviews").find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const createReview = async (req: Request, res: Response) => {
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
    res.status(500).json("Some error occured while creating the review");
  }
};

const updateReview = async (req: Request, res: Response) => {
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
    res.status(500).json("Some error occured while updating the review");
  }
};

const deleteReview = async (req: Request, res: Response) => {
  const userId = new ObjectId(req.params.id);
  const response = await getDb()
    .collection("reviews")
    .deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json("Some error occured while deleting the reivew");
  }
};

export {
  getAllReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview,
};