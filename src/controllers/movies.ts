import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { getDb } from "../db/connect";

const getAllMovies = async (req: Request, res: Response) => {
  try {
    const result = await getDb().collection("movies").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    console.error("Error retrieving all movies:", error);
    res
      .status(500)
      .json({ error: "An error occured while retrieving all movies" });
  }
};

const getSingleMovie = async (req: Request, res: Response) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await getDb().collection("movies").find({ _id: userId });
    const lists = await result.toArray();
    if (lists.length === 0) {
      res.status(404).json({ error: "Movie not found" });
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    }
  } catch (error) {
    console.error("Error retrieving movie by ID:", error);
    res
      .status(500)
      .json({ error: "An error occured while retrieving the movie" });
  }
};

const createMovie = async (req: Request, res: Response) => {
  try {
    const movie = {
      title: req.body.title,
      releaseYear: req.body.releaseYear,
      director: req.body.director,
      rated: req.body.rated,
      runtime: req.body.runtime,
      description: req.body.description,
      cast: req.body.cast,
      genres: req.body.genres,
    };
    const response = await getDb().collection("movies").insertOne(movie);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json({ error: "An error occured while creating the movie" });
    }
  } catch (error) {
    console.error("Error creating movie:", error);
    res
      .status(500)
      .json({ error: "An error occured while creating the movie" });
  }
};

const updateMovie = async (req: Request, res: Response) => {
  try {
    const userId = new ObjectId(req.params.id);
    const movie = {
      title: req.body.title,
      releaseYear: req.body.releaseYear,
      director: req.body.director,
      rated: req.body.rated,
      runtime: req.body.runtime,
      description: req.body.description,
      cast: req.body.cast,
      genres: req.body.genres,
    };
    const response = await getDb()
      .collection("movies")
      .replaceOne({ _id: userId }, movie);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json("Movie not found");
    }
  } catch (error) {
    console.error("Error updating movie:", error);
    res
      .status(500)
      .json({ error: "An error occured while updating the movie" });
  }
};

const deleteMovie = async (req: Request, res: Response) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await getDb()
      .collection("movies")
      .deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json("Movie not found");
    }
  } catch (error) {
    console.error("Error deleting movie:", error);
    res
      .status(500)
      .json({ error: "An error occured while deleting the movie" });
  }
};

export { getAllMovies, getSingleMovie, createMovie, updateMovie, deleteMovie };
