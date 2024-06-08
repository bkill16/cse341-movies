import express from "express";
import * as moviesController from "../controllers/movies";
import { idValidationRules, movieValidationRules, validate } from "../validator";

const router = express.Router();
const { requiresAuth } = require("express-openid-connect");

router.get("/", requiresAuth(),moviesController.getAllMovies);
router.get("/:id", requiresAuth(), idValidationRules(), validate, moviesController.getSingleMovie);
router.post("/", movieValidationRules(), validate, moviesController.createMovie);
router.put("/:id", movieValidationRules(), validate, moviesController.updateMovie);
router.delete("/:id", idValidationRules(), validate, moviesController.deleteMovie);

export default router;
