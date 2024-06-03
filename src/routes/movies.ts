import express from "express";
import {
  getAllMovies,
  getSingleMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  validateMovieData,
  validateObjectId,
  validateRequest,
} from "../controllers/moviesController";

const router = express.Router();

router.get("/movies", getAllMovies);
router.get("/movies/:id", validateObjectId, validateRequest, getSingleMovie);
router.post("/movies", validateMovieData, validateRequest, createMovie);
router.put(
  "/movies/:id",
  validateObjectId,
  validateMovieData,
  validateRequest,
  updateMovie
);
router.delete("/movies/:id", validateObjectId, validateRequest, deleteMovie);

export default router;
