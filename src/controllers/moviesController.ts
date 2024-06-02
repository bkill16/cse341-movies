import { ObjectId } from "mongodb";
import { Request, Response, NextFunction } from "express";
import { getDb } from "../db/connect";
import { body, param, validationResult } from "express-validator";

// Validation middleware
const validateMovieData = [
  body("title").notEmpty().withMessage("Title is required"),
  body("releaseYear")
    .matches(/^\d{4}$/)
    .withMessage("Release year should be a four-digit string"),
  body("director").notEmpty().withMessage("Director is required"),
  body("rated").notEmpty().withMessage("Rated is required"),
  body("runtime")
    .matches(/^\d+ mins$/)
    .withMessage('Runtime should be in the format "XXX mins"'),
  body("description").notEmpty().withMessage("Description is required"),
  body("cast")
    .notEmpty()
    .withMessage("Cast is required")
    .custom((value) => {
      if (Array.isArray(value) || typeof value === "string") {
        return true;
      }
      throw new Error("Cast should be an array or a single string");
    }),
  body("genres")
    .notEmpty()
    .withMessage("Genres is required")
    .custom((value) => {
      if (Array.isArray(value) || typeof value === "string") {
        return true;
      }
      throw new Error("Genres should be an array or a single string");
    }),
];

const validateObjectId = [
  param("id")
    .custom((value) => ObjectId.isValid(value))
    .withMessage("Invalid ID format"),
];

// Middleware to handle validation errors
const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Controller functions
const getAllMovies = async (req: Request, res: Response) => {
  try {
    const result = await getDb().collection("movies").find().toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "An error occurred while fetching movies",
        details: (error as Error).message,
      });
  }
};

const getSingleMovie = async (req: Request, res: Response) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await getDb().collection("movies").findOne({ _id: userId });
    if (!result) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "An error occurred while fetching the movie",
        details: (error as Error).message,
      });
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
        .json({ error: "An error occurred while creating the movie" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        error: "An error occurred while creating the movie",
        details: (error as Error).message,
      });
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
      res
        .status(500)
        .json({ error: "An error occurred while updating the movie" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        error: "An error occurred while updating the movie",
        details: (error as Error).message,
      });
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
      res
        .status(500)
        .json({ error: "An error occurred while deleting the movie" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        error: "An error occurred while deleting the movie",
        details: (error as Error).message,
      });
  }
};

export {
  getAllMovies,
  getSingleMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  validateMovieData,
  validateObjectId,
  validateRequest,
};
