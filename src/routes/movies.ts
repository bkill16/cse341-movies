import express from "express";

import * as moviesController from "../controllers/movies";

const router = express.Router();

router.get("/movies", moviesController.getAllMovies);
router.get("/movies/:id", moviesController.getSingleMovie);
router.post("/movies", moviesController.createMovie);
router.put("/movies/:id", moviesController.updateMovie);
router.delete("/movies/:id", moviesController.deleteMovie);

export default router;
