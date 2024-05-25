import { Router } from "express";
import moviesRouter from "./movies";
import actorsRouter from "./actors";
import associationsRouter from "./associations"

const router: Router = Router();

router.use("/movies", moviesRouter);
router.use("/actors", actorsRouter);
router.use("/movie-actors", associationsRouter);

export default router;
