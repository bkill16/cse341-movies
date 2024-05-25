import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { getDb } from "../db/connect";

const getAllMovies = async (req: Request, res: Response) => {
  try {
    const result = await getDb().collection("movies").find();
    const lists = await result.toArray();
    res.status(200).json(lists);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "A unknown error occurred" });
    }
  }
};

const getSingleMovie = async (req: Request, res: Response) => {
  try {
    const result = await getDb()
      .collection("movies")
      .findOne({ _id: new ObjectId(req.params.id) });
    res.status(200).json(result);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "A unknown error occurred" });
    }
  }
};

const createMovie = async (req: Request, res: Response) => {
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
    const result = await getDb().collection("movies").insertOne(movie);
    if (result.acknowledged) {
      res.status(201).json(result);
    } else {
      res.status(500).json({ message: "Failed to create movie" });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "A unknown error occurred" });
    }
  }
};

export { getAllMovies, getSingleMovie, createMovie };
