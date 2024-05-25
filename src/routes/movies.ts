import { Router } from "express";
import * as moviesController from "../controllers/moviesController";

const router: Router = Router();

router.get("/", moviesController.getAllMovies);
router.get("/:id", moviesController.getSingleMovie);
router.post("/", moviesController.createMovie);

export default router;
