import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { getDb } from "../db/connect";

const getAllMovies = async (req: Request, res: Response) => {
  const result = await getDb().collection("movies").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getSingleMovie = async (req: Request, res: Response) => {
  const userId = new ObjectId(req.params.id);
  const result = await getDb().collection("movies").find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const createMovie = async (req: Request, res: Response) => {
  const movie = {
    title: req.body.title,
    director: req.body.director,
    releaseYear: req.body.releaseYear,
    rating: req.body.rating,
    runtime: req.body.runtime,
    genre: req.body.genre,
    score: req.body.score,
    description: req.body.description,
  };
  const response = await getDb().collection("movies").insertOne(movie);
  
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json("Some error occured while creating the movie");
  }
};

const updateMovie = async (req: Request, res: Response) => {
  const userId = new ObjectId(req.params.id);
  const movie = {
    title: req.body.title,
    director: req.body.director,
    releaseYear: req.body.releaseYear,
    rating: req.body.rating,
    runtime: req.body.runtime,
    genre: req.body.genre,
    score: req.body.score,
    description: req.body.description,
  };
  const response = await getDb()
  .collection("movies")
  .replaceOne({ _id: userId }, movie);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json("Some error occured while updating the movie");
  }
};

const deleteMovie = async (req: Request, res: Response) => {
  const userId = new ObjectId(req.params.id);
  const response = await getDb().collection("movies").deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json("Some error occured while deleting the movie");
  }
};

export {
  getAllMovies,
  getSingleMovie,
  createMovie,
  updateMovie,
  deleteMovie,
};